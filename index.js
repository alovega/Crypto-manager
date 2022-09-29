#!/usr/local/bin/node

require = require('esm')(module)
require('dotenv').config();
require('./src/cli').cli(process.argv)