const Strategy = require('passport-local').Strategy;
const User = require('../models/Users-model')
const bcrypt = require('bcryptjs')




const loginStrategy = new Strategy({usernameField:'email'},function(email,password,done){
        //what will happen on signup
        User.findOne({email}).lean().exec((err,user)=>{
            if(err){
                return done("An error occurred while fetching the user",null);
            } 
            if(!user){
                return done("Email or password invalid!",null);
            }
           
            const isPasswordValid = bcrypt.compareSync(password,user.password)
            
            if(!isPasswordValid){
               return done("Email or Password is inValid!",null)
            }
        //    const userObj= user.toObject()
        //    delete userObj.password;
            return done(null,user)
           
        })
})


module.exports = loginStrategy;