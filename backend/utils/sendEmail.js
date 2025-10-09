const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook'
  auth: {
    user: process.env.EMAIL_USER,     // set in your .env file
    pass: process.env.EMAIL_PASSWORD, // app password
  },
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;