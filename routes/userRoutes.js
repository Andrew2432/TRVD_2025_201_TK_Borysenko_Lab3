const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

console.log('userController:', userController);
console.log('Тип userController.getUsers:', typeof userController.getUsers);

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/edit/:id', userController.editUserForm);
router.post('/edit/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);

module.exports = router;