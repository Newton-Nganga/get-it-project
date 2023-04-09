const express =require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const LOCAL_PORT=process.env.PORT || 3001
const cookieSession = require('cookie-session')
const passport =require('./Passport/strategies')
const UserAccountRouter = require('./routes/All-Routers.js')
const path = require('path');
const db =require('./db/db')
const app =express()

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  allowedHeaders:'Content-Type,Authorization',
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.options("*",cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))
// app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials','false')
  res.header("Access-Control-Allow-Origin")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,PATCH,POST,DELETE")
  next();
});
app.use(bodyParser.json())
app.use(passport.initialize() )
app.use(passport.session())

db.on('error',console.error.bind(console,'mongoDB database connection error'));
// app.options('/auth/google', cors(corsOptions))
app.use('/api',cors(corsOptions),UserAccountRouter)

app.get('/theeBackend',(req,res)=>{
        res.send('<h1>Hello how are you !</h1>')
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
 }

// app.listen(apiPort,()=>console.log(`The server has started in port ${apiPort}`))
app.listen(LOCAL_PORT,()=>{
    console.log(`server has started on port ${LOCAL_PORT}`)
})