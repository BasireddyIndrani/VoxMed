# 🩺 VoxMed

> **AI-Powered Clinical Documentation & Smart Multi-Lingual Triage System**

VoxMed is a modern, full-stack medical helper application designed to streamline clinical workflows. It records or receives multi-lingual patient consultations, translates them into clinical English using the **Google Gemini API**, and compiles structured **SOAP (Subjective, Objective, Assessment, Plan) notes** and **Triage urgency assessments** in real time.

---

## 🚀 Key Features

*   **🎙️ Multi-Lingual Vocal Consultations**: Real-time voice/speech recognition (using Browser Speech Recognition or the **Bhashini Speech Engine** for local Indian languages).
*   **🧠 Intelligent SOAP Note Generation**: Powered by the **Gemini 2.5 Flash** model, it translates local vernacular statements into medical English, summarizing the consultation into a standardized SOAP layout.
*   **🚦 Smart Triage Urgency Assessment**: Uses AI to categorize cases into **Low**, **Moderate**, or **High** urgency, suggesting suspected clinical conditions.
*   **📊 Analytics Dashboard**: Comprehensive metrics visualization for clinical caseloads, urgency distributions, and language demographics.
*   **🖨️ PDF Report Generation**: One-click download of clinical consultation reports, complete with SOAP notes and triage data, using `jsPDF`.
*   **💾 Resilient Fallback Database**: Full support for **MongoDB Atlas** database connection, with an automatic, zero-config local file backup (`db_fallback.json`) if the cloud database is offline.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React 19 (SPA) + Vite
*   **Styling**: Tailwind CSS v4
*   **Icons**: Lucide React
*   **PDF Export**: jsPDF

### Backend
*   **Runtime**: Node.js (ES Modules)
*   **Web Server**: Express
*   **Database**: MongoDB Atlas via Mongoose
*   **AI Integration**: Google Gemini API (`generativelanguage.googleapis.com` REST invocation)
*   **Local DB Fallback**: Direct file-based caching layer

---

## 📁 Repository Structure

```text
voxmed/
├── backend/                  # Express REST API Server
│   ├── config/               # Database initialization config
│   ├── controllers/          # Business logic handlers (clinical data processor, CRUD)
│   ├── data/                 # Local DB fallbacks and mock cases
│   ├── models/               # MongoDB / Mongoose Schemas (Consultation)
│   ├── routes/               # Express endpoints (/api/consultations)
│   ├── utils/                # File-based DB fallback helper utilities
│   ├── server.js             # Main server entrypoint
│   └── package.json          # Backend configuration & dependencies
│
├── frontend/                 # React SPA Client
│   ├── src/
│   │   ├── components/       # Header, Sidebar, SOAP card view, Waveform, Animations
│   │   ├── pages/            # Landing, Dashboards, Reports View, Analytics
│   │   ├── utils/            # Client side helpers
│   │   ├── App.jsx           # Main component & state router
│   │   └── main.jsx          # DOM entrypoint
│   ├── tailwind.config.js    # Tailwind layout customizations
│   ├── vite.config.js        # Vite compilation tool config
│   └── package.json          # Frontend dependencies & start scripts
│
├── .gitignore                # Production-ready git ignore policies
├── .env.example              # Root environmental templates
└── README.md                 # Project handbook (this file)
```

---

## ⚙️ Environment Configuration

Set up environment variables to connect database endpoints and configure active AI engines.

### Root / Backend Environment (`backend/.env`)

Create a `.env` file inside the `backend/` directory or at the root:

```env
PORT=5000

# MongoDB URI (Replace with your Atlas connection string)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/voxmed?retryWrites=true&w=majority

# Secret Token for API Sessions
JWT_SECRET=your_jwt_secret_token_here

# Google Gemini API Key (For AI Translation and SOAP analysis)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Bhashini Translation & Speech APIs
BHASHINI_API_KEY=your_bhashini_key_here
BHASHINI_USER_ID=your_bhashini_user_id
BHASHINI_APP_ID=your_bhashini_app_id
```

### Frontend Environment (`frontend/.env`)

Create a `.env` file inside the `frontend/` directory:

```env
# URL where your Backend Express server runs
VITE_API_URL=http://localhost:5000
```

---

## 🏁 Quick Start & Local Run Instructions

Follow these steps to run the full-stack project locally on Windows:

### 1. Backend Server Setup
Navigate to the `backend` folder, install dependencies, and start the node server.
```bash
cd backend
npm install
npm start
```
*The backend server runs on `http://localhost:5000`.*

### 2. Frontend Development Server Setup
In a new terminal window, navigate to the `frontend` folder, install dependencies, and start the Vite dev server.
```bash
cd frontend
npm install
npm run dev
```
*The frontend application runs on `http://localhost:5173`.*

---

## 🔌 API Endpoints

### Health Status
*   **`GET /api/health`**
    *   Verifies whether the backend is online.
    *   Reports if the system is running in MongoDB Mode or Local JSON Fallback.
    *   Reports active Speech Engine and Gemini API connectivity.

### Consultations
*   **`GET /api/consultations`**: Fetch all saved consultation records.
*   **`GET /api/consultations/:id`**: Get detailed SOAP note, transcription, and triage data for a specific case.
*   **`POST /api/consultations`**: Process and save a new consultation.
    *   *Payload:* `{ "language": "Telugu", "transcript": "సహాయం కావాలి..." }`
    *   *Header (Optional):* `x-gemini-key` to pass client-side keys directly.
*   **`DELETE /api/consultations/:id`**: Remove a consultation record.
*   **`POST /api/consultations/clear`**: Clear all clinical history.

---

## 🔒 Security Practices

*   **API Credentials Protection**: The project is equipped with a strict root and child [`.gitignore`](file:///.gitignore) config that blocks `.env` files from being staged or committed to GitHub.
*   **Data Sanitation**: Patient metrics are anonymized, generating randomized `VM-XXXX` IDs. No plain credentials or connection tokens are logged to output logs.
