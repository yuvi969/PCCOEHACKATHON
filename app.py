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
