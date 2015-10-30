function ContentHandler(db) {
  "use strict";

  this.displaySchedule = function(req, res, next) {
    "use strict";

    res.render('schedule', {section: 0});
  };

  this.displayStandings = function(req, res, next) {
    "use strict";

    res.render('standings', {section: 1});
  };

  this.displayRoster = function(req, res, next) {
    "use strict";

    res.render('roster', {section: 2});
  };
}

module.exports = ContentHandler;
