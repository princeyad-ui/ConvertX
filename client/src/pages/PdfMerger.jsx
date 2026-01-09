import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PDFDocument } from "pdf-lib";
import "../styles/pages/pdf-merger.css";

export default function PdfMerger() {
  const [files, setFiles] = useState([]);

  // Upload PDF Files
  const handleUpload = (e) => {
    const selected = [...e.target.files];

    const mapped = selected.map((file, i) => ({
      id: `${file.name}-${i}`,
      file,
      name: file.name,
    }));

    setFiles((prev) => [...prev, ...mapped]);
  };

  // Handle Drag & Drop Reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(files);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setFiles(reordered);
  };

  // Merge Logic
  const mergePDFs = async () => {
    if (!files.length) return alert("Please upload PDF files!");

    const mergedPdf = await PDFDocument.create();

    for (let f of files) {
      const bytes = await f.file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((p) => mergedPdf.addPage(p));
    }

    const pdfBytes = await mergedPdf.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
  };

  return (
    <div className="merge-container">
      <h1 className="merge-title">Merge PDFs</h1>

      <div className="upload-box">
        <input type="file" multiple accept="application/pdf" onChange={handleUpload} />
        <p>Upload PDFs to merge</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pdf-list">
          {(provided) => (
            <div className="pdf-list" ref={provided.innerRef} {...provided.droppableProps}>
              {files.map((f, i) => (
                <Draggable key={f.id} draggableId={f.id} index={i}>
                  {(provided) => (
                    <div
                      className="pdf-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span className="file-name">{i + 1}. {f.name}</span>
                      <span className="drag-icon">⣿</span>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {files.length > 1 && (
        <button className="merge-btn" onClick={mergePDFs}>
          Merge PDFs
        </button>
      )}
    </div>
  );
}
