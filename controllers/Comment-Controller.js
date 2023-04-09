const Comments = require('../models/Comments-model')



createComment=async(req,res)=>{
    const body = req.body
    console.log(body)
    data={
       from:body.from,
       email:body.email,
       comment:body.comment
    }
    if (!body){
        return res.status(400).json({
            success:false,
            error:'You must provide the comments fields with data'
        })
    }

    const comment = new Comments(data)
    if(!comment){
        return res.status(400).json({
            success:false,
            error:err
        })
    }
    comment.save()
        .then(comment=>{
               return res.status(201).json({success:true,message:'Comment created successfully',data:comment})})
        .catch(error=>{
               return res.status(400).json({success:false,error,message:'comment was not created !'})
           })

}
deleteCommentByEmail = async(req,res)=>{
    const user_Email = req.params.email
    await Comments.findOneAndDelete({email:user_Email})
    .then((comment)=>{
        return res.status(200).json({success:true,message: 'The comment was successfully deleted',data:comment})
   })
   .catch(
       (err)=> {return res.status(400).json({success:false,error:err,message:"An error was caught when trying to delete"})}
   ) 
}
deleteCommentById = async(req,res)=>{
    const user_Id = req.params.UserId
    await Comments.findOneAndDelete({_id:user_Id})
    .then((comment)=>{
        return res.status(200).json({success:true,message: 'The comment was successfully deleted',data:comment})
   })
   .catch(
       (err)=> {return res.status(400).json({success:false,error:err,message:"An error was caught when trying to delete"})}
   ) 
}
getAllComment = async(req,res)=>{
    await Comments.find({})
    .then((comment=>{
       if(!comment){
           return res.status(404).json({success:false,err:'No user comment was found for the Id '})
       }
       return res.status(200).json({success:true,message:"comments were fetched successfully",data:comment})
    })).catch(err=>{
       return res.status(400).json({success:false,error:err,message:"An error occurred while fetching"})
    })
}
getCommentByEmail = async(req,res)=>{
    const user_Email = req.params.email
    await Comments.find({user_Email})
    .then((comment=>{
       if(!comment){
           return res.status(404).json({success:false,err:'No user comment was found for the Id '})
       }
       return res.status(200).json({success:true,message:"comments were fetched successfully",data:comment})
    })).catch(err=>{
       return res.status(400).json({success:false,error:err,message:"An error occurred while fetching"})
    })
}
getCommentById = async(req,res)=>{
    const user_Id = req.params.UserId
    await Comments.find({user_Id})
    .then((comment=>{
       if(!comment){
           return res.status(404).json({success:false,err:'No user comment was found for the Id '})
       }
       return res.status(200).json({success:true,message:"comments were fetched successfully",data:comment})
    })).catch(err=>{
       return res.status(400).json({success:false,error:err,message:"An error occurred while fetching"})
    })
}

module.exports = {
    createComment,
    deleteCommentByEmail,
    deleteCommentById,
    getAllComment,
    getCommentByEmail,
    getCommentById
}