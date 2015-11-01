var TeamsDOA = require('./../models/teams').TeamsDOA;
var GamesDOA = require('./../models/games').GamesDOA;
var SeasonGenerator = require('./../generators/season').SeasonGEN;

function ContentHandler(db) {
  // "use strict";

  var DOA = {};
  DOA.teams = new TeamsDOA(db);
  DOA.games = new GamesDOA(db);
  var seasonGenerator = new SeasonGenerator();

  this.displaySchedule = function(req, res, next) {
    // "use strict";

    // get schedule
    DOA.games.getSchedule(function(err, games) {
      res.render('schedule', {
        games: games,
        section: 0
      });
    });
  };

  this.generateSeason = function(req, res, next) {
    // "use strict";

    var schedule;
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

    DOA.games.addSeason(seasonGenerator.generate(name, start, end, gamesPlayed, teams),
      function(err, games) {
        if (err) {
          console.log(err);
          throw err;
        }

        console.log('Season Generated');
        res.redirect('/');
      });
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
