// server.js
var express     = require('express');
var mongoose    = require('mongoose');
var router      = require('./routes');
var morgan      = require('morgan');

// connect to db
mongoose.connect('mongodb://localhost:27017/onefellswoop')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('db connected!')
});

// define app
var app         = express(); 
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
app.use(morgan('dev'));

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