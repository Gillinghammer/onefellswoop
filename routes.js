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
  .get(function(req,res) {
    Candidate.find(function(err, candidates) {
      if (err) res.send(err);
      res.json(candidates);
    });
  })
  .post(function(req,res) {
    console.log("inside candidate POST!")
    var newCandidate = new Candidate(req.body);
    newCandidate.save(function(err) {
      console.log("saving candidate...")
      if(err) return console.log(err)
      console.log("saved!")
      res.json({message: "new candidate created!"});
    });
  });

router.route('/candidates/:candidate_id')

  .get(function(req,res){
    Candidate.findById(req.params.candidate_id, function(err, candidate) {
      if (err) res.send(err)
      res.json(candidate);
    })
  })

  .put(function(req, res) {

          Candidate.findById(req.params.candidate_id, function(err, candidate) {
              if (err) res.send(err);
              candidate.firstName = req.body.firstName;
              candidate.lastName = req.body.lastName;
              candidate.email = req.body.email;
              candidate.phone = req.body.phone;
              candidate.links = req.body.links;
              candidate.location = req.body.location;
              candidate.open = req.body.open;
              candidate.minimumSalary = req.body.minimumSalary;
              candidate.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'candidate updated!' });
              });

          });
      })

  .delete(function(req, res) {
          Candidate.remove({
              _id: req.params.candidate_id
          }, function(err, candidate) {
              if (err) res.send(err);
              res.json({ message: 'Successfully deleted' });
          });
      });

router.route('/candidates/:candidate_id/education')
  .post(function(req,res) {
    Candidate.findById(req.params.candidate_id, function(err, candidate) {
      if (err) res.send(err)
      candidate.education.push({ schoolName: req.body.schoolName, degrees: req.body.degrees });
      candidate.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'education added for candidate!' });
      });
    })
  })

router.route('/candidates/:candidate_id/experience')
  .post(function(req,res) {
    Candidate.findById(req.params.candidate_id, function(err, candidate) {
      if (err) res.send(err)
      console.log(req.body)
      var experience = {};
      experience.jobTitle = req.body.jobTitle;
      experience.startDate = req.body.startDate;
      experience.finishDate = req.body.finishDate;
      experience.skills = req.body.skills.split(',').map(function(item) {
        return {skill: item.trim()}
      });
      console.log("exp object: " + experience)
      candidate.experience.push(experience)
      candidate.save(function(err) {
        console.log("saving experience...")
        if (err) res.send(err);
        console.log("saved!")
        res.json({ message: 'experience added for candidate!' });
      });
    })
  })

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