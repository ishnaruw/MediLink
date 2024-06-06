const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3100;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Data structure to store medication information mapped to users
const userMedications = {};

// Endpoint to save medication information for a user
app.post('/save-medications', (req, res) => {
  const { userId, medications } = req.body;
  if (!userId || !Array.isArray(medications)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  userMedications[userId] = medications;
  return res.status(200).json({ message: 'Medications saved successfully' });
});

// Endpoint to retrieve medication information for a user
app.get('/get-medications/:userId', (req, res) => {
  const userId = req.params.userId;
  const medications = userMedications[userId];
  if (!medications) {
    return res.status(404).json({ error: 'Medications not found for the user' });
  }
  return res.status(200).json({ medications });
});

// Endpoint to delete medication information for a user
app.delete('/delete-medications/:userId', (req, res) => {
  const userId = req.params.userId;
  if (!userMedications[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  delete userMedications[userId];
  return res.status(200).json({ message: 'Medications deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
