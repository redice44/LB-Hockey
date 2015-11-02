function GameGEN() {
  function generateDate(startDate, endDate) {
    var duration; // duration of season in months.
    var start = {};
    var end = {};
    start.year = startDate.getFullYear();
    start.month = startDate.getMonth();
    end.year = endDate.getFullYear();
    end.month = endDate.getMonth();

    if (start.year === end.year) {
      duration = end.month - start.month;
    } else {
      duration = 12 - start.month + end.month;
    }

    return new Date(start.year, start.month +
      Math.floor(Math.random() * duration),
      Math.floor(Math.random() * 30));
  }

  this.generateOne = function(home, away, start, end) {
    var game = {};

    // console.log('Generating Game');

    game.matchup = [];
    game.matchup.push(home);
    game.matchup.push(away);
    game.date = generateDate(start, end);

    return game;
  };
};

module.exports.GameGEN = GameGEN;
