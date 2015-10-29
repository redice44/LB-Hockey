module.exports = exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('schedule', {section: 0});
  });

  app.get('/schedule', function(req, res, next) {
    res.render('schedule', {section: 0});
  });

  app.get('/standings', function(req, res, next) {
    res.render('standings', {section: 1});
  });

  app.get('/roster', function(req, res, next) {
    res.render('roster', {section: 2});
  });
};
