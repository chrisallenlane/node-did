const config = require('./mock/config');
const editor = require('../app/util-editor');
const test   = require('tape');

test('util-editor: should error if an editor is not specified', function(t) {
  t.plan(2);
  editor({}, 'quux', function(err, entry) {
    t.notOk(entry);
    t.equals(err.message, 'EDITOR is not set. Aborting.');
  });
});

test('util-editor: should spawn an editor and return edited file content', function(t) {
  t.plan(2);
  editor(config, 'quux', function(err, entry) {
    t.notOk(err);
    t.equals(entry, 'quux');
  });
});

test('util-editor: "entry" should be optional', function(t) {
  t.plan(2);
  editor(config, function(err, entry) {
    t.notOk(err);
    t.equals(entry, 'quux');
  });
});
