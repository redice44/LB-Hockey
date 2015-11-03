$(document).ready(function() {
  var goalCount = 0;

  $('#add-goal').on('click', function(e) {
    var prefix = 'goals[goal-';
    var keys = [
      'who',
      'period',
      'time',
      'type',
      'scorer',
      'primary',
      'secondary'
    ];
    var goal = $('#goal').clone();

    keys.forEach(function(key) {
      goal.find('.' + key).attr('name', prefix + goalCount + '][' + key + ']');
    });
    goal.attr('id', null);
    goal.addClass('goal');
    goal.prependTo('form.goals');
    goalCount++;
  });
});
