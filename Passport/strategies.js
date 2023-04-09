const passport = require('passport')
const User = require('../models/Users-model.js')


//serialize and deserialize the user

passport.serializeUser(function(user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(function(email, done) {
    User.findOne({email}).lean().exec((err,user)=>{
        done(err, user);
    });
      
  });


// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function(_id, done) {
//   User.findOne({_id}).lean().exec((err,user)=>{
//       done(err, user);
//   });
    
// });


//import all the strategies
const FacebookStrategy=require('./FacebookStrategy')
const GoogleStrategy = require('./GoogleStrategy')
// const FacebookStrategy =require('./FacebookStrategy')
const RegisterStrategy = require('./RegisterStrategy')
const LoginStrategy = require('./LoginStrategy')

passport.use('fb-authenticate',FacebookStrategy)
passport.use('google-authenticate',GoogleStrategy)
passport .use('local-Login',LoginStrategy)
passport .use('local-Register',RegisterStrategy)





module.exports =passport