const Db     = require('./mock/db');
const config = require('./mock/config');
const eol    = require('os').EOL;
const log    = require('../app/cmd-log');
const test   = require('tape');

// connect to a mock database for testing
Db(function(err, db) {
  
  if (err) {
    console.warn('Can\'t initialize test database.');
    console.warn(err.message);
    process.exit(1);
  }

  test('cmd-log: should log correct output', function(t) {
    t.plan(5);
    const options = {};

    log(config, options, db, function(err, output) {
      const lines = output.split(eol);
      t.notOk(err);
      t.equals(lines.length, 3);
      t.notEquals(lines[2].indexOf('foo'), -1);
      t.notEquals(lines[1].indexOf('bar'), -1);
      t.notEquals(lines[0].indexOf('baz'), -1);
    });
  });

  test('cmd-log: --number flag', function(t) {
    t.plan(3);
    const options = {
      '--number' : 1,
    };

    log(config, options, db, function(err, output) {
      const lines = output.split(eol);
      t.notOk(err);
      t.equals(lines.length, 1);
      t.notEquals(lines[0].indexOf('baz'), -1);
    });
  });

  test('cmd-log: --ascending flag', function(t) {
    t.plan(5);
    const options = {
      '--ascending' : true,
    };

    log(config, options, db, function(err, output) {
      const lines = output.split(eol);
      t.notOk(err);
      t.equals(lines.length, 3);
      t.notEquals(lines[0].indexOf('foo'), -1);
      t.notEquals(lines[1].indexOf('bar'), -1);
      t.notEquals(lines[2].indexOf('baz'), -1);
    });
  });

  test('cmd-log: --from flag', function(t) {
    t.plan(4);
    const options = {
      '--from' : 'January 2 2017', 
    };

    log(config, options, db, function(err, output) {
      const lines = output.split(eol);
      t.notOk(err);
      t.equals(lines.length, 2);
      t.notEquals(lines[0].indexOf('baz'), -1);
      t.notEquals(lines[1].indexOf('bar'), -1);
    });
  });

  test('cmd-log: --from flag - should error on invalid date', function(t) {
    t.plan(1);
    const options = {
      '--from' : 'xxx', 
    };

    log(config, options, db, function(err, output) {
      t.equals(err.message, 'Could not parse "xxx" as a date.');
    });
  });

  test('cmd-log: --until flag', function(t) {
    t.plan(4);
    const options = {
      '--until' : 'January 2 2017', 
    };

    log(config, options, db, function(err, output) {
      const lines = output.split(eol);
      t.notOk(err);
      t.equals(lines.length, 2);
      t.notEquals(lines[0].indexOf('bar'), -1);
      t.notEquals(lines[1].indexOf('foo'), -1);
    });
  });

  test('cmd-log: --until flag - should throw on invalid date', function(t) {
    t.plan(1);
    const options = {
      '--until' : 'xxx', 
    };

    log(config, options, db, function(err, output) {
      t.equals(err.message, 'Could not parse "xxx" as a date.');
    });
  });

  test('cmd-log: --search flag', function(t) {
    t.plan(3);
    const options = {
      '--search' : 'foo', 
    };

    log(config, options, db, function(err, output) {
      const lines = output.split(eol);
      t.notOk(err);
      t.equals(lines.length, 1);
      t.notEquals(lines[0].indexOf('foo'), -1);
    });
  });

  test('cmd-log: --search flag', function(t) {
    t.plan(3);
    const options = {
      '--search' : '+test',
    };

    log(config, options, db, function(err, output) {
      const lines = output.split(eol);
      t.notOk(err);
      t.equals(lines.length, 1);
      t.notEquals(lines[0].indexOf('foo'), -1);
    });
  });

});
