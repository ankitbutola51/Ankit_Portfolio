let mongoose =  require('mongoose');

//creating a modal class

let businessContactModel = mongoose.Schema({

    Name: String,
    Contact: String,
    Email: String

},{
    collection: "bContacts"
});

module.exports = mongoose.model('Bcontact', businessContactModel)