const express = require('express');
const passport =require('../Passport/strategies')
const AdCtrl = require('../controllers/ProFileAds-Controller')
const UserCtrl = require('../controllers/UserAccounts-Controller');
const ContactCtrl = require('../controllers/ContactControllers')
const InboxCtrl = require('../controllers/Inbox-Controller')
const LoginCtrl = require('../controllers/Users-Controllers')
const CommentCtrl = require('../controllers/Comment-Controller')
const router = express.Router()
const multer  = require('multer')
const cors = require('cors');

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials','false')
//     res.header("Access-Control-Allow-Origin",'http://localhost:3000' ); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","GET,PATCH,POST,DELETE")
//     next();
//   });


const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../server/uploads')
    },
    filename:(req,file,callback)=>{
    //  callback(null,file.originalname)
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const upload = multer({storage:storage,fileFilter:(req,file,cb)=>{
 if(file.mimetype == "image/jpg" || file.mimetype == "image/png" ||file.mimetype == "image/jpeg"){
      cb(null,true)
 }else{
    cb(null,false)
    return cb()
 }
}})




//Routers handling CRUD of UserAccounts


router.get('/accounts/:UserEmail/email',UserCtrl.getUsersByEmail)
router.get('/accounts',UserCtrl.getUserAccounts);
router.get('/accounts/:userId/id',UserCtrl.getUserById);
router.get('/accounts/:fName/first',UserCtrl.getUsersByfName);
router.get('/accounts/:lName/last',UserCtrl.getUsersBylName);
router.patch('/accounts/update/:id',UserCtrl.updateUserAccount);
router.delete('/accounts/delete/:UserEmail/email',UserCtrl.deleteUserAccountByEmail);
router.delete('/accounts/delete/:UserId/id',UserCtrl.deleteUserAccountById)
router.post('/accounts/create',upload.single('image'),UserCtrl.createUserAccount)

//Routers handling CRUD of Inbox messagesUsers
router.get('/inbox/messages/',InboxCtrl.getMessages)
router.get('/inbox/messages/:userId',InboxCtrl.getMessageById)
router.get('/inbox/messages/bySender/:sender/email',InboxCtrl.getMessageBySender)
router.get('/inbox/messages/byDestination/:destination/email',InboxCtrl.getMessageByDestination)
router.patch('/inbox/update/:userId',InboxCtrl.updateMessage)
router.delete('/inbox/messages/delete/:userId',InboxCtrl.deleteMessage)
router.post('/inbox/create/',InboxCtrl.createMessage)



//Routers handling CRUD of ProfileAds  (Ads) 
router.post('/profiles/create/',upload.single('image'),AdCtrl.createAd)
router.get('/profiles',AdCtrl.getAllAds)
router.get('/profiles/find/:UserId/id',AdCtrl.getAdById)
router.get('/profiles/find/:email/email',AdCtrl.getAdsByEmail)
router.get('/profiles/find/:fName/first',AdCtrl.getAdsByFName)
router.get('/profiles/find/:category/category',AdCtrl.getAdsByCategory)
router.get('/profiles/find/:lName/last',AdCtrl.getAdsByLName)
router.patch('/profiles/update/:UserId',AdCtrl.updateAd)
router.delete('/profiles/delete/:UserId',AdCtrl.deleteAd)


//Routers handling CRUD of  Registered(logins)
router.route('/logins/auth/allUsers/').get(LoginCtrl.getAllUsersLogins)                 //is working
router.route('/logins/auth/Register/').post(LoginCtrl.CreateUserLogin)   
router.route('/logins/auth/Login/').post(LoginCtrl.CompareUserLogin) 
router.route('/logins/auth/Logout/:email').post(LoginCtrl.LogoutUser)  //is working
router.get('/logins/auth/email/:userEmail',LoginCtrl.getUserLoginsByEmail)
router.get('/logins/auth/:userId',LoginCtrl.getUserLoginsById)
router.patch('/logins/auth/update/:userId',LoginCtrl.updateUserLogin)          
router.delete('/logins/auth/delete/:userId',LoginCtrl.deleteUserLogin) 
// router.get('/auth/google',LoginCtrl.GoogleAuthenticate)
// router.get('/auth/google/callback',LoginCtrl.GoogleCallback)
//google authenticate
router.get('/auth/google/',LoginCtrl.GoogleAuthenticate)
// router.get('/auth/google/callback',LoginCtrl.GoogleAuthenticateCallback)
router.get('/auth/google/callback',passport.authenticate('google-authenticate',{failureRedirect: 'http://localhost:3000/auth/Login'}),
function(req, res) {

 const user={
    email:req.user.email,
    id:req.user._id,
    isAuthenticated:true
 }
 //console.log(user);
 res.redirect(`http://localhost:3000/auth/Login/${user.id}/${user.email}/${user.isAuthenticated}`)
})



//facebook authenticate
router.get('/auth/facebook/',LoginCtrl.FBAuthenticate)
router.get('/auth/facebook/callback',passport.authenticate('fb-authenticate',{failureRedirect: 'http://localhost:3000/auth/Login'}),
function(req, res) {

 const user={
    email:req.user.email,
    id:req.user._id,
    isAuthenticated:true
 }
 //console.log(user);
 res.redirect(`http://localhost:3000/auth/Login/${user.id}/${user.email}/${user.isAuthenticated}`)
})

//Router to handle CRUD of Comments
router.get('/comments/',CommentCtrl.getAllComment)
router.get('/comments/:UserId/id',CommentCtrl.getCommentById)
router.get('/comments/:email/email',CommentCtrl.getCommentByEmail)
router.post('/comments/create',CommentCtrl.createComment)
router.delete('/comments/delete/:UserId/id',CommentCtrl.deleteCommentById)
router.delete('/comment/delete/:email/email',CommentCtrl.deleteCommentByEmail)
//router.patch()

router.get('/contact/admin/messages',ContactCtrl.getMessages)
router.get('/contact/admin/messages/:id/id',ContactCtrl.getMessageById)
router.get('/contact/admin/messages/:email/email',ContactCtrl.getMessageByEmail)
router.post('/contact/admin/messages/create',ContactCtrl.createMessage)
router.delete('/contact/admin/messages/:id',ContactCtrl.deleteMessage)



module.exports = router