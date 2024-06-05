// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize SQLite database
const db = new sqlite3.Database('./images.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, path TEXT)");
});

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
app.use(cors());
const upload = multer({ storage: storage });

// Endpoint to upload an image
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const filePath = req.file.path;
    db.run("INSERT INTO images (path) VALUES (?)", [filePath], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.send({ message: 'File uploaded successfully.', file: req.file });
  });
});


// Endpoint to get all images
app.get('/images', (req, res) => {
  db.all("SELECT * FROM images", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
