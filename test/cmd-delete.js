const Db     = require('./mock/db');
const config = require('./mock/config');
const del    = require('../app/cmd-delete');
const test   = require('tape');


test('cmd-delete: should delete a log entry', function(t) {
  t.plan(6);

  // mock clean database for each test
  Db(function(err, db) {
    t.notOk(err, 'could not mock database (1)');

    const options = {
      '<id>' : ['3'],
    };

    del(config, options, db, function(err) {
      t.notOk(err);

      const query = 'SELECT * FROM Log';
      db.all(query, function(err, rows) {
        t.notOk(err);
        t.equals(rows.length, 2);
        t.equals(rows[0].id, 1);
        t.equals(rows[1].id, 2);
      });
    });
  });

});


test('cmd-delete: should error on invalid <id>', function(t) {
  t.plan(4);

  // mock clean database for each test
  Db(function(err, db) {
    t.notOk(err, 'could not mock database (1)');

    const options = {
      '<id>' : ['xxx'],
    };

    del(config, options, db, function(err) {
      t.ok(err);

      const query = 'SELECT * FROM Log';
      db.all(query, function(err, rows) {
        t.notOk(err);
        t.equals(rows.length, 3);
      });
    });
  });

});
