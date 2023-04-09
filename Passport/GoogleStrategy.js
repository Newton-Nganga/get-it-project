const Strategy =require('passport-google-oauth20').Strategy;
require("dotenv").config();
// const findOrCreate= require('mongoose-findorcreate')
const User = require('../models/Users-model')
// User.plugin(findOrCreate);
// User.plugin(findOrCreate)


const googleStrategy = new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:`http://localhost:${process.env.PORT}/api/auth/google/callback`,
    PassReqToCallback:true,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},function (req,accessToken,refreshToken,profile,done){
    User.findOrCreate({googleId: profile.id, email: profile.emails[0].value},function(err,user){
        console.log(user)
        return done(err,user)
    })
})


module.exports = googleStrategy






