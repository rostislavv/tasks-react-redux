const express = require('express');
const router = new express.Router();
const loggedIn = require('../lib/auth');

router.get('/tasks',
  loggedIn,
  (req, res) => {
    res.json([
      {name: 'task1', owner: 'admin', id: 1},
      {name: 'task2', owner: 'user', id: 2},
    ]);
  }
);

module.exports = router;
