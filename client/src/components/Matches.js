import React, { useState, useEffect } from 'react'
import axios from 'axios'

// SUBCOMPONENTS
import { getTokenFromLocal } from '../helpers/auth'
import MatchesTiles from './UserProfile/subComponents/MatchesTiles'
import OthersProfile from './UserProfile/OthersProfile'
import RejectMatch from './UserProfile/subComponents/RejectMatch'
import MessageProfile from './UserProfile/subComponents/MessageProfile'

// STYLING
import { Heading } from '@chakra-ui/react'

const Matches = () => {

  // STATE
  const [user, setUser] = useState({})
  const [matches, setMatches] = useState([])
  const [featuredProfileId, setFeaturedProfileId] = useState(null)
  const [resetMatches, setResetMatches] = useState(0)
  const [viewingMessages, setViewingMessages] = useState(false)

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile/', { headers: {Authorization: `Bearer ${token}` }})
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
    <div className={featuredProfileId ? 'main' : 'wyr-main'}>
      {featuredProfileId ?
        <>
          {!viewingMessages && <button className='all-btn' onClick={goBack}>All</button>}
          <div className='match-user-profile-header'>
            <div className='profile-message-container'>
              <button onClick={() => setViewingMessages(false)} className={!viewingMessages && 'highlighted'}>Profile</button>
              <button onClick={() => setViewingMessages(true)} className={viewingMessages && 'highlighted'}>Chat</button>
            </div>
          </div>

          {viewingMessages ?
            <MessageProfile currentUser={user} profileId={featuredProfileId} refreshMatches={refreshMatches}/>
            :
            <>
              <OthersProfile profileId={featuredProfileId} currentUser={user}/>
              <RejectMatch />
            </>
            }
        </>

        
        :
        <>
          <Heading as='h1' marginBottom={5} size='xl'>Matches</Heading>
          <MatchesTiles matches={matches} goToFeaturedProfile={goToFeaturedProfile}/>
        </>

      }
    </div>
    
  )
}

export default Matches