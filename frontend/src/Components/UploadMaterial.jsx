
import { useState } from "react";
import Sidebar from "./Sidebar";
import "./UploadMaterial.css";
import axios from "axios";
function UploadMaterial() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [dragging, setDragging] = useState(false);

  const selectFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    selectFile(e.target.files[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    selectFile(droppedFile);
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  if (!title || !subject || !topic) {
    alert("Please complete all fields.");
    return;
  }

  try {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("topic", topic);

    const response = await axios.post(
      "http://localhost:3000/api/materials/upload",
      formData
    );

    console.log(response.data);

    alert("PDF uploaded and processed successfully!");

  } catch (error) {

    console.log(error.response?.data || error.message);

    alert("PDF upload failed. Check your backend.");

  }
};


  return (
    <div className="um-page">

      <Sidebar />

      <main className="um-main">

        <div className="um-header">
          <div>
            <h1>Upload Study Material</h1>
            <p>
              Upload your study materials to build your AI-powered learning
              experience.
            </p>
          </div>
        </div>

        <form className="um-content" onSubmit={handleSubmit}>

          {/* PDF Upload Section */}
          <section className="um-card">

            <h2>Upload your PDF</h2>
            <p className="um-description">
              Select a PDF from your computer or drag and drop it below.
            </p>

            <div
              className={`um-dropzone ${dragging ? "dragging" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <div className="um-upload-icon">
                <span>↑</span>
              </div>

              <h3>Drag and drop your PDF here</h3>
              <p>or browse files from your computer</p>

              <label htmlFor="pdf-upload" className="um-browse-btn">
                Choose PDF
              </label>

              <input
                id="pdf-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                hidden
              />

              <span className="um-file-hint">
                PDF files only
              </span>
            </div>

            {file && (
              <div className="um-selected-file">

                <div className="um-file-icon">PDF</div>

                <div className="um-file-info">
                  <h4>{file.name}</h4>
                  <p>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  className="um-remove-btn"
                  onClick={() => setFile(null)}
                >
                  Remove
                </button>

              </div>
            )}

          </section>

          {/* Material Information */}
          <section className="um-card">

            <h2>Material Information</h2>
            <p className="um-description">
              Provide details to organize your study material.
            </p>

            <div className="um-form-group">
              <label>Material Title</label>
              <input
                type="text"
                placeholder="e.g. Physics Chapter 1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="um-form-row">

              <div className="um-form-group">
                <label>Subject</label>

                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select Subject</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div className="um-form-group">
                <label>Topic</label>

                <input
                  type="text"
                  placeholder="e.g. Vectors"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

            </div>

          </section>

          {/* Processing Information */}
          <section className="um-info-card">
            <div className="um-info-icon">✦</div>

            <div>
              <h3>AI-Powered Processing</h3>
              <p>
                After uploading, Taleem AI will extract text, detect scanned
                pages, create text chunks, generate embeddings and store
                them for AI-powered search.
              </p>
            </div>
          </section>

          <div className="um-submit-area">
            <button type="submit" className="um-submit-btn">
              Upload and Process PDF
              <span>→</span>
            </button>
          </div>

        </form>

      </main>

    </div>
  );
}

export default UploadMaterial;
