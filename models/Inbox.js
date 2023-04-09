const mongoose=require('mongoose');

const Schema = mongoose.Schema

const MessageSchema =new Schema({
    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    title:{
         type:String,
         required:true
    },
    content:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('messages',MessageSchema)