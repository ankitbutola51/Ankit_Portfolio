let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');

//conting to the Bcontact model created in businessContacts.js inside model folder

//let Bcontact = require('../models/businessContacts'); //we dont  need this now because it will be performed on logic side now

//helper function for guard purposes

function requireAuth(req, res, next)
{
    //check if te user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next(); 
}


let contactsController = require('../controllers/businessContacts');

/*Get route for businessContacts page for read operations */
router.get('/', requireAuth, contactsController.displayContactList);

//get route for the add page to add more details in the database
router.get('/add', requireAuth,  contactsController.displayAddPage);

//post route for the add page to add more details in the database
router.post('/add', requireAuth, contactsController.processAddPage);

//update page get route
router.get('/edit/:id', requireAuth, contactsController.displayEditPage);

//update page post route
router.post('/edit/:id', requireAuth, contactsController.processEditPage);

//delete page get route
router.get('/delete/:id',requireAuth, contactsController.processDeletePage);

module.exports = router;
