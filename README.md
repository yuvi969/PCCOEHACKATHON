# PCCOE Hackathon Project

## Overview
This project consists of a **frontend** and a **backend** that work together to provide an AI-powered prescription scanner and generic medicine recommender.

## Folder Structure
```
PCCOEHackathonJigyasa/
│-- frontend/   # React-based frontend
│-- backend/    # Node.js & Express backend
```

## Technologies Used
### Frontend:
- React.js
- Tailwind CSS
- Axios (for API requests)

### Backend:
- Node.js
- Express.js
- MongoDB (Database)

## Setup Instructions
### Clone the Repository
```bash
git clone https://github.com/yuvi969/PCCOEHACKATHON.git
cd PCCOEHACKATHON
```

### Install Dependencies
#### Frontend:
```bash
cd frontend
npm install
npm start
```

#### Backend:
```bash
cd backend
npm install
npm start
```

## Environment Variables
Create a `.env` file in the backend folder and add:
```
DB_URI=your_mongo_db_url_here
PORT=5000
```

## Running the Project
- Start the backend first (`npm start` in `backend/`)
- Start the frontend (`npm start` in `frontend/`)
- Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing
Feel free to fork the repo and submit pull requests!

## License
This project is open-source and available under the MIT License.

