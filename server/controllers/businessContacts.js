let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//creating reference to the modal
let Bcontact = require('../models/businessContacts');

 /*Get route for businessContacts page for read operations */
 module.exports.displayContactList = (req, res, next) => {

    Bcontact.find((err, bcontactList) => {
        if (err) {
            return console.error(err);
        }
        else {
            bcontactList.sort(function(a, b){
                if(a.Name < b.Name) { return -1; }
                if(a.Name > b.Name) { return 1; }
                return 0;
            })

            res.render('businessContactList/businessContactList', { title: "Business Contacts", BcontactList: bcontactList, username: req.user ? req.user.username : "" });
            //console.log(bcontactList);
           
        }
    });
 }

 //get route for the add page to add more details in the database
 module.exports.displayAddPage = (req, res, next) => {

    res.render('businessContactList/add', { title: "Add Contacts" });

}

//post route for the add page to add more details in the database
module.exports.processAddPage =  (req, res, next) => {
    let newContact = Bcontact({
        "Name": req.body.Name,
        "Contact": req.body.Contact,
        "Email": req.body.Email
    });

    Bcontact.create(newContact, (err, contactInfo) => {

        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/businessContactList');

        }

    });
}

//update page get route
module.exports.displayEditPage =  (req, res, next) => {
    let id = req.params.id;
    Bcontact.findById(id, (err, contactToEdit) => {
        if (err){
            console.log(err);
            res.end(err);
        }
        else {
            res.render('businessContactList/edit', {title: 'Edit Business Contact', Bcontact: contactToEdit});

        }
    });
}

//update page post route
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedContact = Bcontact( {
        "_id": id,
        "Name": req.body.Name,
        "Contact": req.body.Contact,
        "Email": req.body.Email
    })

    Bcontact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/businessContactList');
        }
    });
}

//delete page get route
module.exports.processDeletePage = (req, res, next) => {
    let id = req.params.id;
    Bcontact.remove({_id: id}, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/businessContactList');
        }

    });
}