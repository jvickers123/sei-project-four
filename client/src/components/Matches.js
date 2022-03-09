import React, { useState, useEffect } from 'react'
import axios from 'axios'

// SUBCOMPONENTS
import { getTokenFromLocal } from '../helpers/auth'
import MatchesTiles from './UserProfile/subComponents/MatchesTiles'
import OthersProfile from './UserProfile/OthersProfile'
import MessageProfile from './UserProfile/subComponents/MessageProfile'

const Matches = () => {

  // STATE
  const [user, setUser] = useState({})
  const [matches, setMatches] = useState([])
  const [featuredProfileId, setFeaturedProfileId] = useState(null)
  const [resetMatches, setResetMatches] = useState(0)

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile/', { headers: {Authorization: `Bearer ${token}` }})
        console.log(data)
        setUser(data)
        setMatches(data.matches)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getUser()
  }, [resetMatches])

  const goToFeaturedProfile = (id) => {
    setFeaturedProfileId(id)
  }

  const goBack = () => {
    setFeaturedProfileId(null)
  }

  const refreshMatches = () => {
    setResetMatches(resetMatches + 1)
    goBack()
  }

  return (
    <div className='main'>
      {featuredProfileId ?
        <>
          <button onClick={goBack}>All</button>
          <OthersProfile profileId={featuredProfileId} />
          <div className='likeprofile-container'>
            <MessageProfile currentUser={user} profileId={featuredProfileId} refreshMatches={refreshMatches}/>
          </div>
        </>
        :
        <MatchesTiles matches={matches} goToFeaturedProfile={goToFeaturedProfile}/>
      }
    </div>
    
  )
}

export default Matches