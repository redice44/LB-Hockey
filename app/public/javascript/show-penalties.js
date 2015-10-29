$(document).ready(function() {
  $('paper-icon-button.penalty').on('click', function(e) {
    var btn = $(e.currentTarget);
    var game = btn.parent().parent().parent();
    var summary = game.children('paper-material.penalty');
    var penalties = game.children('.penalties');

    btn.attr('icon') === 'expand-more' ?
        btn.attr('icon', 'expand-less') :
        btn.attr('icon', 'expand-more');

    if(summary.attr('elevation') == 0) {
        penalties.slideToggle();
        summary.attr('elevation', 3);
    } else {
        penalties.slideToggle(400, function() {
            summary.attr('elevation', 0);
        });
    }
  });
});
