import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import PdfToImg from "./pages/PdfToImg";
import ImageToPdf from "./pages/ImageToPdf"; 
import PdfSplitter from "./pages/PdfSplitter";
import PdfMerger from "./pages/PdfMerger";
import PdfCompressor from "./pages/PdfCompressor";
import PdfToText from "./pages/PdfToText";
import PdfToTextOCR from "./pages/PdfToTextOCR";
import PdfToWord from "./pages/PdfToWord";
import DocxToPdf from "./pages/DocxToPdf";
import Footer from "./pages/Footer";


export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />

        <Route path="/pdf-to-img" element={<PdfToImg />} />
        <Route path="/img-to-pdf" element={<ImageToPdf />} />
        <Route path="/split-pdf" element={<PdfSplitter />} />
        <Route path="/merge-pdf" element={<PdfMerger />} />
        <Route path="/compress-pdf" element={<PdfCompressor />} />
        <Route path="/pdf-to-text" element={<PdfToText />} />
        <Route path="/pdf-to-text-ocr" element={<PdfToTextOCR />} />
        <Route path="/pdf-to-word" element={<PdfToWord />} />
        <Route path="/docx-to-pdf" element={<DocxToPdf />} />
      </Routes>
      <Footer /> 
    </>
  );
}
