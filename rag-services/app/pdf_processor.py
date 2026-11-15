
import fitz


def extract_pdf_text(pdf_bytes):

    # Open PDF from uploaded bytes
    pdf = fitz.open(stream=pdf_bytes, filetype="pdf")

    extracted_pages = []
    total_characters = 0
    scanned_pages = 0

    for page_number, page in enumerate(pdf):

        # Extract selectable text
        page_text = page.get_text("text").strip()

        extracted_pages.append({
            "page": page_number + 1,
            "text": page_text
        })

        # Count extracted characters
        character_count = len(page_text)

        total_characters += character_count

        if character_count < 30:
            scanned_pages += 1

    total_pages = len(pdf)

    # Detect PDF type
    if total_characters < 30:
        pdf_type = "scanned"
    elif scanned_pages > 0:
        pdf_type = "mixed"
    else:
        pdf_type = "text"

    pdf.close()

    return {
        "pdf_type": pdf_type,
        "total_pages": total_pages,
        "total_characters": total_characters,
        "pages": extracted_pages
    }
