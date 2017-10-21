const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const crypto = require('crypto');

db.serialize(function() {
  db.run("CREATE TABLE users (username TEXT, password TEXT)");

  const stmt = db.prepare("INSERT INTO users(username, password) VALUES (?, ?)");
  const users = [
    {username: 'admin', password: 'admin'},
    {username: 'user', password: 'user'}
  ]

  const encode = password => crypto.createHash('md5').update(password).digest('hex');
  users.forEach(({ username, password }) => console.log(username, encode(password)));
  users.forEach(({ username, password }) => stmt.run(username, encode(password)));
  stmt.finalize();
});

const query = (sql, params) => new Promise((resolve, reject) =>
  db.get(sql, params, (err, row) => {
    if(err){
      reject(err);
    }
    resolve(row);
  })
);


module.exports.connection = db;
module.exports.query = query;
module.exports.closeConnection = () => db.close();
