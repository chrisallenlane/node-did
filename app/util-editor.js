const child_process = require('child_process');
const fs            = require('fs');
const tmp           = require('tmp');

module.exports = function(config, entry, callback) {

  // make "entry" text optional
  if (! callback) {
    callback = entry;
    entry    = null;
  }

  // Determine which EDITOR is set, and error out if unset.
  const editor = config.editor || false;
  if (! editor) {
    return callback(new Error('EDITOR is not set. Aborting.'));
  }

  // create a temporary file
  const file = tmp.fileSync().name;

  // if `entry` was provided, populate the temp file with it
  if (entry !== null) {
    fs.writeFileSync(file, entry);
  }

  // spawn the editor in the active shell
  const child = child_process.spawn(editor, [ file ], { stdio: 'inherit' });

  // call back with the file's contents when the editor is closed
  child.on('exit', function (code) {
    fs.readFile(file, 'utf8', callback);
  });
};
