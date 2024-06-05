const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

// Initialize the express app
const app = express();

// Use CORS middleware
app.use(cors());

// Body parser middleware to parse JSON requests
app.use(bodyParser.json());

// Your Twilio account SID and Auth Token from Twilio console
const accountSid = 'hidden';
const authToken = 'hidden';
const client = twilio(accountSid, authToken);

// Endpoint to send SMS
app.post('/send-sms', (req, res) => {
  const { to, message } = req.body;

  client.messages.create({
    body: message,
    from: '+18667183293',
    to: to
  })
  .then(message => res.json({ success: true, messageSid: message.sid }))
  .catch(error => res.status(500).json({ success: false, error: error.message }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
