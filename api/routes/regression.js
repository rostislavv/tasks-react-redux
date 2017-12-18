const express = require('express');
const router = new express.Router();
const loggedIn = require('../lib/auth');
const { query, run } = require('../database');
const moment = require('moment');

const { exec } = require('child_process');

router.use(loggedIn);

router.get('/regression',
  (req, res) => {
    exec('./python/test.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    res.json(JSON.parse(stdout));

  });
  }
);


module.exports = router;
