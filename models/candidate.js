var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Experience  = new Schema({
    jobTitle: String, 
    startDate: Date, 
    finishDate: Date, 
    skills: [{ skill: String }]
});

var Education  = new Schema({
    schoolName: String, 
    degrees: [{ degree: String }]
});

var Links  = new Schema({
    name: String, 
    url: String
});

var CandidateSchema   = new Schema({
      firstName: String,
      lastName: String,
      email: String,
      location: String,
      phone: Number,
      open: Boolean,
      minimumSalary: Number,
      links: [Links],
      education: [Education],
      experience: [Experience]
    });

module.exports = mongoose.model('Candidate', CandidateSchema);