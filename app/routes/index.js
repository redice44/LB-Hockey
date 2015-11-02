var ContentHandler = require('./content');

module.exports = exports = function(app, db) {
  // "use strict";

  var contentHandler = new ContentHandler(db);

  app.get('/', contentHandler.displaySchedule);

  app.get('/schedule', contentHandler.displaySchedule);

  app.get('/standings', contentHandler.displayStandings);

  app.get('/roster', contentHandler.displayRoster);

  app.get('/games', contentHandler.displayAllGames);

  // Games RESTful API
  app.route('/games/:permalink')
    .get(contentHandler.displayGame)
    .put(contentHandler.updateGame)
    .delete(contentHandler.deleteGame);
  app.get('/games/:permalink/edit', contentHandler.displayEditGame);

  app.route('/addgame')
    .get(contentHandler.displayAddGame)
    .post(contentHandler.handleNewGame);

  app.get('/season/:season', contentHandler.displaySeason);

  app.get('/generate-season', contentHandler.generateSeason);
};
