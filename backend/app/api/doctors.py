from fastapi import APIRouter
import random

router = APIRouter(prefix="/doctors", tags=["Doctors"])

@router.get("/")
def get_doctors():
    """
    Returns a list of doctors with simulated AI match scores.
    """
    doctors = [
        {
            "id": 1,
            "name": "Dr. Emily Chen",
            "specialty": "Cardiologist",
            "hospital": "Apollo Heart Institute",
            "experience": "12 years",
            "rating": 4.9,
            "reviews": 124,
            "availability": "Available Today",
            "image": "https://randomuser.me/api/portraits/women/68.jpg",
            "match_score": 98,
            "match_reason": "Top match for 'Chest Pain' symptoms + accepted insurance."
        },
        {
            "id": 2,
            "name": "Dr. James Wilson",
            "specialty": "General Physician",
            "hospital": "Manipal Hospital",
            "experience": "8 years",
            "rating": 4.7,
            "reviews": 89,
            "availability": "Next slot: 2:00 PM",
            "image": "https://randomuser.me/api/portraits/men/32.jpg",
            "match_score": 92,
            "match_reason": "Highly rated for general triage and near your location."
        },
        {
            "id": 3,
            "name": "Dr. Sarah Patel",
            "specialty": "Pediatrician",
            "hospital": "Cloudnine Care",
            "experience": "15 years",
            "rating": 4.9,
            "reviews": 210,
            "availability": "Tomorrow",
            "image": "https://randomuser.me/api/portraits/women/24.jpg",
            "match_score": 85,
            "match_reason": "Expert in viral fevers, but slightly further away."
        },
        {
            "id": 4,
            "name": "Dr. Robert Fox",
            "specialty": "Neurologist",
            "hospital": "NIMHANS",
            "experience": "20 years",
            "rating": 4.8,
            "reviews": 156,
            "availability": "Thu, Jan 25",
            "image": "https://randomuser.me/api/portraits/men/45.jpg",
            "match_score": 74,
            "match_reason": "Specialist care, matches secondary symptoms."
        }
    ]
    return doctors
