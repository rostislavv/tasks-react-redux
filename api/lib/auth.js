const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const omit = require('lodash/omit');
const { query } = require('../database');

passport.use(new LocalStrategy(
  (username, password, done) => {
    const pass = crypto.createHash('md5').update(password).digest('hex');

    query('SELECT rowid as id, username, password FROM users WHERE username = ?', [username])
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (user.password !== pass) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, omit(user, ['password']));
      })
      .catch(err => done(err));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //done(null, user);
  console.log('calling deserialize user function');
  query('SELECT rowid as id, username, password FROM users WHERE rowid = ? ', [user.id])
    .then((user) => {
      console.log('USER' , user);
      done(null, user);
    })
  });

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.clearCookie('uid');
    res.status(401);
    res.send({ code: 401, message: 'Unauthorized' });
  }
}

module.exports = loggedIn;
