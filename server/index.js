const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// ---------------- PDF TO WORD ----------------
app.post("/convert", upload.single("pdf"), (req, res) => {
  const pdfPath = req.file.path;
  const outputPath = `output/${Date.now()}.docx`;

  const command = `python pdf_to_word.py "${pdfPath}" "${outputPath}"`;

  exec(command, (err, stdout, stderr) => {
    console.log("OUTPUT:", stdout);

    if (stdout.includes("SUCCESS")) {
      res.download(outputPath, "converted.docx");
    } else {
      res.status(500).json({ error: "Conversion failed", details: stdout });
    }
  });
});

// ---------------- DOCX TO PDF ----------------
app.post("/docx-to-pdf", upload.single("docx"), (req, res) => {
  const docxPath = req.file.path;
  const outputPath = `output/${Date.now()}.pdf`;

  const command = `python docx_to_pdf.py "${docxPath}" "${outputPath}"`;

  exec(command, (err, stdout, stderr) => {
    console.log("OUTPUT:", stdout);

    if (stdout.includes("SUCCESS")) {
      res.download(outputPath, "converted.pdf");
    } else {
      res.status(500).json({ error: "Conversion failed", details: stdout });
    }
  });
});

// ---------------- START SERVER ----------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
