let express = require('express');
let router = express.Router();
let contactFName = "";
let contactLname = "";
let contactEmail ="";
let message ="";

let mongoose = require('mongoose');
let passport = require('passport');

//create the user model instance
let userModel = require('../models/user');
let User = userModel.User; //aliasing 

/* controller GET home page. */
module.exports.displayHomePage = (req, res, next) => {

    res.render('index', {title: '/'});
}
module.exports.displayHomePage2 = (req, res, next) => {

    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ""});
}

/* GET About Me*/
module.exports.displayAboutPage = (req, res, next) => {

    res.render('index', { title: 'About', username: req.user ? req.user.username : "" });
}

/*submit message*/
module.exports.displayMessage = (req, res, next) => {

  res.render('index', { title: 'Message', username: req.user ? req.user.username : "",
  contactFName: contactFName, 
  contactLname: contactLname,
   contactEmail: contactEmail,
    message: message  });
}

/* GET Projects page */
module.exports.displayProjectsPage = (req, res, next) => {

    res.render('index', { title: 'Projects', username: req.user ? req.user.username : "" });
}

/* GET services page   */
module.exports.displayServicesPage = (req, res, next) => {

    res.render('index', { title: 'Services', username: req.user ? req.user.username : "" });
}

/* GET Contact Me*/
module.exports.displayContactPage = (req, res, next) => {

    res.render('index', { title: 'Contact', username: req.user ? req.user.username : "" });
}
/* POST Contact Me*/
module.exports.processContactPage = function(req, res, next) {

    console.log("information saved. We will contact you soon.",req.body);
  
    contactFName = req.body.name;
    contactLname = req.body.Lname;
    contactEmail = req.body.email;
    message = req.body.message;
  
     //res.render('index', { details: req.body});
    
     res.redirect('/message');
      
  }

/* GET Login Page*/
module.exports.displayLoginPage = (req, res, next) => {
  //check if user is already login

  if(!req.user){
    res.render('auth/login', { 
        title: 'Login',
        messages: req.flash('loginMessage'),
        username: req.user ? req.user.username : ''
     })
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    
    passport.authenticate('local',
    (err, user, info) => {
        //server error
        if(err)
        {
            return next(err);
        }
        //login error
        if(!user)
        {
            req.flash('loginMessage','Authentication error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server serror
            if(err)
            {
                return next(err);
            }
            return res.redirect('/businessContactList');
        });
    }) (req, res, next);
}

/* router for displaying the register page*/
module.exports.displayRegisterPage = (req, res, next) => {
   if(!req.user){
       res.render('auth/register',
       {
           title: 'Register',
           messages: req.flash('registerMessage'),
           displayName: req.user ? req.user.displayName: " "
       }); 
   }
   else
   {
       return res.redirect('/');
   }
}

/* router for processing the register page*/
module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.password,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting new User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exist!'
                );
                console.log('User Already Exists!');
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: " "
            }); 
        }
        else
        { 
            //if no error exists, the registeration is successful
            //redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/businessContactList');
            }); 


        }
    });

}


module.exports.perfromLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}