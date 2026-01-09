import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import workerSrc from "/pdf.worker.js?url";
import Tesseract from "tesseract.js";

import "../styles/pages/pdf-to-text.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfToTextOCR() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const extractOCR = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setText("");
    setProgress("");
    setLoading(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      let finalText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Processing page ${i} of ${pdf.numPages}...`);

        const page = await pdf.getPage(i);

        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const imageDataURL = canvas.toDataURL("image/png");

        const result = await Tesseract.recognize(imageDataURL, "eng", {
          logger: (m) => console.log(m),
        });

        finalText += result.data.text + "\n\n";
      }

      setText(finalText);
      setProgress("OCR Completed!");
    } catch (err) {
      console.error("OCR error:", err);
      setProgress("Failed to process PDF.");
    }

    setLoading(false);
  };

  const downloadTextFile = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ocr_text.txt";
    link.click();
  };

  return (
    <div className="text-container">
      <h1 className="text-title">PDF → Text (OCR)</h1>

      <div className="text-upload">
        <input type="file" accept="application/pdf" onChange={extractOCR} />
        <p>Upload scanned PDF for OCR</p>
      </div>

      {progress && <p className="loading">{progress}</p>}

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
