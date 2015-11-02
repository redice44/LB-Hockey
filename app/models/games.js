function GamesDOA(db) {
  var games = db.collection('games');

  this.getSchedule = function(team, callback) {
    var query = {
      matchup: team
    };

    var projection = {
    };

    var sort = {
      date: 1
    };

    console.log('Games DOA: Getting Schedule');
    games.find(query, projection).sort(sort).toArray(function(err, docs) {
      if (err) {
        return callback(err, null);
      }

      console.log('Games DOA Callback: Getting ' + docs.length + ' games.');
      callback(null, docs);
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
        return callback(err, null);
      }

      console.log('Games DOA: Inserted Season');
      return callback(null, result.ops);
    });
  };
}

module.exports.GamesDOA = GamesDOA;
