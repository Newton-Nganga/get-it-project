
import React from 'react'
import './App.css'
import{BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Home from './Pages/HomePage/Home'
import Profiles from './Components/ProfilesSection/Profiles'
import SignupCard  from './Components/Registration/Register'
import UserLogin from './Components/Registration/Login'
import UserAccount from './Components/UserAccount/UserAccount'
import UserProfile from './Components/UserAccount/Profile/UserProfile'
import CreateAd from './Components/UserAccount/Ads/ManageAds'
import Inbox from './Components/UserAccount/Inbox/Inbox'
import Category from './Pages/Categories/Category'
import PageNotFound from './Pages/404/NotFound404'
import AboutUsPage from './Pages/About/AboutUs'
import ContactUs from './Pages/ContactUs/Contact'
import Auth from './Components/Registration/Auth'


export default function App(){
  const isAuthenticated =window.sessionStorage.getItem('isAuthenticated')
  return(
    <Router>
     <Routes>
     <Route exact path='/' element={<Home/>}></Route>
     <Route exact path='/About' element={<AboutUsPage/>}/>
     <Route exact path='/Contact' element={<ContactUs/>}/>
     <Route exact path='/profiles/' element={<Profiles/>}></Route>
     <Route exact path='/auth/Login' element={<UserLogin/>}/>
     <Route exact path='/auth/Login/:id/:email/:auth' element={<Auth/>}/>
     <Route exact path='/auth/Register' element={<SignupCard/>}></Route>
     <Route exact path='/user/Account/profile' element={isAuthenticated  ? (<UserProfile/>):(<Navigate to='/auth/Login'/>) }></Route>
     <Route exact path='/user/Account/Ad' element={isAuthenticated  ? (<CreateAd/>):(<Navigate to='/auth/Login'/>) }></Route>
     <Route exact path='/user/Account/inbox' element={isAuthenticated  ? (<Inbox/>):(<Navigate to='/auth/Login'/>) }></Route>
     <Route exact path='/user/Account' element={isAuthenticated  ? (<UserAccount/>):(<Navigate to='/auth/Login'/>) } />
     <Route exact path="/profiles/:id" element={<Category />} />

     <Route path='*' element={<PageNotFound/>}/>
     </Routes>
    </Router>
  )
  }

