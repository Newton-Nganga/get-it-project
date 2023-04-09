const InboxMessages = require('../models/Inbox')


createMessage =(req,res)=>{
    const body = req.body
    data={
        to:body.to,
        from:body.from,
        title:body.title,
        content:body.content
    }
    console.log(data)
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide your the message details'
        })
    }
    const message = new InboxMessages(data);

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
updateMessage = async(req,res)=>{
    const body = req.body
     console.log(body)
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide the message details to update'
        })
    }
    await InboxMessages.find({_id:req.params.UserId})
    .then((message)=>{
    if((body.to !== message.to)  || (body.from !== message.from) || (body.title !== message.title) ||(body.content !== message.content)){
        message.from = body.from
        message.to = body.to
        message.title = body.title
        message.content = body.content
        message.save().then(()=>{
            return res.status(200).json({
                success:true,
                id:account._id,
                message:'Your message was updated successfully!'
            })
        }).catch(err=>console.log(err,`There was an error trying to update into the collection : 
        check the fields and validation`))
     }}).catch((err=>{
        return res.status(404).json({
            err,message:`This login details can't be found !`
        })
    }))
}
deleteMessage = async(req,res)=>{
    await InboxMessages.findOneAndDelete({_id:req.params.userId})
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
    await InboxMessages.find({})
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
getMessageBySender= async(req,res)=>{
     const sender_name =req.params.sender

     console.log(sender_name)
     const  sendersMessages = await InboxMessages.find({from:sender_name})
    if(sendersMessages.length === 0){
        return res.status(404).json({success:false,err:`No message from the ${sender_name} was found`})
    }else if(sendersMessages !== 0){
        return res.status(200).json({success:true,message:'user(s) messages were found', data:sendersMessages})
    }
    if(err){
        return res.status(400).json({success:false,error:err})
     }
}
getMessageByDestination= async(req,res)=>{
    const destination =req.params.destination
    //const destinationMessages = await InboxMessages.find({to:destination})
    await InboxMessages.find({to:destination})
    .then((destinationMessages)=>{
        if(destinationMessages.length === 0){
            return res.status(404).json({success:false,err:`No message from the ${destination} was found`})
        }else if(destinationMessages){
            return res.status(200).json({success:true,message:'user(s) messages were found', data:destinationMessages})
        }
    })
  .catch((err)=>{
    return res.status(400).json({success:false,error:err})
  })

 }
 getMessageById= async(req,res)=>{
    const user_id = req.params.userId
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




 module.exports={
     createMessage,
     updateMessage,
     deleteMessage,
     getMessageByDestination,
     getMessageById,
     getMessageBySender,
     getMessages
 }