import React from "react";
import "../styles/pages/home.css";
import ToolCard from "../components/ToolCard";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">All PDF Tools in One Place</h1>

      <div className="tools-grid">
        <ToolCard title="PDF to Image" link="/pdf-to-img" />
        <ToolCard title="Image to PDF"link= "/img-to-pdf"/>
        <ToolCard title="Merge PDF" link="/merge-pdf"/>
        <ToolCard title="Split PDF" link="/split-pdf"/>
        <ToolCard title="Compress PDF"link="/compress-pdf" />
        <ToolCard title="PDF to Text"link="/pdf-to-text" />
        <ToolCard title="PDF to OCRText"link="/pdf-to-text-ocr" />
       
      </div>
    </div>
  );
}
