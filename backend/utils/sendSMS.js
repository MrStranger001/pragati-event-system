const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(to, body) {
  await client.messages.create({
    body,
    from: process.env.TWILIO_PHONE, // your Twilio phone number
    to,
  });
}

module.exports = sendSMS;