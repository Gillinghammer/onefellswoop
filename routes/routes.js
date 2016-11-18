// ROUTES FOR WEB REQUESTS
var express     = require('express');
var router      = express.Router(); 

// Middleware
router.use(function(req, res, next) {
  console.log('http request...');
  next();
});

// ROOT /
router.get('/', function(req, res) {
  res.render( 'index', { title: 'Pug Tempalte', message: 'Hello World!'  })
});

module.exports = router;