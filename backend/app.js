require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes ');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/event', eventRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));