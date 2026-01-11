import React from "react";
import "../styles/pages/about.css";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About ConvertX</h1>

      <p className="about-subtitle">
        ConvertX is a powerful, fast, and easy-to-use document conversion tool
        designed to simplify your workflow.
      </p>

      <div className="about-content">
        <h2>🚀 What is ConvertX?</h2>
        <p>
          ConvertX is a multi-functional file conversion platform built using 
          <strong> React, Node.js, Express, Python</strong>, and modern conversion libraries. 
          Whether you want to convert PDF to Word, DOCX to PDF, extract text, compress PDFs, 
          or split & merge documents — ConvertX makes everything smooth and fast.
        </p>

        <h2>✨ Features</h2>
        <ul>
          
          <li>🔤 PDF → Text and OCR Extractor</li>
          <li>🖼 PDF → Image Converter</li>
          <li>🖼 Image → PDF Converter</li>
          <li>✂️ PDF Splitter</li>
          <li>➕ PDF Merger</li>
          <li>📦 PDF Compressor</li>
        </ul>

        <h2>🔧 Technology Stack</h2>
        <p>
          ConvertX is powered by a modern tech stack that ensures top performance:
        </p>
        <ul>
          <li>⚛️ React.js (Frontend)</li>
          <li>🟩 Node.js + Express (Backend API)</li>
          <li>🐍 Python (Advanced file conversions)</li>
          <li>☁️ Multer / File Handling / pdf2docx / docx2pdf libraries</li>
        </ul>

        <h2>🎯 Goal</h2>
        <p>
          Our goal is to create a free, fast and reliable file conversion platform 
          that anyone can use without limitations.
        </p>

        <p className="thank-you">
          Thank you for using ConvertX! 🙌  
        </p>
      </div>
    </div>
  );
}
