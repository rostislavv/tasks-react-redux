const express = require('express');
const router = new express.Router();
const loggedIn = require('../lib/auth');

router.get('/tasks',
  loggedIn,
  (req, res) => {
    res.json([
     { owner: 'admin', performer: 'admin',
       state: 'open', date: '22.10.2017',
       description: 'Do stuff'},
       { owner: 'admin', performer: 'user', state: 'done', date: '21.10.2017', description: 'Done stuff'},
       { owner: 'admin', performer: 'user', state: 'done', date: '20.10.2017', description: 'New task'}
    ]);
  }
);

module.exports = router;
