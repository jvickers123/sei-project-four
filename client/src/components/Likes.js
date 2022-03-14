import React, { useState, useEffect } from 'react'
import axios from 'axios'

// SUBCOMPONENTS
import { getTokenFromLocal } from '../helpers/auth'
import LikesYouTiles from './UserProfile/subComponents/LikesYouTiles'
import OthersProfile from './UserProfile/OthersProfile'
import MatchProfile from './UserProfile/subComponents/MatchProfile'

// STYLING
import { Heading } from '@chakra-ui/react'

const Likes = () => {

  // STATE
  const [user, setUser] = useState({})
  const [likesRecieved, setLikesRecieved] = useState([])
  const [featuredProfileId, setFeaturedProfileId] = useState(null)
  const [resetLikes, setResetLikes] = useState(0)

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile/', { headers: {Authorization: `Bearer ${token}` }})
        setUser(data)
        setLikesRecieved(data.likes_recieved)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getUser()
  }, [resetLikes])

  const goToFeaturedProfile = (id) => {
    setFeaturedProfileId(id)
  }

  const goBack = () => {
    setFeaturedProfileId(null)
  }

  const refreshLikes = () => {
    setResetLikes(resetLikes + 1)
    goBack()
  }

  return (
    <div className={featuredProfileId ? 'main' : 'wyr-main'}>
        {featuredProfileId ?
          <>
            <button className='all-btn' onClick={goBack}>All</button>
            <OthersProfile profileId={featuredProfileId} currentUser={user}/>
            <MatchProfile currentUser={user} profileId={featuredProfileId} refreshLikes={refreshLikes}/>
          </>
          :
          <>
            <Heading as='h1' marginBottom={5} size='xl'>Likes you</Heading>
            
            <div className='likes-tiles-container'>
              <LikesYouTiles likesRecieved={likesRecieved} goToFeaturedProfile={goToFeaturedProfile}/>
            </div>
          </>
            

        }
      
    </div>
    
  )
}

export default Likes