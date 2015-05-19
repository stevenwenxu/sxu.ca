var express = require("express");
var app     = express();
app.use(express.static(__dirname));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
   res.sendFile('index.html');
});

app.get('/blog', function(req, res) {
   res.send('Migrating...');
});

app.listen(3000);
console.log('Running at port 3000');

