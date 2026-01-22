from groq import Groq
from app.core.config import settings
from app.services.rag_service import retrieve_relevant_knowledge

client = Groq(api_key=settings.GROQ_API_KEY)

# ✅ UPDATED MODEL (old one is decommissioned)
MODEL_NAME = "llama-3.1-8b-instant"


def get_ai_reply(user_message: str) -> str:
    context = retrieve_relevant_knowledge(user_message)

    system_prompt = """
You are an AI concierge for a medical clinic.

RULES:
- Use ONLY the clinic information provided
- If information is missing, say you do not know
- Do NOT give medical advice
- Be polite and concise
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": f"""
Clinic Information:
{context}

User Question:
{user_message}
"""
            }
        ],
        temperature=0.2,
    )

    # Simulate structured response (Since we are using instant model, we mock metadata)
    ai_content = response.choices[0].message.content
    
    return {
        "text": ai_content,
        "confidence": 0.92,  # Mocked high confidence
        "reasoning": "Based on the clinic's provided data regarding symptoms and available specialists."
    }
