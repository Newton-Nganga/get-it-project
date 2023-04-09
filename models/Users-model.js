const mongoose= require('mongoose');
const findOrCreate= require('mongoose-findorcreate')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    email:{
        type:String,
        // required:true,
        unique:true
    },
    password:{
        type:String
    },
    googleId:{
        type:String
    },
    facebookId:{
        type:String
    }
})

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('users',UserSchema)
















