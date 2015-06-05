var express = require("express");
var app     = express();

var http = require('http');

app.use(express.static(__dirname));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res) {
   res.sendFile('index.html');
});

app.get('/blog', function(req, res) {
   res.send('Migrating...');
});

app.listen(app.get('port'), function() {
   console.log('Listening on ', app.get('port'));
});

setTimeout(function() {
   http.get('http://www.sxu.ca');
}, 300000);

