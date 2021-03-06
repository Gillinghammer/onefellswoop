// server.js
var express     = require('express');
var mongoose    = require('mongoose');
var apiRouter   = require('./routes/apiRoutes');
var router      = require('./routes/routes');
// var morgan      = require('morgan');
var path        = require('path');

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
// app.use(morgan('dev'));

// Router middleware
apiRouter.use(function(req, res, next) {
  console.log('something is happening.');
  next();
});

// Router middleware
router.use(function(req, res, next) {
  console.log('something is happening.');
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use('/api', apiRouter)
app.use('/', router)

// Start the server
var port = process.env.PORT || 8888;  // set our port
app.listen(port);

console.log('Magic happens on port ' + port );