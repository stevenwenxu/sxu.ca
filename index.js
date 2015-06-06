var express = require("express");
var app     = express();

var http = require('http');

app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/pictures', express.static(__dirname + '/pictures'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/files', express.static(__dirname + '/files'))
app.use('/blog', express.static(__dirname + '/blog/_site'));

app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res) {
   res.sendFile('index.html', { root: __dirname });
});

app.listen(app.get('port'), function() {
   console.log('Listening on ', app.get('port'));
});

setTimeout(function() {
   http.get('http://www.sxu.ca');
}, 300000);

