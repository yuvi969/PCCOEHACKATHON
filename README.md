# Medicine Scanner - AI-powered Prescription Analysis

## Overview

## Folder Structure
```
PCCOEHackathonJigyasa/
│-- frontend/   # React-based frontend
│-- backend/    # Node.js & Express backend
│-- ocr/    # Python Backend
```
=======
This project is an AI-powered web application that extracts text from prescription images, identifies medicines, retrieves their active ingredients, and finds generic alternatives using various APIs.
>>>>>>> 8602580 (Yuvis last commit of the day)

## Features

- **Image-based OCR**: Uses **Llama Vision 90B Preview** (Groq Cloud API) to extract text from prescription images.
- **Medicine Data Scraping**: Fetches medicine details from **Tata 1mg** and **OpenFDA**.
- **Active Ingredient Retrieval**: Extracts active ingredients of medicines.
- **Generic Medicine Search**: Uses **RxNorm API** to find generic medicine alternatives.
- **Responsive UI**: User-friendly interface with **light & dark mode**.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Optional for storing history)
- **AI & APIs**:
  - Groq Cloud API (Llama Vision 90B Preview) for OCR
  - Scraping Tata 1mg & OpenFDA for medicine details
  - RxNorm API for generic medicine lookup

## Installation & Setup

#### ocr:
create requirements.txt file
add this to it
```bash

beautifulsoup4==4.13.3
Flask==3.1.0
groq==0.18.0
python-dotenv==1.0.1
requests==2.32.3
run pip install -r requirements.txt in terminal
run python app.py in terminal
```

## Environment Variables
Create a `.env` file in the backend folder and add:
```
DB_URI=your_mongo_db_url_here
PORT=5000
```
## Environment Variables
Create a `.env` file in the ocr:
```
groq_key=your_api_key
```

## Running the Project
- Start the backend first (`nodemon app.js` in `backend/`)
- Start the frontend (`npm start` in `frontend/`)
- -Start the python backend
- Open [http://localhost:3000](http://localhost:3000) in your browser
=======
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo/medicine-scanner.git
   cd medicine-scanner
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables** (`.env` file)
   ```sh
   GROQ_API_KEY=your_groq_api_key
   RXNORM_API_KEY=your_rxnorm_api_key
   ```
4. **Run the development server**
   ```sh
   npm start
   ```

## Usage

1. Upload a prescription image.
2. The AI extracts text and identifies medicines.
3. Medicine details and generic alternatives are displayed in a tabular format.
4. Switch between **light mode & dark mode** for better visibility.

## API References

- [Groq Cloud - Llama Vision 90B](https://groq.com/)
- [Tata 1mg](https://www.1mg.com/)
- [OpenFDA](https://open.fda.gov/)
- [RxNorm API](https://www.nlm.nih.gov/research/umls/rxnorm/)
>>>>>>> 8602580 (Yuvis last commit of the day)

## Contributing

Feel free to fork and submit PRs for improvements or new features!

## License

MIT License
