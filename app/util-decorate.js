const chalk = require('chalk');
const esc   = require('escape-string-regexp');
const table = require('text-table');

module.exports = function(config, options, rows) {
  
  // transform each row into a formatted string
  const transformed = rows.map(function(row) {

    // colorize the id
    const id  = chalk[config.color.id](row.id);
    
    // colorize and format the entry
    var entry = row.entry;

    // highlight matches if --search was provided
    if (options['--search']) {
      const global = new RegExp(esc(options['--search']), 'gi');
      const local  = new RegExp(esc(options['--search']), 'i');
      entry.match(global).forEach(function(m) {
        entry = entry.replace(local, chalk[config.color.match](m));
      });
    }
    // also apply a configured color to the rest of the entry string
    entry = chalk[config.color.entry](entry);

    // colorize and format the timestamp
    const timestamp = chalk[config.color.timestamp](
      new Date(row.timestamp).toString(config.dateFormat)
    );

    // return the formatted row
    return [ id, entry, timestamp ];
  });

  // return the formatted strings laid out as a table
  return table(transformed);

};
