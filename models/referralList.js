const mongoose = require('mongoose');

const referralListSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Referral' }]
});

module.exports = mongoose.model('ReferralList', referralListSchema);
