import re

# 🔴 High-risk keywords (expandable)
PREGNANCY_KEYWORDS = [
    "pregnant", "pregnancy", "expecting", "trimester"
]

ALLERGY_KEYWORDS = [
    "allergy", "allergic", "reaction", "hypersensitive"
]

MEDICAL_CONDITION_KEYWORDS = [
    "diabetes", "diabetic", "asthma", "heart condition",
    "bp", "blood pressure", "hypertension",
    "thyroid", "epilepsy"
]

PROCEDURE_KEYWORDS = [
    "fillers", "botox", "injection", "procedure", "treatment"
]


def detect_risk(user_message: str) -> dict:
    text = user_message.lower()

    risks = {
        "pregnancy": any(k in text for k in PREGNANCY_KEYWORDS),
        "allergy": any(k in text for k in ALLERGY_KEYWORDS),
        "medical_condition": any(k in text for k in MEDICAL_CONDITION_KEYWORDS),
        "procedure": any(k in text for k in PROCEDURE_KEYWORDS),
    }

    risk_detected = (
        risks["pregnancy"]
        or risks["allergy"]
        or (risks["medical_condition"] and risks["procedure"])
    )

    return {
        "risk_detected": risk_detected,
        "risk_factors": risks
    }
