var express = require('express');
var app = express();
var routes = require('./routes/index');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

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
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));
  routes(app, db);

  app.listen(8082);
  console.log('Express Server listening on port 8082.');
});
