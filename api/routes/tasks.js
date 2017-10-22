const express = require('express');
const router = new express.Router();
const loggedIn = require('../lib/auth');
const { query, run } = require('../database');
const moment = require('moment');

router.use(loggedIn);

router.get('/tasks',
  (req, res) => {
    query(
      `SELECT
         rowid as id,
         owner, performer, state, date, description
       FROM tasks WHERE owner = ? OR performer = ?`,
       [req.user.username, req.user.username], false)
    .then(result => {
      res.json(result);
    })
  }
);

router.post('/tasks', (req, res) => {
  console.log('REQ.BODY', req.body);
  query(`
    INSERT INTO tasks(owner, performer, state, date, description)
    VALUES(?, ?, ?, ?, ?)`,
    [
      req.user.username,
      req.body.performer,
      req.body.state,
      moment().format(),
      req.body.description
     ])
   .then(result => {
     res.json({message: 'Successfully saved'});
   })
})

router.post('/tasks/:id',(req, res) => {
  console.log('PARAMS', req.body, req.params.id);
  run(`UPDATE tasks
    SET
      performer = ?,
      state = ?,
      date = ?,
      description = ?
    WHERE rowid = ?`,
    [
      req.body.performer,
      req.body.state,
      moment().format(),
      req.body.description,
      req.params.id
     ])
   .then(result => {
     res.json({message: 'Successfully updated'});
   })
})

router.delete('/tasks/:id', (req, res) => {
  run(`DELETE FROM tasks WHERE rowid = ?`, req.params.id)
    .then(result => {
      res.json({message: 'Successfully deleted'});
    })
})

module.exports = router;
