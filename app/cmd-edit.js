const editor = require('./util-editor');

module.exports = function(config, options, db, callback) {

  const entry = options['<entry>'].join(' ') || '';
  const id    = options['<id>'];

  // If the entry was supplied as a command-line argument, insert it
  // immediately
  if (entry !== '') {
    update(db, id, entry, callback);
  }

  // otherwise, open $EDITOR and write/read to/from a temp file, which is
  // pre-populated with the old text
  else {

    const query = 'SELECT entry FROM Log WHERE id = ?';
    db.get(query, id, function(err, row) {
      if (err) { return callback(err); }

      editor(config, row.entry, function(err, entry) {
        if (err) { return callback(err); }
        update(db, id, entry, callback);
      });
    });

  }
};

// updates the database
const update = function(db, id, entry, callback) {
  
  // trim the entry
  entry = entry.trim();
  
  // fail if the entry is empty
  if (entry === '') {
    return callback(new Error('Entry is empty. Aborting.'));
  }

  // run the query
  const query = 'UPDATE Log SET entry = ? WHERE id = ?';
  db.run(query, entry, id, callback);
};
