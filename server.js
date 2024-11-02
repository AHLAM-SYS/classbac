// // server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB


const uri = 'mongodb+srv://lenu0215:ahlam08@cluster0.f59hb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual connection string

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));



// Define a simple schema and model
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String,
    parentEmail: String,
});

const Student = mongoose.model('Student', studentSchema);

// Registration endpoint
app.post('/register', (req, res) => {
    const newStudent = new Student(req.body);
    newStudent.save()
        .then(() => res.status(201).send('Student registered'))
        .catch(err => res.status(400).send(err));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
