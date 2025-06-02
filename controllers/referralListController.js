const ReferralList = require('../models/referralList');
const Doctor = require('../models/doctor');
const Referral = require('../models/referral');

// Показати всі списки
exports.getAll = async (req, res) => {
  const referralLists = await ReferralList.find()
    .populate('doctor')
    .populate('referrals');
  res.render('referralList', { referralLists });
};

// Форма створення
exports.getCreateForm = async (req, res) => {
  const doctors = await Doctor.find();
  res.render('referralListEdit', { doctors });
};

// Створити новий список
exports.create = async (req, res) => {
  try {
    const doctorId = req.body.doctor;
    const referrals = await Referral.find({ doctor: doctorId });
    const referralList = new ReferralList({
      doctor: doctorId,
      referrals: referrals.map(r => r._id)
    });
    await referralList.save();
    res.redirect('/referralLists');
  } catch (err) {
    res.status(400).send('Помилка створення: ' + err.message);
  }
};

// Форма редагування
exports.getEditForm = async (req, res) => {
  const referralList = await ReferralList.findById(req.params.id)
    .populate('doctor')
    .populate('referrals');
  const doctors = await Doctor.find();

  if (!referralList) return res.status(404).send('Список не знайдено');

  const doctorsWithSelection = doctors.map(doc => ({
    _id: doc._id,
    name: doc.name,
    specialization: doc.specialization,
    selected: doc._id.toString() === referralList.doctor._id.toString()
  }));

  res.render('referralListEdit', { referralList, doctors: doctorsWithSelection });
};

// Оновити список
exports.update = async (req, res) => {
  try {
    const doctorId = req.body.doctor;
    const referrals = await Referral.find({ doctor: doctorId });

    await ReferralList.findByIdAndUpdate(req.params.id, {
      doctor: doctorId,
      referrals: referrals.map(r => r._id)
    });

    res.redirect('/referralLists');
  } catch (err) {
    res.status(400).send('Помилка оновлення: ' + err.message);
  }
};

// Видалити список
exports.delete = async (req, res) => {
  try {
    await ReferralList.findByIdAndDelete(req.params.id);
    res.redirect('/referralLists');
  } catch (err) {
    res.status(500).send('Помилка видалення: ' + err.message);
  }
};
