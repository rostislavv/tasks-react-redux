const express = require('express');
const router = new express.Router();
const loggedIn = require('../lib/auth');

router.use(loggedIn);

router.get('/users',
  (req, res) => {
    res.json(require('../../data/users.json'));
  }
);
module.exports = router;
