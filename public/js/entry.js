require('bootstrap');
require('scrollreveal');
require('jquery-validation');

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
        $message = $form.find('#message'),
        captcha = '';

    $form.on('submit', function(ev) {
        ev.preventDefault();
        captcha = grecaptcha.getResponse();
        if (!($form.valid())) {
            return;
        } else if (captcha.length === 0) {
            alert('Please verify that you are not a bot.');
            return;
        }
        $.ajax({
            method: 'POST',
            url: '/feedback',
            data: {
                name: $name.val(),
                email: $email.val(),
                message: $message.val(),
                recaptcha: captcha
            },
            success: function(data) {
                if (data.success) {
                    alert('Thanks for your message!');
                    grecaptcha.reset();
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
};

var initBlinkStar = function() {
    var $blinks = $('.glyphicon-star-blink');
    var addStar = function() {
        setTimeout(function() {
            $blinks.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            removeStar();
        }, 1000);
    };
    var removeStar = function() {
        setTimeout(function() {
            $blinks.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
            addStar();
        }, 1000);
    };
    addStar();
};

$(document).ready(function() {
    initScrollReveal();
    initSmoothScrolling();
    initBlinkStar();
    mobileToggleCollapse();
    initGATracking();
    initValidation();
    handleSubmitFeedback();
});