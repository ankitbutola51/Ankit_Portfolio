var express = require('express');
var router = express.Router();
let contactFName = "";
let contactLname = "";
let contactEmail ="";
let message ="";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET About Me*/
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' });
});

//submit message
router.get('/message', function(req, res, next) {
  res.render('index', { title: 'Message',
  contactFName: contactFName, 
  contactLname: contactLname,
   contactEmail: contactEmail,
    message: message  });
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

  console.log("information saved. We will contact you soon.",req.body);

  contactFName = req.body.name;
  contactLname = req.body.Lname;
  contactEmail = req.body.email;
  message = req.body.message;

   //res.render('index', { details: req.body});
  
   res.redirect('/message');
  
  
});

module.exports = router;