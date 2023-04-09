const ContactInbox= require('../models/Contact-messages-model')

createMessage =(req,res)=>{
    const body = req.body
    data={
        fName:body.fName,
        lName:body.lName,
        email:body.email,
        subject:body.subject,
        message:body.message
    }
    console.log(data)
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide your the message details'
        })
    }
    const message = new ContactInbox(data);

    if(!message){
        return res.status(400).json({
            success:false,
            error:err
        })
    }
    message
       .save()
       .then((message)=>{
           return res.status(201).json({
               success:true,
               message:'Message sent successfully',
               data:message
           })
       })
       .catch(error=>{
           return res.status(400).json({error,message:'Message not sent!'})
       })
}
deleteMessage = async(req,res)=>{
    await ContactInbox.findOneAndDelete({_id:req.params.id})
    .then((message)=>{
        console.log(message)
        console.log('deleted')
        return res.status(200).json({success:true,message:'The message was successfully deleted',data:message})
    })
   .catch(
       (err)=> {return res.status(400).json({success:false,error:err,message:'Message not deleted'})}
    ) 
}
getMessages = async(req,res)=>{
    await ContactInbox.find({})
    .then((messages)=>{
        if(!messages){
            return res.status(404).json({success:false,err:'No user was found'})
        }
        return res.status(200).json({success:true,data:messages})
     
   })
   .catch((err)=>{
    return res.status(404).json({success:false,message:'an error occurred'})
   })
}
getMessageByEmail= async(req,res)=>{
     const sender_Email =req.params.email

     console.log(sender_Email)
     const  sendersMessages = await InboxMessages.find({from:sender_Email})
    if(sendersMessages.length === 0){
        return res.status(404).json({success:false,err:`No message from the ${sender_name} was found`})
    }else if(sendersMessages !== 0){
        return res.status(200).json({success:true,message:'user(s) messages were found', data:sendersMessages})
    }
    if(err){
        return res.status(400).json({success:false,error:err})
     }
}

 getMessageById= async(req,res)=>{
    const user_id = req.params.id
    const messageFound = await InboxMessages.find({_id:user_id})
     if(messageFound.length === 0){
         console.log('no user found matches')
         return res.status(404).json({success:false,err:'No message matched the id'})
     }else if(messageFound !== 0){
        return res.status(200).json({success:true,message:'user was found',data:messageFound})
     }
    if(err){
        return res.status(400).json({success:false,err,message:'an error occurred'})
    }
  
 }


module.exports ={
getMessages,
getMessageByEmail,
getMessageById,
createMessage,
deleteMessage,
}
