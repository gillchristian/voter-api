
'use strict';
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var sockets     = require('./sockets');

var zonesRoutes = require('./zones/zones.routes')(app, express);

module.exports = server;

/**
 * Handles the server setup
 *
 * @param {int}  port number
 * @param {string}  path
 * @param {string}  database access
 */
function server(port, path, db){

  // support url encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // CORS requres
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

  // connect to the db
  //mongoose.connect(db);

  // statics files location
  // TODO: change location for build
  app.use(express.static(path));

  app.get('/', (req, res)=>{
    res.sendFile(path + '/index.html');
  });

  // --- API Routes ---
  // zones
  //app.use('/api/zones', zonesRoutes);

  // set the sockets handlers
  sockets(http);

  // --- start the server ---
  // TODO: add port param from config
  http.listen(port, ()=>{
    console.log(`listening on *:${port}`);
  });
}
