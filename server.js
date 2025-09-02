const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/user');
const Registration = require('./models/registration');

const app = express();
const PORT = 3000;

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/eventdb";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));
  
// ✅ Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Session setup
app.use(session({
  secret: 'adminsecret',
  resave: false,
  saveUninitialized: true
}));

// ------------------- SIGNUP -------------------
app.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already registered');
    }

    // Save new user in MongoDB
    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    res.status(201).send('Signup successful');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send('Server error');
  }
});

// ------------------- LOGIN -------------------
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

// ------------------- EVENT REGISTRATION -------------------
app.post('/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/registrations', async (req, res) => {
  try {
    const data = await Registration.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// Get all registrations
app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update attendance for a registration
app.put('/registrations/:id/attendance', async (req, res) => {
  const regId = req.params.id;
  const { status } = req.body; // should be "Attended" or "Not Attended"

  try {
    const registration = await Registration.findById(regId);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    registration.attendance = status;
    await registration.save();

    res.json({ message: `Attendance updated to ${status}` });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({ error: "Failed to update attendance" });
  }
});



// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
