const mongoose= require('mongoose');

const Schema = mongoose.Schema


const ProfileAdSchema = new Schema({
    image:{
       type:String,
       required:true
    },
    fName:{
           type:String,
           required:true
    },
    lName:{
           type:String,
           required:true
    },
    location:{
              type:String,
              required:true
    },
    age:{
          type:Number,
          min:18,
          max:90,
          required:true
    },
    gender:{
           type:String,
           required:true
    },
    category:{
       type:String,
       required:true
      },
    bio:{
           type:String,
           required:true
    },   
    email:{
           type:String ,
           required:true},
    phone:{
           type:Number,
           required:true
    },
    whatsapp:{
            type:Number,
    }

})



module.exports = mongoose.model('Ads',ProfileAdSchema)