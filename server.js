var http = require('http');
var express = require('express');
var port = process.env.PORT || 5050;
var app = express();
var server = http.Server(app);

app.use(express.static(__dirname + '/app'));

server.listen(port, function (){
    console.log('Closet Site running on port:', port);
});
