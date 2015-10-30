var ContentHandler = require('./content');

module.exports = exports = function(app, db) {
  "use strict";

  var contentHandler = new ContentHandler(db);

  app.get('/', contentHandler.displaySchedule);

  app.get('/schedule', contentHandler.displaySchedule);

  app.get('/standings', contentHandler.displayStandings);

  app.get('/roster', contentHandler.displayRoster);
};
