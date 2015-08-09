var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Steven\'s website' });
});

router.get('/blog', function(req, res, next) {
    res.redirect('http://steven-xu94.github.io/blog');
});

module.exports = router;
