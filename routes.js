// ROUTES FOR API
var express     = require('express');
var router      = express.Router();  // get an instance of the express Router
// Object Models
var Employer    = require('./models/employer');
var Candidate    = require('./models/candidate');

// Middleware
router.use(function(req, res, next) {
  console.log('api request...');
  next();
});

router.get('/', function(req, res) {
  res.json({  message: 'hooray! welcome to our api!'  });
});

// more routes for our API will happen here
router.route('/candidates')

  .post(function(req,res) {
    console.log("inside candidate POST!")
    var newCandidate = new Candidate();
    newCandidate.firstName = req.body.firstName;
    newCandidate.lastName = req.body.lastName;
    newCandidate.email = req.body.email;
    newCandidate.phone = req.body.phone;
    newCandidate.links = req.body.links;
    newCandidate.location = req.body.location;
    newCandidate.open = req.body.open;
    newCandidate.minimumSalary = req.body.minimumSalary;

    newCandidate.save(function(err) {
      console.log("saving candidate...")
      if(err) return console.log(err)
      console.log("saved!")
      res.json({message: "new candidate created!"});
    });
  });

router.route('/employers')

  .get(function(req, res) {
    Employer.find(function(err, employers) {
      if (err)
          res.send(err);

      res.json(employers);
    });
  })

  .post(function(req,res) {
    console.log('inside POST')
    var newEmployer = new Employer();  // creates a new instance of Employer
    newEmployer.name = req.body.name;
    newEmployer.website = req.body.website;
    newEmployer.primaryEmail = req.body.primaryEmail;
    newEmployer.location = req.body.location;
    newEmployer.targetCompanies = req.body.targetCompanies;
    newEmployer.targetEducations = req.body.targetEducations;
    console.log('post function' + newEmployer);
    newEmployer.save(function(err) {
      console.log('inside save')
      if (err) return console.log(err)
      console.log('saved!')
      res.json({message: "employer saved"})
    });
  });

router.route('/employers/:employer_id')

  .get(function(req,res){
    Employer.findById(req.params.employer_id, function(err, employer) {
      if (err) res.send(err)
      res.json(employer);
    })
  })

  .put(function(req, res) {

          Employer.findById(req.params.employer_id, function(err, employer) {
              if (err) res.send(err);
              employer.name = req.body.name;  // update the employers info
              employer.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'employer updated!' });
              });

          });
      })

  .delete(function(req, res) {
          Employer.remove({
              _id: req.params.employer_id
          }, function(err, employer) {
              if (err) res.send(err);
              res.json({ message: 'Successfully deleted' });
          });
      });


  module.exports = router;