// routes/advertisement.js
const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    const { title, price, area, rooms, purpose } = req.body;
    const image = req.file ? req.file.path : null;
    const advertisement = new Advertisement({ title, price, area, image, userId: req.session.userId, rooms, purpose });
    await advertisement.save();
    res.redirect('/lk');
});

router.get('/api', async (req, res) => {
    const advertisements = await Advertisement.find();
    res.status(200).json(advertisements);
});

router.get('/', (req, res) => {
    res.render('advertisement.ejs');
});

module.exports = router;