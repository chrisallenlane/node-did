module.exports = function(config, options, db, callback) {
  console.log(options)

  const id    = options['<id>'].join();
  const query = `DELETE FROM Log WHERE id IN (${id})`;

  db.run(query, function(err) {

    // fail if an error occured
    if (err) { return callback(err); }

    // fail if no records were deleted
    if (this.changes === 0) {
      return callback(new Error('ID ' + id + ' is invalid.'));
    }

    callback();
  });

};
