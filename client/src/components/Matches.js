import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// SUBCOMPONENTS
import { getTokenFromLocal, userAuth } from '../helpers/auth'
import MatchesTiles from './userprofile/subcomponents/MatchesTiles'
import OthersProfile from './userprofile/OthersProfile'
import RejectMatch from './userprofile/subcomponents/RejectMatch'
import MessageProfile from './userprofile/subcomponents/MessageProfile'

// STYLING
import { Heading } from '@chakra-ui/react'

const Matches = () => {

  const navigate = useNavigate()

  // CHECK IF USER IS LOGGED IN
  useEffect(() => {
    !userAuth() && navigate('/')
  }, [])

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