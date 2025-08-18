const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    idProof: String,
    event: String,
    date: String,
    time: String,
    attendance: { type: String, default: "Pending" } // Add this field
});

module.exports = mongoose.model('registration', RegistrationSchema);
