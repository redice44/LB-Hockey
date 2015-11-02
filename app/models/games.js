function GamesDOA(db) {
  var games = db.collection('games');

  function findGames(query, projection, sort, callback) {
    games.find(query, projection).sort(sort).toArray(function(err, scheduleGames) {
      if (err) {
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

  this.addGame = function(season, home, away, date, callback) {
    var gameEntry = {
      'season': season,
      'matchup': [home, away],
      'date': date
    };

    games.insertOne(gameEntry, function(err, result) {
      if (err) {
        return callback(err, null);
      }

      console.log('Inserted new game');
      console.log(result.ops);
      return callback(null, result.ops[0]);
    });
  };

  this.addSeason = function(season, callback) {
    games.insertMany(season, function(err, result) {
      if (err) {
        return callback(err, null);
      }

      console.log('Games DOA: Inserted Season');
      return callback(null, result.ops);
    });
  };
}

module.exports.GamesDOA = GamesDOA;
