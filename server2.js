const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 4000;

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Save uploaded images to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Retrieve user's email address from request (assuming it's passed as a query parameter)
    const userEmail = req.query.email;
    if (userEmail) {
      // Sanitize email address to remove special characters
      const sanitizedEmail = userEmail.replace(/[@.]/g, '_');
      // Generate filename with user's email address and original file extension
      const filename = `${sanitizedEmail}_${Date.now()}${file.originalname.slice(-4)}`;
      cb(null, filename);
    } else {
      cb(new Error('Email address not provided'));
    }
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// POST endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Image uploaded successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
