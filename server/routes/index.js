//first step to start web project is to make a connection with local server
var express = require('express');
var router = express.Router();


let indexController = module.require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage2);

/* GET About Me*/
router.get('/about', indexController.displayAboutPage); 

//submit message
router.get('/message', indexController.displayMessage); 


/* GET Projects page */
router.get('/projects', indexController.displayProjectsPage); 


/* GET services page   */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Me*/
router.get('/contact',  indexController.displayContactPage);

/* POST contact Page*/
router.post('/contact', indexController.processContactPage);

/* router for displaying the login page*/
router.get('/login', indexController.displayLoginPage);

/* router for displaying the register page*/
router.get('/register', indexController.displayRegisterPage);

/* router for processing the register page*/
router.post('/register', indexController.processRegisterPage);

/* router for processing the login page*/
router.post('/login', indexController.processLoginPage);


/* router for processing the login page*/
router.get('/logout', indexController.perfromLogout);

module.exports = router;