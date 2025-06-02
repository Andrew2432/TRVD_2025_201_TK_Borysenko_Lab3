// controllers/referralController.js

const Referral = require('../models/referral');
const Doctor = require('../models/doctor'); 

// Отримання списку направлень і списку лікарів для форми створення
exports.getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find().populate('doctor');
    const doctors = await Doctor.find();
    res.render('referrals', { referrals, doctors });
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
};

// Створення нового направлення
exports.createReferral = async (req, res) => {
  try {
    const newReferral = new Referral({
      referralDate: req.body.referralDate || Date.now(),
      description: req.body.description,
      issuedTo: req.body.issuedTo,
      status: req.body.status || 'pending',
      doctor: req.body.doctor
    });
    await newReferral.save();
    res.redirect('/referrals');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
};

// Рендер форми редагування направлення
exports.editReferralForm = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id).populate('doctor');
    if (!referral) return res.status(404).send('Направлення не знайдено');
    
    // Завантаження списку лікарів
    const doctors = await Doctor.find();
    console.log("Doctors found:", doctors);  
    
    // Підготовка допоміжних властивостей для умов у шаблоні
    referral.isPending = referral.status === 'pending';
    referral.isCompleted = referral.status === 'completed';
    
    // Якщо referral.doctor існує, позначаємо вибраного лікаря
    if (referral.doctor) {
      doctors.forEach(doctor => {
        doctor.isDoctorSelected = (doctor._id.toString() === referral.doctor._id.toString());
      });
    }
    
    res.render('referralEdit', { referral, doctors });
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
};

// Оновлення направлення
exports.updateReferral = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) return res.status(404).send('Направлення не знайдено');

    referral.referralDate = req.body.referralDate || referral.referralDate;
    referral.description = req.body.description || referral.description;
    referral.issuedTo = req.body.issuedTo || referral.issuedTo;
    referral.status = req.body.status || referral.status;
    referral.doctor = req.body.doctor || referral.doctor;

    await referral.save();
    res.redirect('/referrals');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
};

// Видалення направлення
exports.deleteReferral = async (req, res) => {
  try {
    const referral = await Referral.findByIdAndDelete(req.params.id);
    if (!referral) return res.status(404).send('Направлення не знайдено');
    res.redirect('/referrals');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
};