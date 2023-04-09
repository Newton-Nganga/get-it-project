const Strategy=require('passport-local').Strategy;
const User = require('../models/Users-model')
const bcrypt=require('bcryptjs')

const salt = bcrypt.genSaltSync(10);


const RegisterStrategy = new Strategy({passReqToCallback:true,usernameField:'email'},
    function(req,email,password,done){
        //what will happen on signup
        User.findOne({email}).lean().exec((err,user)=>{
            if(err){
                return done(err,null);
            }
            if(user){
                return done(`This user already exists `,null);
            }
            const encryptedPassword = bcrypt.hashSync(password,salt)
            let newUser = new User({
             email,
             password:encryptedPassword
            });
            newUser.save((error,inserted)=>{
                if(err){
                    return done(error,null);
                }
                //delete password field in the inserted obj
                return done(null,inserted)
            })
        })
        // done(null,"user matches")
    }
)


module.exports = RegisterStrategy;