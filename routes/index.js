var express = require('express');
var spreadsheet = require('edit-google-spreadsheet');
var config = require('../app/config');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Steven\'s website' });
});

router.get('/blog', function(req, res, next) {
    res.redirect('//blog.sxu.ca');
});

router.post('/feedback', function(req, res) {
    if (req.body.text === '' || req.body.name === '') {
        res.json({success: false});
        return;
    }
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
            json[next] = { 1: req.body.name, 2: req.body.email, 3: req.body.message };
            sheet.add(json);
            sheet.send(function(err) { 
                if(err) {
                    throw err; 
                }
                res.json({success: true});
            });
        });
    });
});

module.exports = router;
