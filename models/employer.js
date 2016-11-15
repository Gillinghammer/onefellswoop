var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Companies = new Schema({
    companyName: String
});

var Schools = new Schema({
    schoolName: String
});

var EmployerSchema   = new Schema({
      name: String,
      website: String,
      primaryEmail: String,
      location: String,
      targetCompanies: [Companies],
      targetEducations: [Schools]
    });

module.exports = mongoose.model('Employer', EmployerSchema);