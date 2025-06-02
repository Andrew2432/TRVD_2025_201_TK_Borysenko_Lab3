const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referralDate: { type: Date, required: true },  
  description: String,
  issuedTo: String,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});

module.exports = mongoose.model('Referral', referralSchema);
