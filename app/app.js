var express = require('express');
var app = express();
var routes = require('./routes/index');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../bower_components'));

routes(app);

app.listen(8082);
console.log('Express Server listening on port 8082.');
