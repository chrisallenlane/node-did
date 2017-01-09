const sqlite3 = require('sqlite3').verbose();
require('datejs');

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
      '("foo +test", ?),',
      '("bar", ?),',
      '("baz", ?)',
  ].join(' ');
  const jan1 = Date.parse('January 1 2017'); 
  const jan2 = Date.parse('January 2 2017');
  const jan3 = Date.parse('January 3 2017');

  // run the queries when the database is opened
  db.on('open', function() {
    db.run(create, function(err) {
      if (err) { return callback(err); }

      db.run(insert, jan1, jan2, jan3, function(err) {
        if (err) { return callback(err); }
        callback(null, db);
      });
    });
  });
};
