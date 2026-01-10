const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads & output folders exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("output")) fs.mkdirSync("output");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// ---------------- PDF → WORD ----------------
app.post("/convert", upload.single("pdf"), (req, res) => {
  const pdfPath = req.file.path;
  const outputPath = `output/${Date.now()}.docx`;

  const command = `python3 pdf_to_word.py "${pdfPath}" "${outputPath}"`;

  exec(command, (err, stdout, stderr) => {
    console.log("OUTPUT:", stdout);

    if (stdout.includes("SUCCESS")) {
      res.download(outputPath, "converted.docx");
    } else {
      res.status(500).json({ error: "Conversion failed", details: stdout });
    }
  });
});

// ---------------- DOCX → PDF ----------------
app.post("/docx-to-pdf", upload.single("docx"), (req, res) => {
  const docxPath = req.file.path;
  const outputPath = `output/${Date.now()}.pdf`;

  const command = `python3 docx_to_pdf.py "${docxPath}" "${outputPath}"`;

  exec(command, (err, stdout, stderr) => {
    console.log("OUTPUT:", stdout);

    if (stdout.includes("SUCCESS")) {
      res.download(outputPath, "converted.pdf");
    } else {
      res.status(500).json({ error: "Conversion failed", details: stdout });
    }
  });
});

// ---------------- SERVER START (REPLIT MODE) ----------------
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log("Server running at http://" + host + ":" + port);
});
