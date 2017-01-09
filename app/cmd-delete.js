module.exports = function(config, options, db, callback) {

  const id    = options['<id>'];
  const query = 'DELETE FROM Log WHERE id = ?';

  db.run(query, id, function(err) {

    // fail if an error occured
    if (err) { return callback(err); }

    // fail if no records were deleted
    if (this.changes === 0) {
      return callback(new Error('ID ' + id + ' is invalid.'));
    }

    callback();
  });

};
