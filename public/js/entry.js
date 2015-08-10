require('bootstrap');
require('scrollreveal');
require('jquery-validation');

window.$ = $;
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

var handleSubmitFeedback = function() {
    var $form = $('form'),
        $name = $form.find('#name'),
        $email = $form.find('#email'),
        $message = $form.find('#message');

    $form.on('submit', function(ev) {
        ev.preventDefault();
        if (!($form.valid())) {
            return;
        }
        $.ajax({
            method: 'POST',
            url: '/feedback',
            data: {
                name: $name.val(),
                email: $email.val(),
                message: $message.val()
            },
            success: function(data) {
                if (data.success) {
                    alert('Thanks for your message!');
                }
            }
        });
    });
};

var initValidation = function() {
    var $form = $('.feedback-form').find('form');
    $form.validate({
        highlight: function(elem) {
            $(elem).parent().addClass('has-error');
        },
        unhighlight: function(elem) {
            $(elem).parent().removeClass('has-error');
        }
    });
};

var mobileToggleCollapse = function() {
    $('.nav a').on('click', function(){
        $(".navbar-toggle").click();
    });
}

$(document).ready(function() {
    initScrollReveal();
    initSmoothScrolling();
    mobileToggleCollapse();
    initGATracking();
    initValidation();
    handleSubmitFeedback();
});