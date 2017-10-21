const express = require('express');
const path = require('path');
const loggedIn = require('./lib/auth');

const router = express.Router();

router.use('/api/', require('./routes/auth'));
router.use(loggedIn);

router.get('*', (req, res, next) => {
  if (req.url === '/favicon.ico') return next();
  if (/\/api\//.test(req.url)) return next();

  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = router;
