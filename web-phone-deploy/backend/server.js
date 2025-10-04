require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check endpoint
app.get('/ping', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Dev Phone Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API endpoints placeholder
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    service: 'dev-phone-backend',
    version: '1.0.0-beta.1',
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID ? 'configured' : 'not configured'
    }
  });
});

// Twilio phone numbers endpoint
app.get('/api/phone-numbers', async (req, res) => {
  try {
    const phoneNumbers = await twilioClient.incomingPhoneNumbers.list();
    res.json({
      success: true,
      phoneNumbers: phoneNumbers.map(number => ({
        sid: number.sid,
        phoneNumber: number.phoneNumber,
        friendlyName: number.friendlyName,
        capabilities: number.capabilities
      }))
    });
  } catch (error) {
    console.error('Error fetching phone numbers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch phone numbers',
      message: error.message
    });
  }
});

// Generate Twilio access token for client
app.post('/api/token', (req, res) => {
  try {
    const { identity } = req.body;
    if (!identity) {
      return res.status(400).json({
        success: false,
        error: 'Identity is required'
      });
    }

    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY || process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_SECRET || process.env.TWILIO_AUTH_TOKEN
    );

    token.identity = identity;
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
      incomingAllow: true
    });
    token.addGrant(voiceGrant);

    res.json({
      success: true,
      token: token.toJwt()
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate token',
      message: error.message
    });
  }
});

// Serve static files from the public directory
app.use('/static', express.static(path.join(__dirname, '../public')));

// Catch-all handler for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not implemented',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Dev Phone Backend server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/ping`);
}); 