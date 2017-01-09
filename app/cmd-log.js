const decorate  = require('./util-decorate');
require('datejs');

module.exports = function(config, options, db, callback) {

  var from;
  var until;

  // build the 'from' and 'until' phrases
  try {
    from = (options['--from'])
      ? Date.parse(options['--from']) .getTime()
      : 0 ;
  } catch (e) {
    return callback(new Error(
      'Could not parse "' + options['--from'] + '" as a date.'
    ));
  }
  try {
    until = (options['--until'])
      ? Date.parse(options['--until']) .getTime()
      : 9999999999999 ;
  } catch (e) {
    return callback(new Error(
      'Could not parse "' + options['--until'] + '" as a date.'
    ));
  }

  // build the 'search' phrase
  const search = (options['--search'])
    ? '%' + options['--search'] + '%'
    : '%' ;

  // build the 'order' phrase
  const order  = (options['--ascending'])
    ? 'ASC'
    : 'DESC' ;

  // parse the limit
  const limit  = options['--number'] || 10;

  // construct the query
  const query = [
    'SELECT *',
    'FROM Log',
    'WHERE timestamp >= ?',
    'AND timestamp <= ?',
    'AND entry LIKE ?',
    'ORDER BY id ' + order,
    'LIMIT ?',
  ].join(' ');

  // run the query
  db.all(query, from, until, search, limit, function(err, rows) {
    if (err) { return callback(err); }
    callback(null, decorate(config, options, rows));
  });

};
