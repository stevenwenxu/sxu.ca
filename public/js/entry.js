require('bootstrap');
require('scrollreveal');

var initScrollReveal = function() {
    var config = {
        reset: false,
        move: '24px',
        vFactor: 0.4,
    };
    window.sr = new scrollReveal(config);
};

var initSmoothScrolling = function () {
    $('.navbar-right a, .navbar-brand').click(function(ev) {
        ev.preventDefault();
        $('body').animate({
            scrollTop: $(this.hash).offset().top
        }, 600);
    });
};

var sendGAClickForLabel = function(eventLabel, callback) {
    ga('send', {
        'hitType': 'event',
        'eventCategory': 'button',
        'eventAction': 'click',
        'eventLabel': eventLabel,
        'hitCallback': callback
    });
};

var initGATracking = function() {
    var $blogBtn = $('.btn-blog'),
        $resumeBtn = $('.btn-resume');

    $blogBtn.on('click', function(ev) {
        ev.preventDefault();
        sendGAClickForLabel('blog clicked', function() {
            location.href = '/blog/';
        });
    });
    $resumeBtn.on('click', function(ev) {
        ev.preventDefault();
        sendGAClickForLabel('resume clicked', function() {
            location.href = '/files/resume.pdf';
        });
    });
};

$(document).ready(function() {
    initScrollReveal();
    initSmoothScrolling();
    initGATracking();
});