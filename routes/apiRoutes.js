// ROUTES FOR API
var express     = require('express');
var router      = express.Router();  // get an instance of the express Router
// Object Models
var Employer    = require('.././models/employer');
var Candidate    = require('.././models/candidate');

// Middleware
router.use(function(req, res, next) {
  console.log('api request...');
  next();
});

// ROOT api/
router.get('/', function(req, res) {
  res.json({  message: 'hooray! welcome to our api!'  });
});


// CANDIDATE ROUTES //

router.route('/candidates')

  // GET api/candidates
  .get(function(req,res) {
    Candidate.find(function(err, candidates) {
      if (err) res.send(err);
      res.json(candidates);
    });
  })

  // POST api/candidates
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
  
  // GET api/candidates/:candidate_id
  .get(function(req,res){
    Candidate.findById(req.params.candidate_id, function(err, candidate) {
      if (err) res.send(err)
      res.json(candidate);
    })
  })

  // PUT api/canidates/:candidate_id
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

  // DELETE api/candidates/:candidate_id
  .delete(function(req, res) {
    Candidate.remove({
      _id: req.params.candidate_id
  }, function(err, candidate) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

router.route('/candidates/:candidate_id/education')
  
  // POST api/candidates/:candidate_id/education
  .post(function(req,res) {
    Candidate.findById(req.params.candidate_id, function(err, candidate) {
      if (err) res.send(err)
      var education = {};
      education.schoolName = req.body.schoolName;
      education.degrees = req.body.degrees.split(",").map(function(item) {
        return {degree: item.trim()}
      });
      candidate.education.push(education);
      candidate.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'education added for candidate!' });
      });
    })
  })

router.route('/candidates/:candidate_id/experience')

  // POST api/candidates/:candidate_id/experience
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

// EMPLOYER ROUTES //

router.route('/employers')
 
 // GET api/employers 
.get(function(req, res) {
    Employer.find(function(err, employers) {
      if (err) res.send(err);
      res.json(employers);
    });
  })
  // POST api/employers
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
  
  // GET api/employers/:employer_id
  .get(function(req,res){
    Employer.findById(req.params.employer_id, function(err, employer) {
      console.log("fetching employer with id: ", req.params.employer_id)
      if (err) res.send(err)
      res.json(employer);
    })
  })
  
  // PUT api/employers/:employer_id
  .put(function(req, res) {
          console.log("params", req.params)
          Employer.findById(req.params.employer_id, function(err, employer) {
              if (err) res.send(err);
              console.log( "employer" , employer )
              employer.name = req.body.name;
              employer.location = req.body.location;
              employer.website = req.body.website;
              employer.primaryEmail = req.body.primaryEmail;
              employer.targetEducations = req.body.targetEducations;
              employer.targetCompanies = req.body.targetCompanies;
              employer.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'employer updated!' });
              });

          });
      })

  // DELETE api/employers/:employer_id
  .delete(function(req, res) {
          Employer.remove({
              _id: req.params.employer_id
          }, function(err, employer) {
              if (err) res.send(err);
              res.json({ message: 'Successfully deleted' });
          });
      });

router.route('/employers/:employer_id/companies')
  
  // POST api/employers/:employer_id/companies
  .post(function(req,res) {
    Employer.findById(req.params.employer_id, function(err, employer) {
      if (err) res.send(err)
      console.log(req.body)
      var companies = {};
      companies.targetCompanies = req.body.targetCompanies.split(',').map(function(item) {
        return {  companyName: item.trim()  }
      });
      employer.targetCompanies = companies.targetCompanies;
      employer.save(function(err) {
        console.log("saving companies to target...")
        if (err) res.send(err);
        console.log("saved!")
        res.json({ message: 'companies added to employer!' });
      });
    })
  })

  router.route('/employers/:employer_id/educations')

    // POST api/employers/:employer_id/educations
    .post(function(req,res) {
      Employer.findById(req.params.employer_id, function(err, employer) {
        if (err) res.send(err)
        var schools = {};
        schools.targetEducations = req.body.targetEducations.split(',').map(function(item) {
          return {  schoolName: item.trim()  }
        });
        employer.targetEducations = schools.targetEducations;
        employer.save(function(err) {
          console.log("saving schools to target...")
          if (err) res.send(err);
          console.log("saved!")
          res.json({ message: 'schools added to employer!' });
        });
      })
    })

  router.route('/employers/new')
    .get(function(req,res) {
      res.render(
        'index',
        { title: 'Puggy', message: 'Bitch!'  })
    })

  module.exports = router;