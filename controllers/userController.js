const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age 
    });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
};

exports.editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('userForm', { user });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age 
    });
    res.redirect('/users');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};