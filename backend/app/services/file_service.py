import io
import pypdf

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts text from a PDF file.
    """
    try:
        reader = pypdf.PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return "Error extracting text from document."
