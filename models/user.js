const mongoose = require('mongoose'); // Import mongoose library to interact with MongoDB
// Define a schema (structure) for storing user data in the database
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true // Prevents duplicate emails
  },
  phone: String,
  password: String
});
// Export the model so it can be used in other parts of the application
// 'User' will be the collection name in MongoDB (automatically pluralized to 'users')
module.exports = mongoose.model('User', userSchema);
