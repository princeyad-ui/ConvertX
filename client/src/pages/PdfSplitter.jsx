import React, { useState } from "react";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import workerSrc from "/pdf.worker.js?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

import "../styles/pages/pdf-splitter.css";


export default function PdfSplitter() {
  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState([]);

  const handlePDF = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      const previews = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        previews.push(canvas.toDataURL("image/png"));
      }

      setPages(previews);
    } catch (error) {
      console.error("PDF load error:", error);
    }
  };

  const toggleSelection = (i) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((p) => p !== i) : [...prev, i]
    );
  };

  const extractPDF = async () => {
    if (selected.length === 0) return alert("Select some pages!");

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();

    selected.sort((a, b) => a - b);

    selected.forEach((idx, i) => {
      if (i !== 0) pdf.addPage();
      pdf.addImage(pages[idx], "PNG", 10, 10, 190, 270);
    });

    pdf.save("split.pdf");
  };

  return (
    <div className="split-container">
      <h1 className="split-title">Split PDF</h1>

      <div className="upload-box">
        <input type="file" accept="application/pdf" onChange={handlePDF} />
        <p>Upload a PDF</p>
      </div>

      <div className="page-grid">
        {pages.map((img, i) => (
          <div
            key={i}
            className={`page-card ${selected.includes(i) ? "selected" : ""}`}
            onClick={() => toggleSelection(i)}
          >
            <img src={img} />
            <span className="page-number">{i + 1}</span>
          </div>
        ))}
      </div>

      {pages.length > 0 && (
        <button className="split-btn" onClick={extractPDF}>
          Split Selected Pages
        </button>
      )}
    </div>
  );
}
