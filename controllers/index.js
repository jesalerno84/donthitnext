const express = require('express');
const passport = require('passport');
const ensureAuthenticated = require('../middlewares/auth');
const router = express.Router();

router.use('/auth', require('./authController'));
router.use('/api', require('./apiController'));

router.use('/login', (req, res) => {
    res.render('login', {user: req.user, title: 'login - donthitnext.com'});
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index', {user: req.user, title: 'donthitnext.com'});
});

module.exports = router;