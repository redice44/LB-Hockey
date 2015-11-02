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

    var team = 'Lucky Bastards';

    console.log('Content: Displaying Schedule');

    DOA.games.getSchedule(team, function(err, scheduledGames) {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log('Content callback: Displaying Schedule: ' +
        scheduledGames.length + ' Games');
      // console.log('Schedule', scheduledGames);
      return res.render('schedule', {
        games: scheduledGames,
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
