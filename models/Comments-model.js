const mongoose= require('mongoose');

const Schema = mongoose.Schema

const CommentSchema=new Schema({
    from:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    comment:{
        required:true,
        type:String
    }
})

module.exports = mongoose.model('Comments',CommentSchema)

