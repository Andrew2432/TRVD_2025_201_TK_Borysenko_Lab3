const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const ctrl    = require('../controllers/doctorController');

// налаштування multer
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, 'public/uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 1) Список лікарів + форма
router.get('/', ctrl.getDoctors);
// 2) Створити
router.post('/', upload.single('photo'), ctrl.createDoctor);
// 3) Форма редагування
router.get('/:id/edit', ctrl.editDoctorForm);
// 4) Оновити
router.post('/:id/edit', upload.single('photo'), ctrl.updateDoctor);
// 5) Видалити
router.post('/:id/delete', ctrl.deleteDoctor);

module.exports = router;