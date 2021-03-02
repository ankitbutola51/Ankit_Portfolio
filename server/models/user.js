//require  modules for user Model

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(

    {
        username:
        {
            type:String,
            default: '',
            trim: true,
            required: "username is required"
        },
        /*we dont require password field in our schema because passport-local-mongoose
         strategy is going to hash our password to create a very secure passwrod for us, 
         its not gonna save a clear text so we will never store it as clear text. */
         /* passsword:
        {
            type: String,
            default: '',
            trim: true,
            required: "password is required"
        }, */
        
        email:
        {
            type: String,
            default: '',
            trim: true,
            required: "email address is required"
        },
        /* display name, we are gonna use it on the dashboard after the login succesful for example: hey Ankit<username> */
        displayName:
        {
            type: String,
            default: '',
            trim: true,
            required: "email address is required"
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        created:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collections: "users"
    }
);

//configure options for users model

let options = ({missingPasswordError:'Wrong or misssing passsword'});

User.plugin(passportLocalMongoose, options); //its gonna send the missingPasswordError to passportLocalMongoose

module.exports.User = mongoose.model('User', User); //User model as well as the user object
