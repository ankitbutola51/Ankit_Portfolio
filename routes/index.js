var express = require('express');
var router = express.Router();
let contactName = "njkk";
let contactNumber = "";
let contactEmail ="";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET About Me*/
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' });
});


/* GET Projects page */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects' });
});

/* GET services page   */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

/* GET Contact Me*/
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});


router.post('/contact', function(req, res, next) {
  
  // contactName = req.body.name;
  // res.render('index', { title: 'Home'});
  res.redirect('/home');
  console.log(`information saved. We will contact you soon.${req.body.name}`);
});

module.exports = router;