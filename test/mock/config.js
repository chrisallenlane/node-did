const path = require('path');

module.exports = {

  // strip colors to make testing simpler
  color: {
    id        : 'stripColor',
    timestamp : 'stripColor',
    entry     : 'stripColor',
    match     : 'stripColor',
  },

  // this doesn't matter
  dateFormat : 'dd MMM | hh:mm tt',

  // this will 'no-op' in the shell
  editor     : path.join(__dirname, 'editor.js'),
};
