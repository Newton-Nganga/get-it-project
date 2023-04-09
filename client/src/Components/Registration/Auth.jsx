import React, { } from 'react'
import { useParams,Navigate } from 'react-router-dom'
export default function Auth(){
  let { id,email,auth } = useParams();
  window.sessionStorage.setItem("isAuthenticated",auth)
  window.sessionStorage.setItem("id",id)
  window.sessionStorage.setItem("email",email)
  // useEffect(()=>{
  //   i
  // })
  return(<>
  {auth === true ? <Navigate to='/user/Account'/>:<Navigate to='/auth/Login'/>}
  </>
  )
}