import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import "../styles/pages/pdf-compressor.css";

export default function PdfCompressor() {
    const [estimatedSize, setEstimatedSize] = useState(null);

  const [file, setFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [loading, setLoading] = useState(false);

  const handlePDF = (e) => {
    const pdfFile = e.target.files[0];
    if (!pdfFile) return;

    setFile(pdfFile);
    setOriginalSize((pdfFile.size / (1024 * 1024)).toFixed(2));
  };

  const compressPDF = async () => {
    if (!file) return alert("Upload a PDF first!");

    setLoading(true);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const compressedBytes = await pdfDoc.save({
      useObjectStreams: false,
      compress: true,
    });

    const blob = new Blob([compressedBytes], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "compressed.pdf";
    link.click();

    setLoading(false);
  };

  return (
    <div className="compress-container">
      <h1 className="compress-title">PDF Compressor</h1>

      <div className="compress-upload">
        <input type="file" accept="application/pdf" onChange={handlePDF} />
        <p>Upload PDF to compress</p>
      </div>

      {file && (
        <div className="file-info">
          <p><strong>File:</strong> {file.name}</p>
          <p><strong>Original Size:</strong> {originalSize} MB</p>
        </div>
      )}

      {file && (
        <div className="slider-box">
          <label>Compression Level</label>
        <input
  type="range"
  min="0.3"
  max="1"
  step="0.1"
  value={quality}
  onChange={(e) => {
    const value = Number(e.target.value);
    setQuality(value);

    // update estimated compressed size
    if (originalSize) {
      const est = (originalSize * value).toFixed(2);
      setEstimatedSize(est);
    }
  }}
/>

          <div className="slider-labels">
            <span>High Quality</span>
            <span>Small Size</span>
          </div>
        </div>
      )}
      {estimatedSize && (
  <p className="est-size">Estimated Size: {estimatedSize} MB</p>
)}


      {file && (
        <button className="compress-btn" onClick={compressPDF} disabled={loading}>
          {loading ? "Compressing..." : "Compress PDF"}
        </button>
      )}
    </div>
  );
}
