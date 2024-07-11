// routes/application.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

router.post('/submit-application', async (req, res) => {
    const { propertyType, rooms, contactPhone, contactName, details, purpose } = req.body;

    // Преобразование значения rooms в число
    const roomsNumber = parseInt(rooms, 10);

    // Проверка на NaN и установка значения по умолчанию, если rooms не выбрано
    if (isNaN(roomsNumber)) {
        return res.status(400).send('Rooms must be a number');
    }

    // Проверка на пустое значение purpose
    if (!purpose) {
        return res.status(400).send('Purpose is required');
    }

    const application = new Application({
        propertyType: propertyType,
        rooms: roomsNumber, // Используем преобразованное значение
        contactPhone: contactPhone,
        contactName: contactName,
        details: details,
        purpose: purpose
    });

    try {
        await application.save();
        res.redirect('/success'); // Перенаправление на страницу успешного сохранения
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;