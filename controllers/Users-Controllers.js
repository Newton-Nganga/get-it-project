const UserLogins = require('../models/Users-model.js')
const passport =require('../Passport/strategies')



//passport.authenticate('local-Register',()=>{}
CreateUserLogin = (req,res,next)=>{
    passport.authenticate('local-Register',function(err,user,info){
        if(err){
            return res.status(400).json({
                message:"An error occurred",
                err:err || 'Oops something went wrong'
            });
        }
        //persistent login
      
         req.logIn(user,function(error){
            if(err){
                return res.status(400).json({
                    message:"An error occurred",
                    err:err || 'Oops something went wrong'
                });
            }
         const email=user.email
          const id=user._id
            //remove password field
            return  res.status(200).json({message:"User account created successfully",data:{email,id}})
         })

        // return res.status(200).json({
        //     message:"User Created",user,info
        // });
    })(req,res,next);
}
LogoutUser=async(req,res)=>{
   
    req.logout({email:req.params.email},(err,user)=>{
        if(!err){
            res.json({message:"successfully logged out",isAuthenticated:false}) 
        }
       
        res.json({message:"could not log out",isAuthenticated:null})
    })
    req.session =null;
    res.json({message:"successfully logged out",isAuthenticated:false})
    
}
CompareUserLogin=(req,res,next)=>{
    passport.authenticate('local-Login',function(err,user,info){
        if(err){
            return res.status(400).json({
                message:err || 'Oops something went wrong!'
            });
        }
        req.logIn(user,function(error){
            if(err){
                return res.status(400).json({
                    message:err || 'Oops something went wrong'
                });
            }
          const isAuthenticated = true;
          const email =user.email
          const id = user._id
           return  res.status(200).json({message:"Successfully login",data:{email,id,isAuthenticated}})
         })
       
    //     res.status(200).json({
    //         message:"User Authenticated",user,info
    //     });
    })(req,res,next);
}

GoogleAuthenticate=passport.authenticate('google-authenticate',{ scope: ["profile","email"] })
    ,function(req,res,next){
    // res.header("Access-Control-Allow-Origin",'http://localhost:3000' );
    next();
}

FBAuthenticate=passport.authenticate('fb-authenticate')
,function(req,res,next){
// res.header("Access-Control-Allow-Origin",'http://localhost:3000' );
next();
}
updateUserLogin = async(req,res)=>{
    const body = req.body
    console.log(body)
    const user_id= req.params.userId
    console.log(user_id)
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide the Login details to update'
        })
    }
    await UserLogins.findOne({_id:user_id})
    .then(user=>{
        if(body.email === user.email){
            console.log('The email matches the one saved')
            return res.status(406).json({
                success:false,
                id:user._id,
                message:'Unacceptable!,email should be different'
            })
        }
        else if(body.password === user.password){

            console.log('The password matches the one saved')
            return res.status(406).json({
                success:false,
                id:user._id,
                message:'Unacceptable!,password should be different'
            })
        }
        else if((body.email !== user.email)  || (body.password !== user.password)){
            if(!body.email){
                user.password = body.password
            }
            if(!body.password){
            user.email = body.email
            }
        
        user.save().then(()=>{
            console.log(`new user details are now updated`)
            return res.status(200).json({
                success:true,
                id:user._id,
                message:'Your logins were updated successfully!'
            })
        }).catch(err=>console.log(err,`There was an error trying to update into the collection : 
                                   check the fields and validation`))
    }})
    
    .catch((err=>{
        return res.status(404).json({
            err,message:`This login details can't be found !`
        })
    }))

}

deleteUserLogin = async(req,res)=>{
    const id = req.params.userId
    console.log(id)
    await UserLogins.findByIdAndDelete({_id:id})
        
    .then((user)=>{
        const email =user.email
        const id = user._id
         return res.status(200).json({success:true,message:'This user was successfully deleted',data:{email,id}})

    })
    .catch(
        (err)=> {return res.status(400).json({success:false,error:err})}
    ) 
}


//get all the user logins
getAllUsersLogins = async(req,res)=>{
     await UserLogins.find({})
     .then((user=>{
        if(!user){
            return res.status(404).json({success:false,err:'No user was found'})
        }
        const email =user.email
        const id = user._id
        return res.status(200).json({success:true,data:{email,id}})
     })).catch(err=>{
        return res.status(400).json({success:false,error:err})
     })

}


getUserLoginsById = async(req,res)=>{
    const users_id = req.params.userId
    
    console.log(users_id)
    await UserLogins.find({_id:users_id})
    .then(
        (user)=>{
            if(!user){
                console.log('no user found matches')
                return res.status(404).json({success:false,err:'No user matched the id'})
            }else if(user){
                //delete the password from user b4 sending it
                const email =user.email
                const id = user._id
                return res.status(200).json({message:"An account was found",data:{email,id}})
            }
        }
    ).catch((err)=>{
    console.log(err)
    return res.status(400).json({success:false,err,message:'an error occurred'})
  })

}


getUserLoginsByEmail = async(req,res)=>{
    const user_Email = req.params.userEmail

    console.log(user_Email)

     const user = await UserLogins.find({email:user_Email})
     if(user.length == 0){
        return res.status(404).json({success:false,err:'No user was found'})
     }else if(user){
        const email =user.email
        const id = user._id
        return res.status(200).json({success:true,message:'user(s) were found', data:{email,id}})  
     }
     if(err){
        return res.status(400).json({success:false,error:err})
     }
 }


module.exports={
    GoogleAuthenticate,
    FBAuthenticate,
    LogoutUser,
    CompareUserLogin,
    CreateUserLogin,
    updateUserLogin,
    deleteUserLogin,
    getAllUsersLogins,
    getUserLoginsByEmail,
    getUserLoginsById
}