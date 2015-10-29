$(document).ready(function() {
  $('paper-icon-button.goal').on('click', function(e) {
    var btn = $(e.currentTarget);
    var game = btn.parent().parent().parent();
    var summary = game.children('paper-material.goal');
    var goals = game.children('.goals');

    btn.attr('icon') === 'expand-more' ?
        btn.attr('icon', 'expand-less') :
        btn.attr('icon', 'expand-more');

    if(summary.attr('elevation') == 0) {
        goals.slideToggle();
        summary.attr('elevation', 3);
    } else {
        goals.slideToggle(400, function() {
            summary.attr('elevation', 0);
        });
    }
  });
});
