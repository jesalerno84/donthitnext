const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/auth', require('./authController'));

router.get('/', (req, res) => {
    res.send('hello world');
});

module.exports = router;