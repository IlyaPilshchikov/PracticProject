const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id; 
    res.status(201).send(user);
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        req.session.userId = user._id;
        res.status(200).send({ success: true, userId: user._id });
    } else {
        res.status(401).send({ success: false, message: 'Invalid credentials' });
    }
});

router.get('/', (req, res)=>{
    res.render('login.ejs')
})


module.exports = router;