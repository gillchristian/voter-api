'use strict';
var server = require('./app/server');
var config = require('./app/config');

server(config.port, __dirname, config.db);
