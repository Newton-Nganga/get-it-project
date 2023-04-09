const UserAccounts= require('../models/UserAccounts-model.js')


createUserAccount = async(req,res)=>{
    console.log("The create route has now been hit")
    const body = req.body
    // console.log(body)
    data={
        image:req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename,
        fName:body.fName,
        lName:body.lName,
        location:body.location ,
        category:body.category,
        age: body.age,
        gender:body.gender,
        email:body.email,
        phone:body.phone,
        whatsapp:body.whatsapp
    }
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide your credentials'
        })
    }
     await UserAccounts.findOne({email:body.email})
    .then((user)=>{
        if(user){
            return res.status(400).json({message:"There is a user with that email"})
        }
        const account = new UserAccounts(data)
            if(!account){
                return res.status(400).json({
                    success:false,
                    error:err
                })
            }
            account.save()
                .then(account=>{
                       return res.status(201).json({success:true,message:'User account Created successfully',data:account})})
                .catch(error=>{
                       return res.status(400).json({success:false,error,message:'The user account was not created !'})
                   })
       
    }
 
    ).catch(err=>{
        return res.status(400).json({err:err,message:"An error was caught"})
    })
}

updateUserAccount = async(req,res)=>{
    const body = req.body

    const UserAccount = await UserAccounts.find({_id:req.params.id})
    const opts={new:true}
    const update={
        lName :UserAccount.lName,
        fName:UserAccount.fName,
        UserIcon:UserAccount.UserIcon,
        location :UserAccount.location,
        gender :UserAccount.gender,
        age :UserAccount.age,
        email :UserAccount.email,
        phone :UserAccount.phone,
        whatsapp :UserAccount.whatsapp}
        console.log('userAccounts found'+ UserAccount)
        if(!UserAccount){
            return res.status(404).json({err,success:false,message:'No account matches the userId'})
        }
        if (!body){
            return res.status(400).json({
                success:false,
                error:'You must provide your credentials'
            })
        }else if(body){
       if (body.lName !== '' || undefined){
        update.lName = body.lName 
       }else{update.lName = UserAccount.lName}
       if(body.fname !== '' || undefined){
        update.fName = body.fName
       }else{update.fName = UserAccount.fName}   
       if(body.UserIcon !== '' || undefined){
        update.UserIcon = body.UserIcon
       }else{update.UserIcon = UserAccount.UserIcon}
       if(body.location !== '' || undefined){
        update.location = body.location
       }else{update.location = UserAccount.location}
       if(body.age !== '' || undefined){
        update.age = body.age
       }else{update.age = UserAccount.age}
       if(body.gender !== '' || undefined){
        update.gender = body.gender
       }else{update.gender = UserAccount.gender}
       if(body.email !== '' || undefined){
        update.email = body.email
       }else{update.email = UserAccount.email}
       if(body.phone !== '' || undefined){
        update.phone = body.phone
       }else{update.phone = UserAccount.phone}
       if(body.whatsapp !== '' || undefined){
        update.whatsapp = body.whatsapp
       }else{update.whatsapp = UserAccount.whatsapp}
    
    console.log(update)
   
    UserAccounts.findOneAndUpdate({_id:req.params.id,update,opts})
    .then((UserAccount)=>{
     return res.status(200).json({success:true,message:'Account updated',data:UserAccount})
   })
    .catch((err)=>{
        return res.status(400).json({err,success:false,message:'an error occurred'})
    })
}

    // const opts ={new:true}
  
    // .then((account)=>{
    //     if((account.lName !== body.lName)||(account.whatsapp !== body.whatsapp)||(account.fName !== body.fName)
    //     ||(account.UserIcon !== body.UserIcon)||(account.gender !== body.gender)||(account.age !== body.age)||
    //     (account.phone !== body.phone)||(account.email !== email)){
        
    //     account.save().then(()=>{
    //         return res.status(200).json({
    //             success:true,
    //             id:account._id,
    //             message:'Your account was updated successfully!'
    //         })
    //     })
    //  }else{
    //     return res.status(406).json({err,success:false,message:"The details matches the ones saved!,could'nt update"})
    //  }
    // }).catch((err)=>{
    //     return res.status(404).json({
    //         err,message:`This user account can't be found !`
    //     })
    // })


}

deleteUserAccountById = async(req,res)=>{ 
    const User_id = req.params.UserId
    console.log(User_id)

     await UserAccounts.findByIdAndDelete({_id:User_id})
    .then((account)=>{
         return res.status(200).json({success:true,message:'This user account was successfully deleted',data:account})
    })
    .catch(
        (err)=> {return res.status(400).json({success:false,error:err,message:"An error was caught"})}
    ) 
}
deleteUserAccountByEmail = async(req,res)=>{ 
    const User_Email = req.params.UserEmail
    console.log(User_Email)

     await UserAccounts.deleteOne({email:User_Email})
    .then((account)=>{
         return res.status(200).json({success:true,message:'This users account(s) was successfully deleted',data:account})
    })
    .catch(
        (err)=> {return res.status(400).json({success:false,error:err,message:"An error was caught"})}
    ) 
}

getUserAccounts = async(req,res)=>{
      await UserAccounts.find({})
      .then((account=>{
         if(!account){
             return res.status(404).json({success:false,err:'No user account was found'})
         }
         return res.status(200).json({success:true,data:account})
      })).catch(err=>{
         return res.status(400).json({success:false,error:err})
      })
 
}

getUsersByfName = async(req,res)=>{
    const userFName =req.params.fName
    await UserAccounts.find({fName:userFName})
    
    .then(user=>{
        return res.status(200).json({success:true,data:user})
    })
    .catch((err)=>{
        return res.status(404).json({success:false,err,message:'No matching Account was found'})
    })
}
getUsersBylName = async(req,res)=>{
    const userLName = req.params.lName
    await UserAccounts.findOne({lName:userLName})
    .then(user=>{
        return res.status(200).json({success:true,message:'Users account was found',data:user})
    })
    .catch((err)=>{
        return res.status(404).json({success:false,err,message:'No matching Account was found'})
    })
}

getUserById = async(req,res)=>{

    const users_id = req.params.userId
    console.log(users_id)
    await UserAccounts.find({_id:users_id})
    .then(
        (account)=>{
            if(!account){
                console.log('no user found matches')
                return res.status(404).json({success:false,err:'No user matched the id'})
            }else if(account){
                return res.status(200).json({success:true,message:'user was found',data:account})
            }
        }
    ).catch((err)=>{
    console.log(err)
    return res.status(400).json({success:false,err,message:'an error occurred'})
  })
}
getUsersByEmail = async(req,res)=>{
     const user_Email = req.params.UserEmail
      const  account=await UserAccounts.find({email:user_Email})
     if(account.length == 0){
        return res.status(404).json({success:false,err:'No user account was found'})
     }else if(account){
        return res.status(200).json({success:true,message:'user(s) were found', data:account})  
             }
    if(err){
        return res.status(400).json({success:false,error:err})
           }

}

module.exports = {
   createUserAccount,
   updateUserAccount,
   deleteUserAccountByEmail,
   deleteUserAccountById,
   getUserAccounts,
   getUserById,
   getUsersByEmail,
   getUsersByfName,
   getUsersBylName
}











