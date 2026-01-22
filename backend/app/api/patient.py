from fastapi import APIRouter
import random
from datetime import datetime, timedelta

router = APIRouter(prefix="/patient", tags=["Patient"])

@router.get("/dashboard")
def get_patient_dashboard():
    """
    Returns mocked data for the patient dashboard including profile, timeline, and insights.
    """
    return {
        "profile": {
            "name": "Sarah Jenkins",
            "age": 34,
            "blood_type": "O+",
            "height": "165cm",
            "weight": "62kg",
            "emergency_contact": "Michael Jenkins (+1 555-0123)",
            "avatar_url": "https://randomuser.me/api/portraits/women/44.jpg"
        },
        "timeline": [
            {
                "id": 1,
                "type": "diagnosis",
                "title": "AI Symptom Triage",
                "date": "Today, 10:30 AM",
                "description": "Reported mild fever and fatigue. Risk: Low.",
                "icon": "bx-brain",
                "color": "var(--primary)"
            },
            {
                "id": 2,
                "type": "lab",
                "title": "Blood Test Results",
                "date": "Yesterday",
                "description": "Vitamin D levels are normal. Iron slightly low.",
                "icon": "bx-test-tube",
                "color": "#eab308"
            },
            {
                "id": 3,
                "type": "visit",
                "title": "Dr. Smith Checkup",
                "date": "Jan 15, 2026",
                "description": "Routine annual physical completed.",
                "icon": "bx-user-voice",
                "color": "#10b981"
            }
        ],
        "insights": [
            {
                "title": "Viral Risk Analysis",
                "value": "Medium",
                "trend": "rising",
                "detail": "Flu season peak in Bengaluru.",
                "color": "#f59e0b"
            },
            {
                "title": "Wellness Score",
                "value": "88/100",
                "trend": "stable",
                "detail": "Great sleep consistency this week.",
                "color": "#10b981"
            },
            {
                "title": "Next Screening",
                "value": "Dental",
                "trend": "neutral",
                "detail": "Due in 2 months.",
                "color": "#6366f1"
            }
        ]
    }
