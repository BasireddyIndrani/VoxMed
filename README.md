# VoxMed: Voice-to-Clinical-Notes Portal

VoxMed is an AI-powered MVP clinical documentation application designed to support rural healthcare workers. It transcribes patient audio spoken in vernacular Indian languages (Telugu, Hindi, Tamil, Kannada, Malayalam), translates it into English, triages symptoms to determine urgency levels, compiles structured **SOAP (Subjective, Objective, Assessment, Plan)** notes, and formats them into official downloadable PDF records.

---

## 🛠️ Tech Stack & Features

*   **Frontend**: React + Vite (ES Modules, SPA architecture)
    *   **Styling**: Tailwind CSS (Tailwind v4 layout Engine)
    *   **Icons**: Lucide React
    *   **PDF Generation**: Client-side `jsPDF` compilation
    *   **Voice Capturing**: Web Speech API for real-time local vernacular recognition
*   **Backend**: Node.js + Express
    *   **Database**: MongoDB Atlas via Mongoose (with full offline JSON file-based database fallback)
    *   **AI Engine**: Direct Google Gemini 2.5 REST API integrations (with rules-based regex NLP fallback cases if API keys are missing)
*   **Orchestration**: Workspace script manager utilizing `concurrently` to launch both stacks in a single terminal command.

---

## 📁 Repository Structure

```
d:\voxmed\
├── backend\
│   ├── config\
│   │   └── db.js                   # MongoDB Atlas connection manager (handles JSON fallback)
│   ├── controllers\
│   │   └── consultationController.js # Direct REST-based Gemini processing & mock parser
│   ├── data\
│   │   ├── mockData.json           # High-fidelity clinical presets for offline demo mode
│   │   └── db_fallback.json        # Auto-generated offline database registry file
│   ├── models\
│   │   └── Consultation.js         # Mongoose schema for consultations
│   ├── routes\
│   │   └── consultationRoutes.js   # Express routing endpoints (create, fetch, delete, clear)
│   ├── utils\
│   │   └── fileDb.js               # CRUD handlers for the local JSON database file
│   ├── .env                        # Local port and API configurations
│   ├── .env.example                # Configuration template
│   └── server.js                   # Express bootstrap server
├── frontend\
│   ├── src\
│   │   ├── components\
│   │   │   ├── Header.jsx          # Sync indicators, hamburger drawer controls
│   │   │   ├── PipelineAnimation.jsx # Visual pipeline tracker (Wow Factor)
│   │   │   ├── Sidebar.jsx         # Custom drawer navigation
│   │   │   ├── SoapCard.jsx        # Tabbed Subjective/Objective/Assessment/Plan cards
│   │   │   └── Waveform.jsx        # Animated Canvas-based soundwave visualizer
│   │   ├── pages\
│   │   │   ├── Analytics.jsx       # SVG Bar charts, KPI trackers, triage breakdown
│   │   │   ├── Dashboard.jsx       # New consultation capture hub (presets, recordings)
│   │   │   ├── LandingPage.jsx     # Modern product portal with statistics & details
│   │   │   ├── Reports.jsx         # Archive table with dynamic detail drawer
│   │   │   └── Settings.jsx        # Front-end localStorage key manager & DB resets
│   │   ├── utils\
│   │   │   ├── demoData.js         # Presets for language cases
│   │   │   └── pdfGenerator.js     # Formatted jsPDF hospital record generator
│   │   ├── App.jsx                 # SPA Router & state synchronization
│   │   ├── index.css               # Tailwind directives and custom scrollbars
│   │   └── main.jsx                # DOM entry point
│   ├── index.html                  # HTML entry point (links Outfit and Inter typography)
│   ├── postcss.config.js           # PostCSS compiler options for Tailwind v4
│   ├── tailwind.config.js          # Tailwind theme configurations
│   └── package.json                # Frontend package dependencies
├── package.json                    # Root workspace manager package script
└── README.md                       # Documentation handbook (this file)
```

---

## ⚡ Quick Start (Hackathon Ready)

VoxMed is configured to run **completely offline and setup-free** out of the box. If no MongoDB URI or Gemini API Key is provided, the backend automatically logs to a local file database (`backend/data/db_fallback.json`) and parses audio requests using rules-based mock cases.

### 1. Installation

Run this single command at the root directory to install all packages for the monorepo, backend, and frontend:
```bash
npm run install:all
```

### 2. Startup Development Server

Run this command at the root directory to launch the backend (Port 5000) and the frontend (Vite server) concurrently:
```bash
npm run dev
```

The terminal will launch both services:
*   Frontend Hub: Check terminal output (typically `http://localhost:5173`)
*   Backend Server: `http://localhost:5000`
*   Backend Health Check: `http://localhost:5000/api/health`

---

## 🔒 Configuration (`.env`)

To connect to cloud databases and live AI translation, rename `.env.example` to `.env` inside the `backend/` folder and update details:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/voxmed
GEMINI_API_KEY=AIzaSyYourActualGeminiApiKeyGoesHere
```

> [!TIP]
> **Dynamic Frontend Keys**: You can also configure the Gemini API Key directly inside the **Settings page** on the frontend! The key will be stored in your browser's local storage and sent dynamically in the request headers (`x-gemini-key`), bypassing the need to edit configuration files or restart the backend.

---

## 📋 API Spec Sheet

### `POST /api/consultations`
Creates a new patient consultation by translating inputs and generating clinical notes.
*   **Body**:
    ```json
    {
      "language": "Telugu",
      "transcript": "నాకు రెండు రోజులుగా ఛాతిలో నొప్పి ఉంది."
    }
    ```
*   **Headers** (Optional):
    *   `x-gemini-key`: Custom API key to override the server environment key.

### `GET /api/consultations`
Retrieves all completed consultation reports sorted by date (newest first).

### `GET /api/consultations/:id`
Retrieves a single consultation report by Patient ID (`VM-XXXX`) or database ID.

### `DELETE /api/consultations/:id`
Deletes a consultation report from the archive.

### `POST /api/consultations/clear`
Clears all patient records from the database.

---

## 🚀 Deployment Instructions

### Frontend Build
Compile the frontend React SPA into an optimized production bundle:
```bash
npm run build:frontend
```
This writes standard HTML/JS/CSS files to `frontend/dist/`, which can be hosted on static platforms like Netlify, Vercel, or AWS S3.

### Express Backend hosting
The backend is prepared for hosting on services like Render, Railway, Heroku, or DigitalOcean. Configure your hosting service to run `npm start` inside the `backend/` folder, and ensure the `.env` variables (`MONGODB_URI`, `GEMINI_API_KEY`) are registered in the provider's Dashboard.
