$(document).ready(function() {
  $('paper-icon-button').on('click', function(e) {
    console.log(e.currentTarget);
    var btn = $(e.currentTarget);
    (btn.attr('icon') === 'expand-more') ? btn.attr('icon', 'expand-less') : btn.attr('icon', 'expand-more');

    console.log(btn.parent().parent().parent());
    var game = btn.parent().parent().parent();
    var header = game.children('.header');
    console.log(header);
    var recap = game.children('.recap');
    console.log(recap);
    (header.attr('elevation') == 0) ? header.attr('elevation', 3) : header.attr('elevation', 0);
    recap.slideToggle();

  });
});
