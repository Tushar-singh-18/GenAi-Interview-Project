# GenAi — Interview prep, with a plan

Turn a job description and your experience into a practical interview prep plan: tailored questions, answer guidance, skill gaps, and a day-by-day roadmap.

## Watch the demo

Watch the project walkthrough -



https://github.com/user-attachments/assets/1c438490-2755-4e90-9a8b-5d3bbc26b203



Replace the link above with your recorded video.

## What it does

- Sign up and keep your interview plans in one place.
- Add a job description, upload a PDF resume, or write a short profile.
- Generate technical and behavioral questions, answer guidance, a match score, and a preparation roadmap.
- Download a tailored resume PDF.

## Built with

React, Vite, Tailwind CSS, Express, MongoDB, and the Gemini API.

## Run locally

You’ll need Node.js, MongoDB, and a Gemini API key.

1. Create `Backend/.env` with:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret
   GOOGLE_GENAI_AI_KEY=your_gemini_api_key
   ```

2. Start the backend:

   ```bash
   cd Backend
   npm install
   npm run dev
   ```

3. In another terminal, start the frontend:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

Open the local URL printed by Vite. Keep `.env` and API keys private.
