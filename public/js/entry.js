require('bootstrap');
require('scrollreveal');

function onResize() {
   // resize jumbotron
   $('.jumbotron').height($(window).height());
}

$(document).ready(function() {
    var config = {
        easing: 'hustle',
        reset: false,
        // over: '1.3s',
        move: '24px',
        vFactor: 0.4,
    };
    window.sr = new scrollReveal(config);

   // smooth scrolling
   var $root = $('html, body');
   $('.navbar-right a, .navbar-brand').click(function(ev) {
      ev.preventDefault();
      $root.animate({
         scrollTop: $(this.hash).offset().top
      }, 600);
   });
   // detect screen size and adjust css
   onResize();

});

$(window).resize(onResize);

