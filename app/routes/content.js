var GamesDOA = require('./../models/games').GamesDOA;
var SeasonGenerator = require('./../generators/season').SeasonGEN;

function ContentHandler(db) {
  var DOA = {};
  DOA.games = new GamesDOA(db);
  var seasonGenerator = new SeasonGenerator();

  this.displaySchedule = function(req, res, next) {
    // "use strict";

    // Eventually pull from ... user session? Probably.
    var team = 'Lucky Bastards';

    DOA.games.getSchedule(team, function(err, scheduledGames) {
      if (err) {
        console.log(err);
        throw err;
      }

      return res.render('games', {
        games: scheduledGames,
        section: 0
      });
    });
  };

  this.displaySeason = function(req, res, next) {
    // Eventually pull from something
    var season = req.params.season.split('-').join(' ').toLowerCase();

    DOA.games.getSeason(season, function(err, seasonGames) {
      if (err) {
        console.log(err);
        throw err;
      }

      return res.render('games', {
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

    DOA.games.addSeason(seasonGenerator.generate(
      name, start, end, gamesPlayed, teams
      ), function(err, games) {
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

  this.displayAddGame = function(req, res, next) {
    return res.render('addgame');
  };

  this.handleNewGame = function(req, res, next) {
    var season = req.body.season;
    var home = req.body.home;
    var away = req.body.away;
    var year = req.body.year;
    var month = req.body.month;
    var day = req.body.day;
    var time = req.body.time.split(':');
    var hour = time[0];
    var minute = time[1];
    var date = new Date(year, month, day, hour, minute);
    var permalink = year + '-' + month + '-' + day + '-' + hour + '-' + minute;
    console.log('Date: ', date);

    DOA.games.addGame(season, home, away, date, permalink, function(err, game) {
      if (err) {
        console.log(err);
        throw err;
      }

      return res.redirect('/games/' + game.permalink);
    });
  };

  this.displayAllGames = function(req, res, next) {
    DOA.games.getAllGames(function(err, games) {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log('Displaying All Games');
      return res.render('games', {
        'games': games
      });
    });
  };

  this.displayGame = function(req, res, next) {
    var permalink = req.params.permalink;

    DOA.games.getGame(permalink, function(err, game) {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log('Displaying Game');
      return res.render('game', {
        'game': game[0]
      });
    });
  };

  this.deleteGame = function(req, res, next) {
    var permalink = req.params.permalink;

    DOA.games.deleteGame(permalink, function(err, result) {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log('Removed ' + result + ' games');
      return res.redirect('/');
    });
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
