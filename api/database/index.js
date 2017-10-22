const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const moment = require('moment');

const crypto = require('crypto');


//move this to another file!!!
db.serialize(function() {
  db.run("CREATE TABLE users (username TEXT, password TEXT)");

  const stmt = db.prepare("INSERT INTO users(username, password) VALUES (?, ?)");
  const users = [
    {username: 'admin', password: 'admin'},
    {username: 'user', password: 'user'}
  ]

  console.log('db creation process');
  const encode = password => crypto.createHash('md5').update(password).digest('hex');
  users.forEach(({ username, password }) => console.log(username, encode(password)));
  users.forEach(({ username, password }) => stmt.run(username, encode(password)));
  stmt.finalize();

  // create table tasks
  db.run('CREATE TABLE tasks (owner TEXT, performer TEXT, state TEXT, date TEXT, description Text)');
  const stmtTasks = db.prepare('INSERT INTO tasks(owner, performer, state, date, description) VALUES (?, ?, ?, ?, ?)');
  const date = moment().format();
  const tasks = [
    { owner: 'admin', performer: 'admin', state: 'open', date: date, description: 'Admin-admin task, open'},
    { owner: 'admin', performer: 'user', state: 'done', date: date, description: 'Admin-user task, done'},
    { owner: 'user', performer: 'user', state: 'open', date: date, description: 'User-user task, open'},
    { owner: 'user', performer: 'user', state: 'open', date: date, description: 'User-user task, open'}
  ]
  tasks.forEach(({ owner, performer, state, date, description}) => {
    stmtTasks.run(owner, performer, state, date, description);
  })
  stmtTasks.finalize();
});

const query = (sql, params, single = true) => new Promise((resolve, reject) => {
  const type = (single) ? 'get' : 'all';
    db[type](sql, params, (err, row) => {
      if(err){
        reject(err);
      }
      resolve(row);
    })
  }
);

const run = (sql, params) =>
  new Promise((resolve, reject) =>
    db.run(sql, params, (err, row) => {
      if(err){
        reject(err);
      }
      resolve(row);
    })
  );


module.exports.connection = db;
module.exports.query = query;
module.exports.run = run;
module.exports.closeConnection = () => db.close();
