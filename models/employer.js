var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployerSchema   = new Schema({
      name: String
    },{ 
      collection: 'employers' 
    });

module.exports = mongoose.model('Employer', EmployerSchema);