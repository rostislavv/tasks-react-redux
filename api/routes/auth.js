const express = require('express');
const passport = require('passport');
const { session: { cookie: { maxAge } }} = require('../../config/server');

const router = new express.Router();

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.cookie('uid', req.user.id, { maxAge });
    res.send(req.user);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('uid');
  res.send({ message: 'Success logout' });
});

module.exports = router;
