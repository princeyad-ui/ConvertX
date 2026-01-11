const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { pdfToWord, wordToPdf } = require("./convert");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("output")) fs.mkdirSync("output");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// PDF → WORD



// DOCX → PDF


const port = process.env.PORT || 4000;  // ← ALWAYS 4000 FOR DEV

app.listen(port, "0.0.0.0", () => {
  console.log("Server running on " + port);
});
