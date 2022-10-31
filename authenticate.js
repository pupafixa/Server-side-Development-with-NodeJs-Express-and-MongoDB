//This file is used to store the authenticng strategy
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

//Configuring the passport with the new LocalStrategy and export it
exports.local = passport.use(new LocalStrategy(User.authenticate()));
//This takes care of whatever is required for sessions in passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This fuction when supplied with the parameter (user) this will create the token
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
         {expiresIn: 3600});
};

//Configuring the Json web based strategy for the passport authentication in application
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
           if (err) {
            return done(err, false);
           }
           else if (user) {
            return done(null, user);
           }
           else {
            return done(null, false);
           }
        });
    }));

    exports.verifyUser = passport.authenticate('jwt', {session: false});