const express = require('express');
const path = require('path');

const router = express.Router();

router.get('*', (req, res, next) => {
  if (req.url === '/favicon.ico') return next();
  if (/\/api\//.test(req.url)) return next();

  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = router;
