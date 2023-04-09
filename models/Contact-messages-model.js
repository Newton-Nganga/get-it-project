const mongoose=require('mongoose');

const Schema = mongoose.Schema

const ContactMessageSchema =new Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
   },
    subject:{
         type:String,
         required:true
    },
    message:{
        type:String,
        required:true
    },
    sentOn:{
        type:Date,
        default:Date.now()
    }
})


module.exports = mongoose.model('contacts',ContactMessageSchema)