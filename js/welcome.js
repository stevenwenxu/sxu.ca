$(document).ready(function() {
   $('.jumbotron').height($(window).height());
   var $root = $('html, body');
   $('nav a').click(function() {
      event.preventDefault();
      $root.animate({
         scrollTop: $(this.hash).offset().top
      }, 600);
   });
   layout();
});

$(window).resize(layout);

function layout() {
   if($(window).width() < 992) {
      $('.container').css('text-align', 'center');
      $('.hidden-small').css('display', 'none');
      $('#abilities .row').css('text-align', 'left').css('margin', 'auto 10%');
   } else {
      $('.container').css('text-align', '');
      $('.hidden-small').css('display', '');
      $('#abilities .row').css('text-align', '').css('margin', '');
   }
}
