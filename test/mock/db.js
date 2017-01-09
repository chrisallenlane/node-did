const sqlite3 = require('sqlite3').verbose();

module.exports = function(callback) {

  // create an in-memory database for testing
  const db = new sqlite3.Database(':memory:');

  // query to create the database table
  const create = [
    'CREATE TABLE Log(',
      'id INTEGER PRIMARY KEY,',
      'entry TEXT,',
      'timestamp DATE',
    ')',
  ].join(' ');

  // query to populate the table with some records
  const insert = [
    'INSERT INTO Log (entry, timestamp) VALUES',
      '("foo", 1483246800000),', // 1 Jan 2017
      '("bar", 1483333200000),', // 2 Jan 2017
      '("baz", 1483419600000)',  // 3 Jan 2017
  ].join(' ');

  // run the queries when the database is opened
  db.on('open', function() {
    db.run(create, function(err) {
      if (err) { return callback(err); }

      db.run(insert, function(err) {
        if (err) { return callback(err); }
        callback(null, db);
      });
    });
  });
};
