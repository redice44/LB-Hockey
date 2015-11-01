function GamesDOA(db) {
  var games = db.collection('games');

  this.getSchedule = function(callback) {
    var query = {
    };

    var projection = {
    };

    var sort = {
      date: 1
    };

    games.find(query, projection).sort(sort).toArray(function(err, docs) {
      if (err) {
        return callback(err, null);
      }

      console.log('Getting ' + docs.length + ' games.');
      return callback(null, docs);
    });
  };

  this.addGame = function(season, home, away, date, callback) {
    var gameEntry = {
      'season': season,
      'matchup': [home, away],
      'date': date
    };

    games.insert(gameEntry, function(err, game) {
      if (err) {
        return callback(err, null);
      }

      console.log('Inserted new game');
      return callback(null, game);
    });
  };

  this.addSeason = function(season, callback) {
    games.insertMany(season, function(err, result) {
      if (err) {
        callback(err, null);
      }

      callback(null, result.ops);
    });
  };
}

module.exports.GamesDOA = GamesDOA;
