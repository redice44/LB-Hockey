var TEAMS = [
  "Lucky Bastards",
  "Boozers",
  "Dragons",
  "Five Holers"
];

/* Returns an Array of Team Objects */
function generateTeams(numGames) {
  var i;
  var teams = [];

  for (i = 0; i < TEAMS.length; i++) {
    teams.push(generateTeam(TEAMS[i], numGames));
  }

  return teams;
}

/* Returns an Object of a Team */
function generateTeam(name, numGames) {
  var team = {};
  team.name = name;
  team.wins = Math.floor(Math.random() * (numGames + 1));
  team.losses  = Math.floor(Math.random() * (numGames - team.wins + 1));
  team.ties = numGames - team.wins - team.losses;
  team.points = team.wins * 2 + team.ties;

  return team;
}