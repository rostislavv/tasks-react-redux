const express = require('express');
const router = new express.Router();
const loggedIn = require('../lib/auth');
const { query } = require('../database');

router.get('/tasks',
  loggedIn,
  (req, res) => {
    query(
      `SELECT
         rowid as id,
         owner, performer, state, date, description
       FROM tasks WHERE owner = ? OR performer = ?`,
       [req.user.username], false)
    .then(result => {
      res.json(result);
    })
  }
);

module.exports = router;
