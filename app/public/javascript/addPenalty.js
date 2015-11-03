$(document).ready(function() {
  var pimCount = 0;

  $('#add-penalty').on('click', function(e) {
    var prefix = 'penalties[penalty-';
    var keys = [
      'who',
      'period',
      'time',
      'type',
      'name',
      'player'
    ];
    var penalty = $('#penalty').clone();

    keys.forEach(function(key) {
      penalty.find('.' + key).attr('name', prefix + pimCount + '][' + key + ']');
    });
    penalty.attr('id', null);
    penalty.addClass('penalty');
    penalty.prependTo('form.goals');
    pimCount++;
  });
});
