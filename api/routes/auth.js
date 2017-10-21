const express = require('express');
const passport = require('passport');
const { session: { cookie: { maxAge } }, reports } = require('../../config/server');

const router = new express.Router();

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    const session = req.session;
    session.agency_id = +req.user.agency_id
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
