// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.get('/', (req, res) => {
    res.render('feedback.ejs');
});

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const feedback = new Feedback({ name, email, message });
        await feedback.save();
        res.redirect('/feedback');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;