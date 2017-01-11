module.exports = function(config, options, db, callback) {

  // buffer the id
  const id     = options['<id>'];

  // assemble prepared-statement placeholders for each id. (Placeholders may be
  // used for scalar values only. We may not use an array here.)
  const params = id.map(function() { return '?'; }).join(', ');

  // concatenate the database query
  const query  = 'DELETE FROM Log WHERE id IN (' + params + ')';

  // called back after query is run
  const cb = function(err) {

    // fail if an error occured
    if (err) { return callback(err); }

    // fail if no records were deleted
    if (this.changes === 0) {
      return callback(new Error('ID ' + id.join(', ') + ' is invalid.'));
    }

    callback();
  };

  // dynamically apply the arguments. (NB: we aren't using the spread [...]
  // operator here in order to maintain backwards-compatibility with node as
  // far back as we can.)
  db.run.apply(db, [ query ].concat(id, cb));
};
