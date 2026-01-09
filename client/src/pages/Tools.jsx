import React from "react";
import "../styles/pages/tools.css";
import { Link } from "react-router-dom";

export default function Tools() {
  const tools = [
    { name: "PDF → Word", path: "/pdf-to-word" },
    { name: "DOCX → PDF", path: "/docx-to-pdf" },
    { name: "PDF → Text", path: "/pdf-to-text" },
    { name: "PDF → Text OCR", path: "/pdf-to-text-ocr" },
    { name: "PDF → Image", path: "/pdf-to-img" },
    { name: "Image → PDF", path: "/img-to-pdf" },
    { name: "Split PDF", path: "/split-pdf" },
    { name: "Merge PDF", path: "/merge-pdf" },
    { name: "Compress PDF", path: "/compress-pdf" },
  ];

  return (
    <div className="tools-container">
      <h1 className="tools-title">All Conversion Tools</h1>
      <p className="tools-subtitle">Choose any tool to start converting</p>

      <div className="tools-grid">
        {tools.map((tool, index) => (
          <Link to={tool.path} className="tool-card" key={index}>
            <h3>{tool.name}</h3>
            <span>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
