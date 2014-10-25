$(document).ready(function() {
   // resize jumbotron
   $('.jumbotron').height($(window).height());
   // smooth scrolling
   var $root = $('html, body');
   $('nav ul:not(.navbar-right) a, .navbar-brand').click(function() {
      event.preventDefault();
      $root.animate({
         scrollTop: $(this.hash).offset().top
      }, 600);
   });
   // detect screen size and adjust css
   layout();

});

$(window).resize(layout);

$(window).scroll(function() {
   var navHeight = $('nav').height();
   var pos = $(window).scrollTop() + navHeight;
   $('nav').find('.active').removeClass('active');

   if($(window).scrollTop() + $(window).height() >= $(document).height()) {
      $('#main-nav > ul:nth-child(1) > li:nth-child(5) > a').parent().addClass('active');
   } else if(pos >= $('#interests').position().top) {
      $('#main-nav > ul:nth-child(1) > li:nth-child(4) > a').parent().addClass('active');
   } else if(pos >= $('#abilities').position().top) {
      $('#main-nav > ul:nth-child(1) > li:nth-child(3) > a').parent().addClass('active');
   } else if(pos >= $('#experiences').position().top) {
      $('#main-nav > ul:nth-child(1) > li:nth-child(2) > a').parent().addClass('active');
   } else if(pos >= $('#profile').position().top) {
      $('#main-nav > ul:nth-child(1) > li:nth-child(1) > a').parent().addClass('active');
   }
})

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

function display(selector) {
   var target = $(selector);
   target.fadeIn('fast');
   setTimeout(function() {
      target.fadeOut('slow');
   }, 1500);
}
