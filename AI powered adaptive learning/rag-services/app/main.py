
from fastapi import FastAPI, UploadFile, File, HTTPException

from app.pdf_processor import extract_pdf_text

app = FastAPI(
    title="Taleem AI RAG Service",
    description="PDF processing and vector storage service"
)


@app.get("/")
def home():
    return {
        "message": "Taleem AI RAG Service is running"
    }


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    # Check file extension
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    try:

        # Read uploaded PDF
        pdf_bytes = await file.read()

        # Extract PDF text
        result = extract_pdf_text(pdf_bytes)

        # Return processing result
        return {
            "filename": file.filename,
            "pdf_type": result["pdf_type"],
            "total_pages": result["total_pages"],
            "total_characters": result["total_characters"],
            "pages": result["pages"]
        }

    except Exception as error:

        raise HTTPException(
            status_code=400,
            detail=f"PDF processing failed: {str(error)}"
        )
