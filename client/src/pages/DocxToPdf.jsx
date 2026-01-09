import React, { useState } from "react";
import "../styles/pages/pdf-to-text.css";  // same stylesheet as other pages

export default function DocxToPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    if (!file) return alert("Upload a DOCX file first!");

    setLoading(true);

    const formData = new FormData();
    formData.append("docx", file);

    const response = await fetch("http://localhost:5000/docx-to-pdf", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "converted.pdf";
      link.click();
    } else {
      alert("DOCX → PDF failed!");
    }

    setLoading(false);
  };

  return (
    <div className="text-container">
      <h1 className="text-title">DOCX → PDF Converter</h1>

      <div className="text-upload">
        <input
          type="file"
          accept=".doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <p>Upload DOCX file to convert</p>
      </div>

      {loading && <p className="loading">Converting...</p>}

      {file && (
        <button className="download-btn" onClick={convert}>
          Convert to PDF
        </button>
      )}
    </div>
  );
}
