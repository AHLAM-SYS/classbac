const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://lenu0215:ahlam08@cluster0.f59hb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for student registration
const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    grade: String
});

const Student = mongoose.model('Student', StudentSchema);

// API endpoint to register a student
app.post('/register', async (req, res) => {
    const student = new Student(req.body);
    try {
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
