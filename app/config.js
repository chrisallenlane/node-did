module.exports = require('rc')('did', {

  // path to the database
  database: '~/.did.sqlite3',

  // colorized output
  color: {
    id        : 'cyan',
    timestamp : 'green',
    entry     : 'white',
    match     : 'yellow',
  },

  // timestamp display format
  dateFormat : 'dd MMM | hh:mm tt',

  // EDITOR
  editor     : process.env.EDITOR,
});
