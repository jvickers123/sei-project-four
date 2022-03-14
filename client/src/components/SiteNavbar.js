import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// STYLING
import { HStack,} from '@chakra-ui/react'

// ICONS
import { FaFeather, FaUser, FaRegHeart, FaQuestion, FaBinoculars } from "react-icons/fa";
import { BiMessage } from 'react-icons/bi';


const SiteNavbar = ({ isLoggedIn }) => {

  // STATE
  const [clicked, setClicked] = useState('home')


  return (
    <>
      {isLoggedIn &&
        <div className='navbar-container'>
          <h3 className='navbar-brand'>Birds of a Feather</h3>
          <HStack className='nav-icon-container' justifyContent='space-around' margin>
            <p><FaFeather /></p>
          
            <>
              <Link to='/find' onClick={() => setClicked('find')} className={clicked === 'find' ? 'highlight' : ''}><FaBinoculars /></Link>
              <Link to='/likes' onClick={() => setClicked('likes')} className={clicked === 'likes' ? 'highlight' : ''}><FaRegHeart /></Link>
              <Link to='/matches' onClick={() => setClicked('matches')} className={clicked === 'matches' ? 'highlight' : ''}><BiMessage /></Link>
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