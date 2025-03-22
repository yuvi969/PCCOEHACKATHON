from flask import Flask,render_template,jsonify,redirect,request
from groq import Groq
import base64
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key =groq_api_key)

@app.route('/extract_text',methods = ['POST'])
def extract():
    if 'image' not in request.files:
        return jsonify({"error":"NO file uploaded"}),400
    
    file = request.file['image']

    image_data = file.read()

    base64_image = base64.b64encode(image_data).decode('utf-8')

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "You are a prescription scanner. Extract only the medicine names from the given image and return them as a comma-separated list (e.g., 'Paracetamol, Amoxicillin'). Do not add any extra text."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
        model="llama-3.2-11b-vision-preview",
    )
     
    response = chat_completion.choices[0].message.content
    return jsonify({"prescription_details":response})
if __name__ == "__main__" :
    app.run(debug=True)