const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement');


router.post('/', async (req, res) => {
    const advertisement = new Advertisement(req.body);
    await advertisement.save();
    res.status(201).send(advertisement);
});

router.get('/', async (req, res) => {
    const advertisements = await Advertisement.find();
    res.status(200).send(advertisements);
});

module.exports = router;