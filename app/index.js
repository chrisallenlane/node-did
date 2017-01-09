#!/usr/bin/env node

// make package.json accessible
const pkg     = require('../package.json');

// dependencies
const config  = require('./config');
const docopt  = require('docopt').docopt;
const expand  = require('expand-tilde');
const fs      = require('fs');
const path    = require('path');
const sqlite3 = require('sqlite3').verbose();

// generate and parse the command-line options
const doc     = fs.readFileSync(path.join(__dirname, 'docopt.txt'), 'utf8');
const options = docopt(doc, { version: pkg.version });

// database
config.database = expand(config.database);
const existed   = fs.existsSync(config.database);
const db        = new sqlite3.Database(config.database);

// continue when the database has opened
db.on('open', function() {

  // emit 'ready' if the database previously existed
  if (existed) { db.emit('ready'); }

  // otherwise, create the table
  else {
    const query = 'CREATE TABLE Log(id INTEGER PRIMARY KEY, entry TEXT, timestamp DATE)';
    db.run(query, function(err) {
      if (err) {
        console.warn(err.message);
        process.exit(1);
      }

      db.emit('ready');
    });
  }
});

// execute the subcommands when the database is ready
db.on('ready', function() {

  // load the subcommands
  const cmd = {
    delete : require('./cmd-delete'),
    edit   : require('./cmd-edit'),
    log    : require('./cmd-log'),
    write  : require('./cmd-write'),
  };

  // execute the appropriate subcommand
  const fn = 
    (options.delete) ? cmd.delete :
    (options.edit)   ? cmd.edit   :
    (options.log)    ? cmd.log    : cmd.write ;
  fn(config, options, db, function(err, output) {

    // handle errors
    if (err) {
      console.warn(err.message);
      process.exit(1);
    }

    // display output
    if (output) {
      console.log(output);
    }

  });

});
