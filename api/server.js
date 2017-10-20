const express = require('express');
const path = require('path');

const config = require('../config/server');

const router = require('./router');

const app = express();

app.use('/static',express.static(path.resolve(__dirname, '../build/static/')));
app.use('/', router);

module.exports = app;
