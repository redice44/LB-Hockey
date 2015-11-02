var TeamsDOA = require('./../models/teams').TeamsDOA;
var GamesDOA = require('./../models/games').GamesDOA;
var SeasonGenerator = require('./../generators/season').SeasonGEN;
var SeasonSimulator = require('./../simulators/season').SeasonSIM;

function ContentHandler(db) {
  // "use strict";

  var DOA = {};
  DOA.teams = new TeamsDOA(db);
  DOA.games = new GamesDOA(db);
  var seasonGenerator = new SeasonGenerator();
  // var seasonSimulator = new SeasonSimulator(DOA.games);

  this.displaySchedule = function(req, res, next) {
    // "use strict";

    // Eventually pull from ... user session? Probably.
    var team = 'Lucky Bastards';

    DOA.games.getSchedule(team, function(err, scheduledGames) {
      if (err) {
        console.log(err);
        throw err;
      }

      return res.render('schedule', {
        games: scheduledGames,
        section: 0
      });
    });
  };

  this.displaySeason = function(req, res, next) {
    // Eventually pull from something
    var season = 'Test Fall 2015';

    DOA.games.getSeason(season, function(err, seasonGames) {
      if (err) {
        console.log(err);
        throw err;
      }

      return res.render('schedule', {
        games: seasonGames,
        section: 0
      });
    });
  };

  this.generateSeason = function(req, res, next) {
    // "use strict";

    var name = 'Fall 2015';
    var start = new Date(2015, 07);
    var end = new Date(2015, 11);
    var gamesPlayed = 10;
    var teams = [
      'Dragons',
      'Boozers',
      'Five Holers',
      'Lucky Bastards'
    ];

    console.log('Content: Generating Season');
    
    DOA.games.addSeason(seasonGenerator.generate(name, start, end, gamesPlayed, teams),
      function(err, games) {
        if (err) {
          console.log(err);
          throw err;
        }

        console.log('Games inserted: ', games.length);
        // console.log('Games', games);

        console.log('Content callback: Season Generated');
        return res.redirect('/');
      });
  };

  this.simulateSeason = function(req, res, next) {

  };

  this.handleNewGame = function(req, res, next) {
    // "use strict";

  };

  this.displayStandings = function(req, res, next) {
    // "use strict";

    res.render('standings', {section: 1});
  };

  this.displayRoster = function(req, res, next) {
    // "use strict";

    res.render('roster', {section: 2});
  };
}

module.exports = ContentHandler;
