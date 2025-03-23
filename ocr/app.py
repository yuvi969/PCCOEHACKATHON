from flask import Flask, jsonify, request
from groq import Groq
import base64
import os
import requests
from dotenv import load_dotenv
from bs4 import BeautifulSoup


load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")


client = Groq(api_key=groq_api_key)



def extract_image(image_file):
    """
    Extract medicine names from the uploaded image using Groq API.
    """
    image_data = image_file.read()
    base64_image = base64.b64encode(image_data).decode("utf-8")

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "You are a prescription scanner. Extract only the medicine names from the given image and return them as a comma-separated list (e.g., 'Paracetamol, Amoxicillin'). Do not add any extra text."},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}  
                ],
            }
        ],
        model="llama-3.2-90b-vision-preview",
    )
    return chat_completion.choices[0].message.content.strip()



def get_generic_medicines_by_active_ingredient(active_ingredient):
    
    try:
        rxcui_url = "https://rxnav.nlm.nih.gov/REST/rxcui.json"
        rxcui_response = requests.get(rxcui_url, params={"name": active_ingredient})
        rxcui_data = rxcui_response.json()

        rxcui = rxcui_data.get("idGroup", {}).get("rxnormId", [])
        if not rxcui:
            return []

        rxcui = rxcui[0]  # Use the first RxCUI found
        related_url = f"https://rxnav.nlm.nih.gov/REST/rxcui/{rxcui}/related.json"
        related_response = requests.get(related_url, params={"tty": "SCD"})
        related_data = related_response.json()

        medicines = [
            concept["name"]
            for group in related_data.get("relatedGroup", {}).get("conceptGroup", [])
            for concept in group.get("conceptProperties", [])
        ]
        return medicines if medicines else ["No generic medicines found."]
    except Exception as e:
        print(f"Error fetching generic medicines: {e}")
        return []



class MedicineInfoAgent:
    def __init__(self):
        self.sources = {
            "tata_1mg": self.get_active_ingredient_tata_1mg,
            "openfda": self.get_active_ingredient_openfda,
        }

    def get_active_ingredient(self, medicine_name):
        for source, func in self.sources.items():
            result = func(medicine_name)
            if result and result != "NOT_FOUND":
                return result
        return "NOT_FOUND"

    def get_active_ingredient_openfda(self, medicine_name):
        try:
            base_url = "https://api.fda.gov/drug/label.json"
            params = {"search": f"openfda.brand_name:{medicine_name}", "limit": 1}
            response = requests.get(base_url, params=params)
            data = response.json()

            if "results" in data and len(data["results"]) > 0:
                ingredients = data["results"][0]["openfda"].get("generic_name", ["NOT_FOUND"])
                return ", ".join(ingredients)
            return "NOT_FOUND"
        except Exception as e:
            print(f"Error fetching from OpenFDA: {e}")
            return "NOT_FOUND"

    def get_active_ingredient_tata_1mg(self, medicine_name):
        try:
            search_url = f"https://www.1mg.com/search/all?name={medicine_name.replace(' ', '%20')}"
            response = requests.get(search_url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, "html.parser")
                medicine_link = soup.find("a", {"class": "style__product-link___1fcbx"})
                if medicine_link:
                    product_url = f"https://www.1mg.com{medicine_link['href']}"
                    product_response = requests.get(product_url)
                    product_soup = BeautifulSoup(product_response.content, "html.parser")

                    salt_section = product_soup.find("div", text="Salt Composition")
                    if salt_section:
                        salt_value = salt_section.find_next("div").text
                        return salt_value.strip()
            return "NOT_FOUND"
        except Exception as e:
            print(f"Error fetching from Tata 1mg: {e}")
            return "NOT_FOUND"

app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image_file = request.files["file"]
    medicines = extract_image(image_file)
    medicine_list = medicines.split(",")

    agent = MedicineInfoAgent()
    results = {}
    for medicine in medicine_list:
        medicine = medicine.strip()
        active_ingredient = agent.get_active_ingredient(medicine)
        if active_ingredient != "NOT_FOUND":
            generic_medicines = get_generic_medicines_by_active_ingredient(active_ingredient)
            results[medicine] = generic_medicines[:2]
    
    return jsonify({"extracted_medicines": medicine_list, "generic_medicines": results})

if __name__ == "__main__":
    app.run(debug=True)
