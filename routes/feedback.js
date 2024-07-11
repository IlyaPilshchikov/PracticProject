const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('feedback.ejs');
});

module.exports = router;