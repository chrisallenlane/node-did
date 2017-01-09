const Db       = require('./mock/db');
const config   = require('./mock/config');
const decorate = require('../app/util-decorate');
const eol      = require('os').EOL;
const test     = require('tape');

Db(function(err, db) {

  if (err) {
    console.warn('Can\'t initialize test database.');
    console.warn(err.message);
    process.exit(1);
  }

  test('util-decorate: should return formatted rows', function(t) {
    t.plan(8);

    const query = 'SELECT * FROM Log';

    // query some records
    db.all(query, function(err, rows) {
      t.notOk(err);

      // and decorate them
      const decorated = decorate(config, {}, rows).split(eol);
      t.equals(decorated.length, 3);
      t.equals(decorated[0].indexOf('1'), 0);
      t.notEquals(decorated[0].indexOf('foo'), -1);
      t.equals(decorated[1].indexOf('2'), 0);
      t.notEquals(decorated[1].indexOf('bar'), -1);
      t.equals(decorated[2].indexOf('3'), 0);
      t.notEquals(decorated[2].indexOf('baz'), -1);
    });
  });

});
