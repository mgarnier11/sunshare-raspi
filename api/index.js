var express = require('express');
var app = express();
var path = require('path');

var build = path.join(__dirname, '../build');

console.log('test');

//setting middleware
app.use(express.static(build)); //Serves resources from public folder

var server = app.listen(5000);

server.on('listening', () => {
  console.log('pataqtea');
});
