const ProfileAds = require('../models/ProfileAds-model');


createAd =async(req,res)=>{
    const body = req.body
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
        whatsapp:body.whatsapp,
        bio:body.bio
    }
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide your credentials'
        })
    }
    await ProfileAds.findOne({email:body.email})
    .then((Ad)=>{
        if(Ad){
            return res.status(400).json({message:"There is a user with that email"})
        }
    const accountAd = new ProfileAds(data)
    if(!accountAd){
        return res.status(400).json({
            success:false,
            error:err
        })
    }
    accountAd.save()
        .then(accountAd=>{
               return res.status(201).json({success:true,message:'User Ad Created successfully',data:accountAd})})
        .catch(error=>{
               return res.status(400).json({success:false,error,message:'The user Ad not created !'})
           })
    }
 
    ).catch(err=>{
        return res.status(400).json({err:err,message:"An error was caught"})
    })
  
}


updateAd = (req,res)=>{
    const body = req.body
    
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide the ad details to update'
        })
    }
    InboxMessages.findOne({_id:req.params.id},(err,ad)=>{
        if(err){
            return res.status(404).json({
                err,message:`This message cant be found !`
            })
        }
        ad.fName = body.fName
        ad.lName = body.lName
        ad.UserIcon = req.file.originalname
        ad.location = body.location
        ad.age =body.age
        ad.bio=body.bio
        ad.gender=body.gender
        ad.phone=body.phone
        ad.whatsapp=body.whatsapp
        ad.email=body.email

        ad.save().then(()=>{
            return res.status(200).json({
                success:true,
                id:account._id,
                message:'Your ad was updated successfully!'
            })
        })
    })
}
deleteAd = async(req,res)=>{
    const User_Id  = req.params.UserId
    await ProfileAds.findOneAndDelete({_id:User_Id})
    .then((ad)=>{
        return res.status(200).json({success:true,message:'This users ad(s) was successfully deleted',data:ad})
   })
   .catch(
       (err)=> {return res.status(400).json({success:false,error:err,message:"An error was caught when trying to delete"})}
   ) 
}
getAllAds = async(req,res)=>{

    await ProfileAds.find({})
    .then((account=>{
       if(!account){
           return res.status(404).json({success:false,err:'No user account was found'})
       }
       return res.status(200).json({success:true,data:account})
    })).catch(err=>{
       return res.status(400).json({success:false,error:err})
    })
}
getAdsByCategory= async(req,res)=>{
  const  Category_id = req.params.category
//   console.log(Category_id)
    await ProfileAds.find({category:Category_id})
    .then((account=>{
       if(!account){
           return res.status(404).json({success:false,err:'No user account was found'})
       }
       return res.status(200).json({success:true,data:account})
    })).catch(err=>{
       return res.status(400).json({success:false,error:err})
    })
}
getAdsByFName = async(req,res)=>{
    const userFName =req.params.fName
    console.log(userFName)
    const foundAds = await ProfileAds.find({fName:userFName})
    if(foundAds.length === 0){
        return res.status(404).json({success:false,err:'No user account was found'})
    }else if(foundAds){
       return res.status(200).json({success:true,message:'user(s) were found', data:foundAds})  
            }
   if(err){
       return res.status(400).json({success:false,error:err})
          }
}
getAdsByLName = async(req,res)=>{
    const userLName = req.params.lName
    console.log(userLName)
    const foundAds = await ProfileAds.find({lName:userLName})
    if(foundAds.length === 0){
        return res.status(404).json({success:false,err:'No user account was found'})
    }else if(foundAds){
       return res.status(200).json({success:true,message:'user(s) were found', data:foundAds})  
            }
   if(err){
       return res.status(400).json({success:false,error:err})
          }
}
getAdById = async(req,res)=>{
    const foundAd = await ProfileAds.find({_id:req.params.UserId})
    if(foundAd.length == 0){
        return res.status(404).json({success:false,err:'No user account was found'})
     }else if(foundAd){
        return res.status(200).json({success:true,message:'user(s) were found', data:foundAd})  
             }
    if(err){
        return res.status(400).json({success:false,error:err})
           }

}

getAdsByEmail = async(req,res)=>{
    const foundAds = await ProfileAds.find({email:req.params.email})
    if(foundAds.length == 0){
        return res.status(404).json({success:false,err:'No user account was found'})
     }else if(foundAds){
        return res.status(200).json({success:true,message:'user(s) were found', data:foundAds})  
             }
    if(err){
        return res.status(400).json({success:false,error:err})
           }

        }

module.exports={
    createAd,
    deleteAd,
    updateAd,
    getAllAds,
    getAdsByFName,
    getAdsByLName,
    getAdsByEmail,
    getAdsByCategory,
    getAdById
}







