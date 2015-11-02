function GamesDOA(db) {
  var games = db.collection('games');

  function findGames(query, projection, sort, callback) {
    games.find(query, projection).sort(sort).toArray(function(err, scheduleGames) {
      if (err) {
        console.log('Error: Games DOA findGames()');
        return callback(err, null);
      }

      console.log('Games DOA: Getting ' + scheduleGames.length + ' games.');
      return callback(null, scheduleGames);
    });
  }

  this.getSchedule = function(team, callback) {
    var query = {};

    (team) ? query.matchup = team : '';

    var projection = {
    };

    var sort = {
      date: 1
    };

    console.log('Games DOA: Getting Schedule');
    return findGames(query, projection, sort, callback);
  };

  this.getSeason = function(season, callback) {
    var query = {
      season: season
    };

    var projection = {};

    var sort = {
      date: 1
    };

    console.log('Games DOA: Getting Season');
    return findGames(query, projection, sort, callback);
  };

  this.addGame = function(season, home, away, date, permalink, callback) {
    var gameEntry = {
      'matchup': [home, away],
      'date': date,
      'permalink': permalink
    };

    gameEntry.season = season.toLowerCase();

    games.insertOne(gameEntry, function(err, result) {
      if (err) {
        console.log('Error: Games DOA addGame()');
        return callback(err, null);
      }

      console.log('Games DOA: Inserted Game.');
      return callback(null, result.ops[0]);
    });
  };

  this.getGame = function(permalink, callback) {
    var query = {
      'permalink': permalink
    };

    var projection = {};
    var sort = {};

    console.log('Games DOA: Getting a Game');
    return findGames(query, projection, sort, callback);
  };

  this.deleteGame = function(permalink, callback) {
    var query = {
      'permalink': permalink
    };

    games.deleteOne(query, function(err, result) {
      if (err) {
        console.log('Error: Games DOA deleteGame()');
        return callback(err, null);
      }

      console.log('Games DOA: Removed Game.');
      return callback(null, result.deletedCount);
    });
  };

  this.addSeason = function(season, callback) {
    games.insertMany(season, function(err, result) {
      if (err) {
        console.log('Error: Games DOA addSeason()');
        return callback(err, null);
      }

      console.log('Games DOA: Inserted Season');
      return callback(null, result.ops);
    });
  };
}

module.exports.GamesDOA = GamesDOA;
