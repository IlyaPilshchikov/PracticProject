const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    const advertisements = await Advertisement.find({ userId: req.session.userId });
    res.render('lk', { advertisements });
});

module.exports = router;