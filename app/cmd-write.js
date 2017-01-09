const editor = require('./util-editor');

module.exports = function(config, options, db, callback) {

  const entry = options['<entry>'].join(' ') || '';

  // If the entry was supplied as a command-line argument, insert it
  // immediately
  if (entry !== '') {
    insert(db, entry, callback);
  }

  // otherwise, open $EDITOR and write/read to/from a temp file
  else {
    editor(config, function(err, entry) {
      if (err) { return callback(err); }
      insert(db, entry, callback);
    });
  }
};

// inserts into the database
const insert = function(db, entry, callback) {

  // trim the entry
  entry = entry.trim();

  // fail if the entry is empty
  if (entry === '') {
    return callback(new Error('Entry is empty. Aborting.'));
  }

  // run the query
  const query = 'INSERT INTO Log(entry, timestamp) VALUES(?, ?)';
  db.run(query, entry, new Date(), callback);
};
