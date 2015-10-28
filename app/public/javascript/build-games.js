/* Returns Array of Game Objects */
function generateGames(numGames) {
  var EVENT_BOUNDS = 6;
  var PERIODS = 3;
  var OPPONENTS = [
    {
      name: 'Boozers',
      icon: 'boozers'
    },
    {
      name: 'Dragons',
      icon: 'dragons'
    },
    {
      name: 'Five Holers',
      icon: 'five-holers'
    }
  ];

  var MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  var goalTypes = [
    'EVG',
    'PPG',
    'SHG',
    'ENG'
  ];

  var penaltyNames = [
    'Hooking',
    'Tripping',
    'Slashing',
    'Roughing'
  ];
  var i;
  var games = [];

  if (!numGames) {
    return [buildGame()];
  }
  for (i = 0; i < numGames; i++) {
    games.push(buildGame());
  }

  return games;

  /* Returns a Game Object */
  function buildGame() {
    var game = {};

    game.opp = chooseOpp();
    game.puckDrop = chooseDate();
    game.recap = {};
    game.recap.scoringSummary = buildSummary(PERIODS, EVENT_BOUNDS, buildScoringPeriod);
    game.recap.penaltySummary = buildSummary(PERIODS, EVENT_BOUNDS, buildPenaltyPeriod);

    return game;
  }

  /* Returns Object of a Summary */
  function buildSummary(numPeriods, eventBounds, build) {
    var i;
    var summary = {};
    summary.periods = [];

    for (i = 0; i < numPeriods; i++) {
      summary.periods.push(build(i + 1, randomNum(eventBounds)));
    }
    return summary;
  }

  /* Returns Object of a Period of Goals */
  function buildScoringPeriod(periodNum, numGoals) {
    var i;
    var period = {};
    period.goals = [];
    period.name = 'Period ' + periodNum;

    for (i = 0; i < numGoals; i++) {
      period.goals.push(buildGoal());
    }

    return period;
  }

  /* Returns Object of a Goal */
  function buildGoal() {
    var goal = {};
    goal.scorer = generatePlayer();
    if (randomWeight(75)) {
      goal.primary = generatePlayer();
      if (randomWeight(25)) {
        goal.secondary = generatePlayer();
      }
    }
    goal.type = goalTypes[randomNum(goalTypes.length)];
    goal.who = randomWeight(50) ? 'our' : 'opp';

    return goal;
  }

  function buildPenaltyPeriod(periodNum, numPenalties) {
    var i;
    var period = {};
    period.penalties = [];
    period.name = 'Period ' + periodNum;

    for (i = 0; i < numPenalties; i++) {
      period.penalties.push(buildPenalty());
    }

    return period;
  }

  function buildPenalty() {
    var penalty = {};
    penalty.player = generatePlayer();
    penalty.name = penaltyNames[randomNum(penaltyNames.length)];
    penalty.type = randomWeight(90) ? 'Minor' : 'Major';
    penalty.who = randomWeight(50) ? 'our' : 'opp';
    return penalty;
  }

  /* Returns String of a player number | Later a player object maybe */
  function generatePlayer() {
    return randomNum(99) + 1;
  }

  /* Returns an Opponent Object */
  function chooseOpp() {
    return OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
  }

  /* Returns a "date" as String */
  function chooseDate() {
    return MONTHS[Math.floor(Math.random() * 12)] + ' ' +
            (Math.floor(Math.random() + 29) + 1) +
            Math.floor(Math.random()) ? '8:45PM' : '10:00PM';
  }

  /* Range is 0 - endRange-1 */
  function randomNum(endRange) {
    return Math.floor(Math.random() * endRange);
  }

  function randomWeight(weight) {
    return (Math.floor(Math.random() * 100) + 1) <= weight;
  }
}
games = generateGames(10);
