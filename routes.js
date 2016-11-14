// ROUTES FOR API
var express     = require('express');
var router      = express.Router();  // get an instance of the express Router
// Object Models
var Employer    = require('./models/employer');

// Middleware
router.use(function(req, res, next) {
  console.log('api request...');
  next();
});

router.get('/', function(req, res) {
  res.json({  message: 'hooray! welcome to our api!'  });
});

// more routes for our API will happen here

router.route('/employers')

  .get(function(req, res) {
    console.log('inside GET')
    res.json({message: 'return list of employers'})
  })

  .post(function(req,res) {
    console.log('inside POST')
    var employer = new Employer();  // creates a new instance of Employer
    employer.name = req.body.name;  // sets employer name

    console.log('post function' + employer);
    employer.save(function(err) {
      console.log('inside save')
      if (err)
        console.log(err);
      res.send(err);
      res.json({  message: 'Employer Created!'});
    });
  });

  module.exports = router;