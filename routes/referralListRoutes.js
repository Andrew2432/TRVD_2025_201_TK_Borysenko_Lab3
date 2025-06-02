const express = require('express');
const router = express.Router();
const referralListController = require('../controllers/referralListController');

// Перегляд усіх списків
router.get('/', referralListController.getAll);

// Форма створення
router.get('/create', referralListController.getCreateForm);

// Створити новий
router.post('/create', referralListController.create);

// Форма редагування
router.get('/:id/edit', referralListController.getEditForm);

// Оновити
router.post('/:id/edit', referralListController.update);

// Видалити
router.post('/:id/delete', referralListController.delete);

module.exports = router;
