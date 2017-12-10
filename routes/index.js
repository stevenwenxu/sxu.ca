var express = require('express');
var router = express.Router();
var https = require('https');
var sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.sendgridApiKey);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Steven\'s website' });
});

router.get('/blog', function(req, res, next) {
    res.redirect('//blog.sxu.ca');
});

router.post('/feedback', function(req, res) {
    if (req.body.message === '' || req.body.name === '' || req.body.email === '') {
        res.json({
            success: false,
            message: 'All fields are required.'
        });
        return;
    }

    sgMail.send({
        to: 'steven@sxu.ca',
        from: req.body.email,
        subject: 'sxu.ca contact form',
        html: 'name: ' + req.body.name + '<br>message: ' + req.body.message
    }, (error, result) => {
        if (error) {
            res.json({
                success: false,
                message: error
            });
        } else {
            res.json({
                success: true,
                message: result
            });
        }
    });
});

module.exports = router;
