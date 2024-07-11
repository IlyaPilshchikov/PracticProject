const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const advertisementRoutes = require('./routes/advertisements');
const app = express();
const path = require('path');
const indexRoutes = require('./routes/index');
const aboutRoutes = require('./routes/about');
const catalogRoutes = require('./routes/catalog');
const feedbackRoutes = require('./routes/feedback');
const lkRoutes = require('./routes/lk');
const loginRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registration');
const applicationRoutes = require('./routes/application');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'scss')));
app.use(express.static(path.join(__dirname, 'JS')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'uploads'))); 
app.use((req, res, next) => {
    console.log('Content-Type:', res.getHeader('Content-Type'));
    next();
});

const PORT = process.env.PORT || 5000;

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/floors').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
    process.exit();
});

app.use('/', indexRoutes);
app.use('/about', aboutRoutes);
app.use('/catalog', catalogRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/lk', lkRoutes);
app.use('/auth', loginRoutes);
app.use('/registration', registrationRoutes);
app.use('/advertisement', advertisementRoutes);
app.use('/', applicationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});