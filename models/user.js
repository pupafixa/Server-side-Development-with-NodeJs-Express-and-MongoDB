var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//This is the mongoose plugin in the application
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

//This will add support for username and hashed storage of the password using the hash and salt aswell as other methods
//on the user schema and model which are useful for passport authentication 
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);