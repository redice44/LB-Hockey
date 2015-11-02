var GameGEN = require('./game').GameGEN;

function SeasonGEN() {
  var gameGen = new GameGEN();

  function requiresMoreGames(schedule, numGames) {
    var i;
    for (i = 0; i < schedule.length; i++) {
      if (schedule[i] < numGames) {
        return true;
      }
    }

    return false;
  }

  function verifySeason(schedule, numGames) {
    var i;
    var fullScheduleCount = 0;

    for (i = 0; i < schedule.length; i++) {
      if (schedule[i] === numGames) {
        fullScheduleCount++;
      }
    }
    return fullScheduleCount !== schedule.length - 1;
  }

  this.generate = function(name, start, end, gamesPlayed, teams) {
    // Not handling odd number of teams for simulation purposes.
    if (teams.length % 2 !== 0) {
      return false;
    }

    console.log('Season: Generating Season');

    var season = {};
    var games = [];
    var gamesCount = [];
    var i;
    var homeIndex = 0;
    var awayIndex;

    // What?
    season.name = 'Test ' + name;
    season.start = start;
    season.end = end;

    for (i = 0; i < teams.length; i++) {
      gamesCount.push(0);
    }

    while (requiresMoreGames(gamesCount, gamesPlayed)) {
      while (gamesCount[homeIndex] >= gamesPlayed) {
        homeIndex = Math.floor(Math.random() * teams.length); // roll home team
      }

      do {
        awayIndex = Math.floor(Math.random() * teams.length); // roll away team
      }
      while (homeIndex === awayIndex || gamesCount[awayIndex] >= gamesPlayed);

      // console.log('Home', homeIndex);
      // console.log('Away', awayIndex);
      gamesCount[homeIndex]++;
      gamesCount[awayIndex]++;
      // Generate game object
      // console.log(gamesCount);

      games.push(gameGen.generateOne(teams[homeIndex], teams[awayIndex], start, end));

      if (!verifySeason(gamesCount, gamesPlayed)) {
        // console.log('Resetting Season');
        for (i = 0; i < teams.length; i++) {
          gamesCount[i] = 0;
        }
        games = [];
      }

    }
    return games;
  };
}

module.exports.SeasonGEN = SeasonGEN;
