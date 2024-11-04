const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for registrations
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    grade: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { name, email, grade } = req.body;
        const newRegistration = new Registration({ name, email, grade });
        await newRegistration.save();
        res.status(201).json(newRegistration);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
