import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "../styles/pages/pdf-to-img.css";


pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export default function PdfToImg() {
  const [images, setImages] = useState([]);

  const handleFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
      workerSrc: "/pdf.worker.js"
    }).promise;

    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: ctx,
        viewport: viewport,
      }).promise;

      pages.push(canvas.toDataURL("image/png"));
    }

    setImages(pages);
  };

  return (
  <div className="pdf-to-img-container">
    <h1 className="pdf-title">PDF to Image</h1>

    <div className="upload-box">
      <input type="file" accept="application/pdf" onChange={handleFile} />
      <p>Upload a PDF</p>
    </div>

    <div className="results">
      {images.map((src, index) => (
        <div className="img-box" key={index}>
          <img src={src} alt="" />
          <a href={src} download={`page-${index + 1}.png`} className="download-btn">
            Download
          </a>
        </div>
      ))}
    </div>
  </div>
);

}
