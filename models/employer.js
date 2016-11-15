var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployerSchema   = new Schema({
      name: String,
      website: String,
      primaryEmail: String,
      location: String,
      targetCompanies: [{ companyName: String  }],
      targetEducations: [{  schoolName: String }]
    });

module.exports = mongoose.model('Employer', EmployerSchema);