import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// SUB COMPONENTS
import { userAuth } from '../helpers/auth'

const SiteNavbar = () => {

  const navigate = useNavigate()

  // STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // CHECK IF LOGGED IN
  useEffect(() => {
    setIsLoggedIn(userAuth())
  })

  // LOG OUT
  const logOut = () => {
    window.localStorage.removeItem('token-birds-of-a-feather')
    navigate('/')
  }

  return (
    <>
      <h2>SiteNavbar</h2>
      <Link to='/'>Home</Link>
      {isLoggedIn ?
        <>
          <Link to='/profile'>Profile</Link>
          <Link to='/likes'>Likes</Link>
          <Link to='/matches'>Matches</Link>
          <Link to='/wouldyourather'>Would You Rather</Link>
          <button onClick={logOut}>Logout</button>
        </> 
        :
        <>
          <Link to='/register'>Register</Link>
          <Link to='/Login'>Login</Link>
        </>
        }
      
      
    </>
    
  )
}

export default SiteNavbar