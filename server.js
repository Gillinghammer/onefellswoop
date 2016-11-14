// server.js

// base setup
// ===============

// call the packages we need
var express     = require('express');
var app         = express(); // define our app using express
var bodyParser  = require('body-parser');

// configure app to user bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  // set our port

// ROUTES FOR API
// TODO: separate into own file later
// =================
var router = express.Router();  // get an instance of the express router

// test route teo make sure it is working 
// accessed at GET http://localhost:8080/api
router.get('/', function(req, res) {
  res.json({  message: 'hooray! welcome to our api!'  });
});

// more routes for our API will happen here

// Register our routes
// all our routes will be prefixed with /api
app.use('/api', router);

// Start the server
// =================
app.listen(port);
console.log('Magic happens on port ' + port );