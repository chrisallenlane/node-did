const Db     = require('./mock/db');
const config = require('./mock/config');
const edit   = require('../app/cmd-edit');
const test   = require('tape');

test('cmd-edit: should edit a log entry (entry via cli)', function(t) {
  t.plan(10);

  // mock clean database for each test
  Db(function(err, db) {
    t.notOk(err, 'could not mock database (1)');

    const options = {
      '<id>'    : 3,
      '<entry>' : [ 'qux' ],
    };

    edit(config, options, db, function(err) {
      t.notOk(err);

      const query = 'SELECT * FROM Log';
      db.all(query, function(err, rows) {
        t.notOk(err);
        t.equals(rows.length, 3);
        t.equals(rows[0].id, 1);
        t.equals(rows[0].entry, 'foo');
        t.equals(rows[1].id, 2);
        t.equals(rows[1].entry, 'bar');
        t.equals(rows[2].id, 3);
        t.equals(rows[2].entry, 'qux');
      });
    });
  });

});

test('cmd-edit: should edit a log entry (entry via editor)', function(t) {
  t.plan(10);

  // mock clean database for each test
  Db(function(err, db) {
    t.notOk(err, 'could not mock database (1)');

    const options = {
      '<id>'    : 3,
      '<entry>' : [],
    };

    edit(config, options, db, function(err) {
      t.notOk(err);

      const query = 'SELECT * FROM Log';
      db.all(query, function(err, rows) {
        t.notOk(err);
        t.equals(rows.length, 3);
        t.equals(rows[0].id, 1);
        t.equals(rows[0].entry, 'foo');
        t.equals(rows[1].id, 2);
        t.equals(rows[1].entry, 'bar');
        t.equals(rows[2].id, 3);
        t.equals(rows[2].entry, 'quux');
      });
    });
  });

});
