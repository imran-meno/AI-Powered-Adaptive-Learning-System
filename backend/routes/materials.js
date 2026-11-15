
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

// Store uploaded PDF temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  }
});

router.post("/upload", upload.single("pdf"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file"
      });
    }

    // Create form data for Python service
    const formData = new FormData();

    formData.append(
      "file",
      req.file.buffer,
      {
        filename: req.file.originalname,
        contentType: "application/pdf"
      }
    );

    // Forward PDF to FastAPI
    const response = await axios.post(
      `${process.env.RAG_SERVICE_URL}/upload-pdf`,
      formData,
      {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity
      }
    );

    // Return Python service response to React
    res.status(200).json({
      message: "PDF processed successfully",
      result: response.data
    });

  } catch (error) {

    console.log("PDF Upload Error:", error.message);

    res.status(500).json({
      message: "PDF processing failed",
      error: error.response?.data || error.message
    });

  }

});

module.exports = router;
