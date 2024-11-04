// // server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB





mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
