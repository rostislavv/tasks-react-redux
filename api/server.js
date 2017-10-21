const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authLib = require('./lib/auth');

const config = require('../config/server');

const router = require('./router');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  store: new FileStore(config.session.fileStoreOptions),
  secret: config.session.secret,
  name: config.session.name,
  cookie: config.session.cookie,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/static',express.static(path.resolve(__dirname, '../build/static/')));
app.use('/', router);

module.exports = app;
