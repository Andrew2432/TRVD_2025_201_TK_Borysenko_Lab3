const Doctor = require('../models/doctor');

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render('doctors', { doctors });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.createDoctor = async (req, res) => {
  console.log('createDoctor body:', req.body, 'file:', req.file);
  try {
    const photoPath = req.file ? '/uploads/' + req.file.filename : '';
    await new Doctor({
      name:           req.body.name,
      specialization: req.body.specialization,
      phone:          req.body.phone,
      email:          req.body.email,
      photo:          photoPath
    }).save();
    res.redirect('/doctors');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
};

exports.editDoctorForm = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send('Лікаря не знайдено');
    res.render('doctorEdit', { doctor });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const updateData = {
      name:           req.body.name,
      specialization: req.body.specialization,
      phone:          req.body.phone,
      email:          req.body.email
    };
    if (req.file) updateData.photo = '/uploads/' + req.file.filename;

    await Doctor.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/doctors');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.redirect('/doctors');
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};