# Health AI Concierge Platform 🏥🤖

![Status](https://img.shields.io/badge/Status-Completed-success)
![Stack](https://img.shields.io/badge/Stack-React%20|%20FastAPI%20|%20AI%20|%20RAG-blue)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-brightgreen)

---

## 🌟 Platform Overview

Health AI Concierge Platform is a **full-stack, AI-powered healthcare concierge system enhanced with a Retrieval-Augmented Generation (RAG) pipeline** that delivers intelligent patient triage, explainable medical insights, smart doctor recommendations, clinic administration, and secure medical data management.

The platform combines:

* **LLM-powered symptom analysis**
* **RAG-based medical document retrieval & summarization** (PDFs, reports, and knowledge sources)
* **Location-aware doctor and hospital matching**
* **Enterprise-style admin monitoring & analytics**

This system is designed to simulate a **production-ready healthcare SaaS architecture** aligned with modern security, scalability, and **responsible, explainable AI standards**.

---

## 🚀 Key Features

### 1. 🧠 AI Smart Triage System

* **Live AI Chat Widget (Hero Section)** — Patients describe symptoms in real-time
* **Risk Assessment Engine** — Classifies urgency (Low / Medium / High)
* **Diagnosis Confidence Score** — Displays reliability percentage for each AI output
* **Explainable AI** — Shows symptom matches, medical reasoning, and sources used
* **Multimodal Inputs**:

  * 🗣️ Voice input (Speech-to-Text)
  * 📸 Image uploads (Rash, reports, scans)
  * 📄 PDF medical document analysis (RAG-based summarization)

---

### 2. 🧑‍⚕️ Patient Portal

* Secure login with **JWT Authentication**
* Personal health profile
* Diagnosis and appointment history
* Medical document uploads
* AI-generated health insights
* Risk trend visualization

---

### 3. 🏥 Doctor & Hospital System

* **AI-Based Doctor Matching**

  * Matches based on symptoms
  * Location proximity
  * Specialty relevance
  * Past ratings
* Doctor profile pages
* Availability tracking
* Booking and payment simulation

---

### 4. 🛡️ Admin Dashboard (Mission Control)

* Live system metrics

  * AI predictions per day
  * Average response latency
  * Hospital & doctor registry
* User management
* Doctor approval workflows
* Chat & audit log monitoring
* AI performance tracking

---

### 5. 🔐 Security & Compliance Layer

* JWT-based role authentication (Patient / Doctor / Admin)
* Role-based API access control
* Encrypted data storage principles
* Audit logging for sensitive operations
* HIPAA / GDPR-ready system design

---

### 6. 📡 System Intelligence

* Real-time notifications (SMS / WhatsApp simulation)
* AI usage analytics
* System health monitoring
* Performance metrics dashboard

---

## 🛠️ Tech Stack

### Frontend

* **React (Vite)**
* TailwindCSS (Glassmorphism & modern SaaS UI)
* Chart.js / Recharts (Health & system analytics)
* Google Maps API (Hospital & doctor discovery)

### Backend

* **FastAPI (Python)**
* SQLAlchemy + SQLite (Development)
* MongoDB Atlas (Production-ready schema)
* JWT Authentication
* RESTful API Architecture

### AI & Data Layer

* LLM-powered symptom triage
* RAG pipeline for medical document summarization
* NLP for medical text parsing
* Vision models for image-based analysis
* Speech-to-Text (Whisper-style pipeline)

### DevOps & Tooling

* Docker-ready
* GitHub Actions CI Pipeline
* Protected `main` branch
* Environment-based configuration

---

## 🗺️ System Architecture

```
React Frontend
     ↓
FastAPI API Gateway
     ↓
AI Engine (LLM + Vision + NLP + RAG)
     ↓
MongoDB / SQL Database
     ↓
Google Maps API / Notification Services
```

---

## ⚡ Quick Start

### Prerequisites

* Node.js v18+
* Python 3.9+
* Git

---

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Server runs at:

```
http://localhost:8000
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📂 Project Structure

```
health-ai-concierge/
│
├── backend/
│   ├── app/
│   │   ├── api/            # Routes (Auth, Chat, Triage, Doctors, Admin, Metrics)
│   │   ├── models/        # Database Models
│   │   ├── schemas/      # Pydantic Schemas
│   │   ├── services/     # AI Engine, File Service, Business Logic
│   │   └── db/           # Database Session & Config
│   ├── main.py           # FastAPI Entry Point
│   └── create_admin.py  # Admin Bootstrap Script
│
├── frontend/
│   ├── src/
│   │   ├── components/   # HeroWidget, DoctorCards, Charts, Modals
│   │   ├── pages/        # Landing, Dashboard, Booking, Admin
│   │   └── services/    # API Clients
│   └── main.jsx
│
└── README.md
```

---

## 🔍 API Highlights

| Endpoint           | Method | Description                  |
| ------------------ | ------ | ---------------------------- |
| `/auth/login`      | POST   | User authentication          |
| `/triage/chat`     | POST   | AI symptom analysis          |
| `/doctors/nearby`  | GET    | Location-based doctor search |
| `/patient/history` | GET    | Medical history              |
| `/admin/metrics`   | GET    | System analytics             |

---

## 🧪 DevOps & CI

* GitHub Actions

  * Dependency install
  * Code linting
  * Test pipeline
* Docker support
* Environment-based secrets management

---

## 🎯 Resume-Worthy Highlights

* Designed **AI-powered medical triage engine with explainable outputs**
* Built **secure role-based authentication system using JWT**
* Implemented **RAG pipeline for medical document analysis**
* Created **admin analytics dashboard for AI system monitoring**
* Integrated **location-based doctor recommendation system**
* CI/CD pipeline using **GitHub Actions**

---

## 👥 Authors

* **Gatla Devavardhan** — Lead Developer & System Architect
* **Tharuna** - Frontend Developer 

---

## 📜 License

This project is licensed for educational and demonstration purposes.

---

*Built with ❤️ to showcase the future of AI-driven healthcare platforms.*
