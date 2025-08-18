const express = require('express');
const router = express.Router();
const Registration = require('../models/registration');

// GET all registrations
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get registrations' });
  }
});

// POST new registration
router.post('/registrations', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create registration' });
  }
});

// PUT to update a registration
router.put('/registrations/:id', async (req, res) => {
  try {
    const updated = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update registration' });
  }
});

// DELETE a registration
router.delete('/registrations/:id', async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete registration' });
  }
});

module.exports = router;
