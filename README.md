# 🏥 AI Healthcare Concierge Platform

> An intelligent, compliance-focused clinic management system powered by AI, designed to automate patient interactions, streamline scheduling, and ensure healthcare safety standards.

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Security & Compliance](#-security--compliance)
- [Rate Limiting](#-rate-limiting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

The AI Healthcare Concierge Platform is a production-ready backend system that leverages artificial intelligence to transform clinic operations. Built with healthcare compliance and patient safety as core principles, this platform automates routine tasks while maintaining strict oversight over sensitive medical interactions.

### Why This Platform?

- **Compliance-First Design**: Built-in safety mechanisms to detect and escalate high-risk medical queries
- **Intelligent Automation**: RAG-powered conversational AI that grounds responses in verified clinic knowledge
- **Seamless Integration**: Works with existing tools like Google Calendar and Stripe
- **Enterprise-Ready**: Includes audit logging, rate limiting, and role-based access control

---

## ✨ Key Features

### 🤖 Intelligent AI Concierge

- **Conversational Interface**: Natural language interaction for patient queries
- **RAG-Powered Responses**: Retrieval-Augmented Generation using TF-IDF-based chunk retrieval
- **Grounded Answers**: Strict response validation to eliminate hallucinations
- **Context-Aware**: Maintains conversation state and understanding

### 🛡️ Compliance & Safety Engine

- **Medical Risk Detection**: Automatically identifies sensitive keywords (pregnancy, allergies, chronic conditions)
- **Response Blocking**: Prevents AI from providing unsafe medical advice
- **Smart Escalation**: Routes complex cases to human staff automatically
- **Audit Trail**: Complete logging for legal and ethical compliance

### 📅 Appointment Management

- **Real-Time Availability**: Live slot checking with conflict prevention
- **Buffer Time Management**: Ensures adequate time between appointments
- **Calendar Sync**: Bidirectional Google Calendar integration
- **Flexible Scheduling**: Support for cancellations and rescheduling with policy enforcement

### 💳 Payment Processing

- **Secure Transactions**: PCI-compliant payment handling via Stripe
- **Conversational Payments**: Payment links generated within chat flow
- **Webhook Verification**: Cryptographic signature validation for payment events
- **Idempotent Design**: Safe retry logic and duplicate prevention

### 🧑‍⚕️ Administrative Dashboard

- **Booking Management**: View, modify, and manage all appointments
- **Payment Tracking**: Monitor transaction history and reconciliation
- **Chat Log Review**: Access conversation history for quality assurance
- **Knowledge Base Updates**: Dynamically manage clinic information
- **Analytics Dashboard**: Track KPIs, conversions, and system health

### 📊 Analytics & Insights

- **Operational Metrics**: Booking rates, payment success, chat volume
- **Conversion Tracking**: Identify drop-off points in user journey
- **Escalation Monitoring**: Track safety triggers and human intervention rates
- **Audit Compliance**: Immutable logs for regulatory requirements

---

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│         FastAPI Backend             │
├─────────────────────────────────────┤
│  ┌──────────┐    ┌──────────────┐  │
│  │   Rate   │    │  Auth/RBAC   │  │
│  │ Limiter  │    │              │  │
│  └──────────┘    └──────────────┘  │
├─────────────────────────────────────┤
│           API Endpoints             │
│  • Chat  • Booking  • Payments      │
│  • Webhooks  • Admin                │
├─────────────────────────────────────┤
│          Core Services              │
│  ┌─────┐ ┌─────┐ ┌──────────────┐ │
│  │ LLM │ │ RAG │ │ Compliance   │ │
│  └─────┘ └─────┘ └──────────────┘ │
│  ┌─────────┐ ┌─────────────────┐  │
│  │ Booking │ │    Payment      │  │
│  └─────────┘ └─────────────────┘  │
└───────────┬─────────────────────────┘
            │
    ┌───────┴────────┐
    ▼                ▼
┌─────────┐    ┌──────────────┐
│  PostgreSQL  │    │ External APIs  │
│  Database    │    │ • Groq         │
└─────────┘    │ • Stripe       │
                    │ • Google Cal   │
                    └──────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **API Framework** | FastAPI | High-performance async API |
| **Database** | PostgreSQL | Relational data storage |
| **ORM** | SQLAlchemy | Database abstraction |
| **AI/LLM** | Groq API | Large language model inference |
| **RAG** | TF-IDF | Document retrieval |
| **Payments** | Stripe | Payment processing |
| **Calendar** | Google Calendar API | Appointment synchronization |
| **Rate Limiting** | SlowAPI | Request throttling |
| **Authentication** | Custom RBAC | Role-based access control |

---

## 📂 Project Structure

```
backend/
├── app/
│   ├── api/                    # API route handlers
│   │   ├── chat.py            # Conversational AI endpoints
│   │   ├── booking.py         # Appointment management
│   │   ├── payment.py         # Payment processing
│   │   ├── webhook.py         # External webhooks
│   │   └── admin/             # Admin-only endpoints
│   │       ├── analytics.py
│   │       ├── bookings.py
│   │       └── knowledge.py
│   ├── services/              # Business logic layer
│   │   ├── llm_service.py     # LLM interaction
│   │   ├── rag_service.py     # Document retrieval
│   │   ├── compliance_service.py  # Safety checks
│   │   ├── booking_service.py     # Scheduling logic
│   │   ├── payment_service.py     # Payment orchestration
│   │   ├── audit_service.py       # Logging service
│   │   └── analytics_service.py   # Metrics aggregation
│   ├── models/                # SQLAlchemy ORM models
│   ├── schemas/               # Pydantic validation schemas
│   ├── core/                  # Core configurations
│   │   ├── config.py          # Environment settings
│   │   ├── rate_limiter.py    # Rate limiting config
│   │   └── security.py        # Security utilities
│   ├── db/                    # Database connection
│   │   └── session.py
│   └── knowledge/             # RAG knowledge base
│       └── clinic_data.txt
├── main.py                    # Application entry point
├── requirements.txt           # Python dependencies
├── .env.example              # Environment template
├── .gitignore                # Git exclusions
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- PostgreSQL 12 or higher
- Stripe account
- Groq API access
- Google Cloud Console account (for Calendar API)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ai-concierge-platform.git
cd ai-concierge-platform/backend
```

2. **Create and activate virtual environment**

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Configure environment variables**

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai_concierge

# AI Services
GROQ_API_KEY=your_groq_api_key_here

# Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Google Calendar (Optional)
GOOGLE_CALENDAR_CREDENTIALS=path/to/credentials.json

# Application
SECRET_KEY=your-secret-key-for-jwt
ADMIN_API_KEY=your-admin-api-key
```

> **⚠️ Security Note**: Never commit `.env` files to version control. Use `.env.example` as a template.

5. **Initialize the database**

```bash
# Run migrations (if using Alembic)
alembic upgrade head

# Or create tables directly
python -c "from app.db.session import engine; from app.models import Base; Base.metadata.create_all(bind=engine)"
```

6. **Start the development server**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

---

## 📖 API Documentation

### Interactive Documentation

Once the server is running, access the automatically generated API documentation:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Key Endpoints

#### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send message to AI concierge |
| `GET` | `/api/booking/slots` | Get available appointment slots |
| `POST` | `/api/booking/create` | Book an appointment |
| `POST` | `/api/payment/create` | Generate payment link |
| `POST` | `/api/webhook/stripe` | Stripe payment webhooks |

#### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/analytics` | View system analytics |
| `GET` | `/api/admin/bookings` | Manage all bookings |
| `PUT` | `/api/admin/knowledge` | Update knowledge base |
| `GET` | `/api/admin/escalations` | Review escalated cases |

---

## 🔐 Security & Compliance

### Security Features

- **Environment-Based Secrets**: All sensitive data stored in environment variables
- **Webhook Verification**: Cryptographic validation of Stripe webhooks
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Role-Based Access Control**: Admin endpoints protected with API key authentication
- **SQL Injection Prevention**: Parameterized queries via SQLAlchemy ORM
- **Audit Logging**: Immutable logs for all critical operations

### Compliance Mechanisms

The platform includes a dedicated **Compliance Engine** that:

1. **Scans Every Message**: Analyzes user input for medical risk keywords
2. **Blocks Unsafe Responses**: Prevents AI from giving unqualified medical advice
3. **Escalates to Humans**: Automatically routes high-risk queries to staff
4. **Maintains Audit Trail**: Logs all escalations for review

#### Example Escalation Flow

```
User: "I'm pregnant and diabetic. Can I get dental implants?"

System Response:
├─ Risk Keywords Detected: ["pregnant", "diabetic"]
├─ AI Response Blocked
├─ Escalation Created: Ticket #1234
└─ Message: "Thank you for your question. For your safety, 
            a staff member will contact you shortly."
```

---

## ⚡ Rate Limiting

To ensure fair usage and system stability, the following rate limits are enforced:

| Endpoint Category | Rate Limit | Window |
|------------------|------------|--------|
| Chat API | 10 requests | per minute |
| Booking API | 5 requests | per minute |
| Payment API | 3 requests | per minute |
| Admin APIs | 5 requests | per minute |

Rate limits are enforced per IP address. Authenticated admin users may have elevated limits.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 style guidelines
- Write unit tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Contact

**Gatla Devavardhan**  
Backend & AI Engineer

- Email: [gatladevavardhan@gmail.com](mailto:gatladevavardhan@gmail.com)

---


