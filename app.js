var express = require('express');
var session = require('express-session');
var parser = require('body-parser');
var morgan = require('morgan');
var router = require('./server/router/router.js');
var path = require('path');
var app = express();
var db = require('./db/models/cityModel.js');


//Route to static files
app.use(express.static(path.resolve(__dirname, './public')));

app.set('port', process.env.PORT || 1337);
app.listen(app.get('port'));

console.log('listening on PORT');

module.exports.app = app;
