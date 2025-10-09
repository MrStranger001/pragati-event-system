require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  twilioSID: process.env.TWILIO_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhone: process.env.TWILIO_PHONE,
  port: process.env.PORT || 3000,
};