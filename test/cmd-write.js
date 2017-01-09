const Db     = require('./mock/db');
const config = require('./mock/config');
const test   = require('tape');
const write  = require('../app/cmd-write');

// connect to a mock database for testing
Db(function(err, db) {

  if (err) {
    console.warn('Can\'t initialize test database.');
    console.warn(err.message);
    process.exit(1);
  }

  test('cmd-write: should write a log entry', function(t) {
    t.plan(6);
    const options = {
      '<entry>' : [ 'qux' ],
    };

    write(config, options, db, function(err) {
      t.notOk(err);

      const query = 'SELECT * FROM Log';
      db.all(query, function(err, rows) {
        t.notOk(err);
        t.equals(rows.length, 4);
        t.equals(rows[3].id, 4);
        t.equals(rows[3].entry, 'qux');
        t.notEquals(rows[3].timestamp, NaN);
      });
    });
  });

});
