// models/Doctor.js
const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: String,
  email: String,
  photo: String
});
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;