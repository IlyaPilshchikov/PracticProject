// routes/catalog.js
const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement');

router.get('/', async (req, res) => {
    try {
        const advertisements = await Advertisement.find();
        res.render('catalog.ejs', { advertisements });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/search', async (req, res) => {
    const { title, roomCount, priceFrom, priceTo, areaFrom, areaTo, sortBy, sortOrder, purpose } = req.query;

    const query = {};
    if (title) {
        query.title = title;
    }
    if (roomCount) {
        query.rooms = parseInt(roomCount, 10);
    }
    if (priceFrom || priceTo) {
        query.price = {};
        if (priceFrom) query.price.$gte = parseInt(priceFrom, 10);
        if (priceTo) query.price.$lte = parseInt(priceTo, 10);
    }
    if (areaFrom || areaTo) {
        query.area = {};
        if (areaFrom) query.area.$gte = parseInt(areaFrom, 10);
        if (areaTo) query.area.$lte = parseInt(areaTo, 10);
    }
    if (purpose) {
        query.purpose = purpose;
    }

    const sort = {};
    const allowedSortBy = ['price', 'area', 'rooms'];
    if (sortBy && allowedSortBy.includes(sortBy)) {
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
        sort.price = 1; 
    }

    try {
        const advertisements = await Advertisement.find(query).sort(sort);
        res.render('catalog.ejs', { advertisements });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;