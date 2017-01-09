#!/usr/bin/env node

const fs = require('fs');

// mock as if the user saved 'quux' to the open file
fs.writeFileSync(process.argv[2], 'quux', 'utf8');
