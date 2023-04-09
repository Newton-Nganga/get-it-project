const mongoose = require('mongoose');
require("dotenv").config();

mongoose
        // .connect('mongodb://localhost:27017/get-itDb',{useNewUrlParser:true})
        .connect(process.env.MONGO_DB_URL,{useNewUrlParser:true})
        .catch((e) =>{
            console.error('Connection error',e.message)
        }
        )

const db = mongoose.connection
if(db){
    console.log('successfully connected to the database')
}else(console.log('some error occurred'))

module.exports = db

