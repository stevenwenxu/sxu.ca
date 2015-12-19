var express = require('express');
var spreadsheet = require('edit-google-spreadsheet');
var config = require('../app/config');
var router = express.Router();
var https = require('https');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Steven\'s website' });
});

router.get('/blog', function(req, res, next) {
    res.redirect('//blog.sxu.ca');
});

router.post('/feedback', function(req, res) {
    if (req.body.message === '' || req.body.name === '') {
        res.json({
            success: false,
            message: 'Name and message fields are required.'
        });
        return;
    } else if (req.body.recaptcha === '') {
        res.json({
            success: false,
            message: 'Recaptcha not solved.'
        });
        return;
    }

    var data = '',
        postData = 'secret=' + config.recaptcha.secret + '&response=' + req.body.recaptcha,
        options = {
            hostname: 'www.google.com',
            path: '/recaptcha/api/siteverify',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

    var httpsreq = https.request(options, function(httpsres) {
        httpsres.setEncoding('utf8');
        httpsres.on('data', function(chunk) {
            data += chunk;
        });
        httpsres.on('end', function() {
            var result = JSON.parse(data);
            if (result.success) {
                addToSpreadSheet(req.body.name, req.body.email, req.body.message, res);
            } else {
                httpsres.json({
                    success: false,
                    message: result["error-codes"]
                });
            }
        });
    });
    httpsreq.write(postData);
    httpsreq.end();
});

var addToSpreadSheet = function(name, email, msg, res) {
    console.log(name, email, msg);
    spreadsheet.load({
        spreadsheetId: config.spreadsheetId,
        worksheetId: config.worksheetId,
        oauth2: config.oauth2
    }, function sheetReady(err, sheet) {
        if(err) {
            throw err;
        }
        var next = -1;
        sheet.receive(function(err, rows, info) {
            if(err) {
                throw err;
            }
            next = info.nextRow;
            var json = {};
            json[next] = { 1: name, 2: email, 3: msg };
            sheet.add(json);
            sheet.send(function(err) { 
                if(err) {
                    throw err; 
                }
                res.json({
                    success: true,
                    message: ''
                });
            });
        });
    });
};

module.exports = router;
