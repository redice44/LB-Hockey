var ContentHandler = require('./content');

module.exports = exports = function(app, db) {
  // "use strict";

  var contentHandler = new ContentHandler(db);

  app.get('/', contentHandler.displaySchedule);

  app.get('/schedule', contentHandler.displaySchedule);

  app.get('/standings', contentHandler.displayStandings);

  app.get('/roster', contentHandler.displayRoster);

  app.get('/game/:permalink', contentHandler.displayGame);
  app.delete('/game/:permalink', contentHandler.deleteGame);

  app.get('/addgame', contentHandler.displayAddGame);
  app.post('/addgame', contentHandler.handleNewGame);

  app.get('/season/:season', contentHandler.displaySeason);

  app.get('/generate-season', contentHandler.generateSeason);
};
