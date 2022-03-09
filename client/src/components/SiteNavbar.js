import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// STYLING
import { HStack,} from '@chakra-ui/react'

// ICONS
import { FaFeather, FaUser, FaRegHeart, FaQuestion, FaBinoculars, FaHeart } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";

// SUB COMPONENTS
import { userAuth } from '../helpers/auth'

const SiteNavbar = () => {

  // STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // CHECK IF LOGGED IN
  useEffect(() => {
    setIsLoggedIn(userAuth())
  })

  return (
    <div className='navbar-container'>
      <HStack justifyContent='space-around' margin>
      <Link to='/'><FaFeather /></Link>
      {isLoggedIn ?
        <>
          <Link to='/likes'><FaRegHeart /></Link>
          <Link to='/matches'><GiLovers /></Link>
          <Link to='/wouldyourather'><FaQuestion /></Link>
          <Link to='/find'><FaBinoculars /></Link>
          <Link to='/profile'><FaUser /></Link>
        </> 
        :
        <>
          <Link to='/register'>Register</Link>
          <Link to='/Login'>Login</Link>
        </>
        }
    </HStack>
    </div>
  )
}

export default SiteNavbar