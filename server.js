const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const port = 3000;

console.log('Тип referralListRoutes:', typeof require('./routes/referralListRoutes')); // має бути "function"
console.log('Тип referralRoutes:', typeof require('./routes/referralRoutes')); // має бути "function"
console.log('Тип doctorRoutes:', typeof require('./routes/doctorRoutes')); // має бути "function"

// Налаштування mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Хелпер для порівняння значень
mustacheExpress.tags = ['{{', '}}'];
mustacheExpress.escape = (text) => text;
mustacheExpress.renderers = {
  ...mustacheExpress.renderers,
  equals: (a, b) => a.toString() === b.toString()
};

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // для зображень

app.use(express.static('public')); // для стилізації
// app.use(express.urlencoded({ extended: true }));

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/Clinic');

// Налаштування для зберігання завантажених зображень
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
app.use('/uploads', express.static('public/uploads'));


// Middleware ДО маршрутів!
app.use(express.urlencoded({ extended: true })); // Для даних форм


// Статичні сторінки
app.get('/', (req, res) => res.render('index', { title: 'Головна' }));
app.get('/about', (req, res) => res.render('about'));


// Підключення маршрутів
// Переконайтеся, що кожен з цих файлів експортує саме екземпляр роутера Express (тобто, module.exports = router;)
app.use('/users', require('./routes/userRoutes'));
app.use('/referrals', require('./routes/referralRoutes'));
app.use('/referralLists', require('./routes/referralListRoutes'));
app.use('/doctors', require('./routes/doctorRoutes'));


app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});