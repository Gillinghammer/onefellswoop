// server.js
var express     = require('express');
var mongoose    = require('mongoose');
var router      = require('./routes');

// connect to db
var dbUser = 'admin'
var dbPassword = 'password'
mongoose.connect(`mongodb://#{dbUser}:#{dbPassword}@waffle.modulusmongo.net:27017/yg5aTari/`)

// define app
var app         = express(); 
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

// Router middleware
router.use(function(req, res, next) {
  console.log('something is happening.');
  next();
});

// test api
router.get('/', function(req, res) {
  res.json({  message: 'hooray! welcome to our api!'  });
});

app.use('/api', router)

// Start the server
var port = process.env.PORT || 8888;  // set our port
app.listen(port);

console.log('Magic happens on port ' + port );