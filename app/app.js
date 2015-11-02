var express = require('express');
var app = express();
var routes = require('./routes/index');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

MongoClient.connect('mongodb://localhost:27017/lb-hockey', function(err, db) {
  // "use strict";

  if (err) {
    console.log(err);
    throw err;
  }

  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/../bower_components'));
  app.use(bodyParser.urlencoded({extended: false}));

  routes(app, db);

  app.listen(8082);
  console.log('Express Server listening on port 8082.');
});
