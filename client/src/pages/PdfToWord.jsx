import React, { useState } from "react";
import "../styles/pages/pdf-to-text.css"; // reuse styling

export default function PdfToWord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const convertToWord = async () => {
    if (!file) return alert("Upload a PDF first!");

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch("http://localhost:5000/convert", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "converted.docx";
      link.click();
    } else {
      alert("Failed to convert PDF");
    }

    setLoading(false);
  };

  return (
    <div className="text-container">
      <h1 className="text-title">PDF → Word Converter</h1>

      <div className="text-upload">
        <input type="file" accept="application/pdf" onChange={handleUpload} />
        <p>Upload PDF to convert</p>
      </div>

      {loading && <p className="loading">Converting...</p>}

      {file && (
        <button className="download-btn" onClick={convertToWord}>
          Convert to Word
        </button>
      )}
    </div>
  );
}
