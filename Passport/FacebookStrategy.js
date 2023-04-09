const Strategy =require('passport-facebook').Strategy;
require("dotenv").config();
const User = require('../models/Users-model')


const FBStrategy = new Strategy({
    clientID:process.env.FB_CLIENT_ID,
    clientSecret:process.env.FB_CLIENT_SECRET,
    callbackURL:`http://localhost:${process.env.PORT}/api/auth/facebook/callback`,
    PassReqToCallback:true,
    profileFields: ['id','email']
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},function (req,accessToken,refreshToken,profile,done){
    User.findOrCreate({email:profile.id,facebookId: profile.id},function(err,user){
        console.log(profile)
        return done(err,user)
    })
})


module.exports = FBStrategy