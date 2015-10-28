$(document).ready(function() {
  $('paper-icon-button.recap').on('click', function(e) {
    var btn = $(e.currentTarget);
    var game = btn.parent().parent().parent();
    var header = game.children('.header');
    var recap = game.children('.recap');

    btn.attr('icon') === 'expand-more' ?
        btn.attr('icon', 'expand-less') :
        btn.attr('icon', 'expand-more');

    if(header.attr('elevation') == 0) {
        recap.slideToggle();
        header.attr('elevation', 3);
    } else {
        recap.slideToggle(400, function() {
            header.attr('elevation', 0);
        });
    }
  });
});
