import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// STYLING
import { HStack,} from '@chakra-ui/react'

// ICONS
import { FaFeather, FaUser, FaRegHeart, FaQuestion, FaBinoculars, FaHeart } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";

// SUB COMPONENTS
// import { userAuth } from '../helpers/auth'

const SiteNavbar = ({ isLoggedIn }) => {

  // STATE
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [clicked, setClicked] = useState('home')

  // CHECK IF LOGGED IN
  // useEffect(() => {
  //   setIsLoggedIn(userAuth())
  // })

  return (
    <>
      {isLoggedIn &&
        <div className='navbar-container'>
          <HStack justifyContent='space-around' margin>
          <p><FaFeather /></p>
          
            <>
              <Link to='/find' onClick={() => setClicked('find')} className={clicked === 'find' ? 'highlight' : ''}><FaBinoculars /></Link>
              <Link to='/likes' onClick={() => setClicked('likes')} className={clicked === 'likes' ? 'highlight' : ''}><FaRegHeart /></Link>
              <Link to='/matches' onClick={() => setClicked('matches')} className={clicked === 'matches' ? 'highlight' : ''}><GiLovers /></Link>
              <Link to='/wouldyourather' onClick={() => setClicked('wyr')} className={clicked === 'wyr' ? 'highlight' : ''}><FaQuestion /></Link>
              <Link to='/profile' onClick={() => setClicked('profile')} className={clicked === 'profile' ? 'highlight' : ''}><FaUser /></Link>
            </> 
        </HStack>
        </div>
      }
    </>
  )
}

export default SiteNavbar