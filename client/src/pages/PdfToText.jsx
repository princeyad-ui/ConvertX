import React, { useState } from "react";

// Correct imports
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.js?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

import "../styles/pages/pdf-to-text.css";

export default function PdfToText() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const extractText = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setText("");

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      let extracted = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const pageText = content.items.map((t) => t.str).join(" ");
        extracted += pageText + "\n\n";
      }

      setText(extracted);
    } catch (error) {
      console.error("PDF extract error:", error);
    }

    setLoading(false);
  };

  const downloadTextFile = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "extracted.txt";
    link.click();
  };

  return (
    <div className="text-container">
      <h1 className="text-title">PDF → Text Extractor</h1>

      <div className="text-upload">
        <input type="file" accept="application/pdf" onChange={extractText} />
        <p>Upload PDF to extract text</p>
      </div>

      {loading && <p className="loading">Extracting text...</p>}

      {text && (
        <div className="text-output">
          <textarea value={text} readOnly />

          <button className="download-btn" onClick={downloadTextFile}>
            Download Text
          </button>
        </div>
      )}
    </div>
  );
}
