import React, { useState } from "react";
import "../styles/pages/image-to-pdf.css";
import { jsPDF } from "jspdf";


export default function ImageToPdf() {
  const [images, setImages] = useState([]);

  // Upload Images
  const handleFiles = (e) => {
    const files = [...e.target.files];
    const imgArr = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...imgArr]);
  };

  // Remove image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Convert images → PDF
const generatePDF = async () => {
  if (images.length === 0) return alert("Upload images first!");

  const pdf = new jsPDF("p", "px", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < images.length; i++) {
    if (i !== 0) pdf.addPage();

    const img = images[i];

    // Load image natural size
    const imageEl = new Image();
    imageEl.src = img.preview;

    await new Promise((resolve) => (imageEl.onload = resolve));

    const imgWidth = imageEl.width;
    const imgHeight = imageEl.height;

    // Calculate scale to fit inside PDF without distortion
    const ratio = Math.min(
      pageWidth / imgWidth,
      pageHeight / imgHeight
    );

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    // center the image on the page
    const x = (pageWidth - finalWidth) / 2;
    const y = (pageHeight - finalHeight) / 2;

    pdf.addImage(img.preview, "JPEG", x, y, finalWidth, finalHeight);
  }

  pdf.save("converted.pdf");
};



  return (
 <div className="img-to-pdf-container">
  <h1 className="title">Image → PDF Converter</h1>

  <div className="center-wrapper">

    <div className="upload-area">
      <input type="file" multiple accept="image/*" onChange={handleFiles} />
      <p>Drag & Drop or Click to Upload</p>
    </div>

    <div className="preview-grid">
      {images.map((img, index) => (
        <div className="preview-card" key={index}>
          <img src={img.preview} />
          <button className="remove-btn" onClick={() => removeImage(index)}>✕</button>
        </div>
      ))}
    </div>

    {images.length > 0 && (
      <button className="convert-btn" onClick={generatePDF}>
        Convert to PDF
      </button>
    )}

  </div>
</div>

);

}
