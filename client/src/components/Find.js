import React, {useEffect, useState} from 'react'
import axios from 'axios'

// SUB COMPONENTS
import OthersProfile from './UserProfile/OthersProfile'
import LikeProfile from './UserProfile/subComponents/LikeProfile'
import { getTokenFromLocal } from '../helpers/auth'

const Find = () => {

  // STATE
  const [alluserIds, setAllUserIds] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [alreadyViewedIds, setAlreadyViewedIds] = useState([])
  const [profileId, setProfileId] = useState(null)
  const [viewedAllProfiles, setViewedAllProfiles] = useState(false)
  
  // GET ALL USERS
  useEffect(() => {
    const getUsersId = async () => {
      try {
        const { data } = await axios.get('/api/auth/profiles')
        const userIds = data.map(user => user.id)
        setAllUserIds(userIds)
      } catch (error) {
        console.log(error)
      }
    }
    getUsersId()
  }, [])

  // GET CURRENT USER ID
  useEffect(() => {
    if(!alluserIds.length) return
      const getUser = async () => {
        const token = getTokenFromLocal()
        try {
          const { data } = await axios.get('/api/auth/profile/', { headers: {Authorization: `Bearer ${token}` }})
          // console.log(data)
          setCurrentUser(data)
        } catch (error) {
          console.log(error.response.data.detail)
        }
      }
      getUser()
  }, [alluserIds])

  // GET NEXT PROFILE THAT ISNT ALREADY VIEWED OR MATCHED
  useEffect(() => {
    if (!currentUser.id) return
    const options = alluserIds.filter(id => 
      (!alreadyViewedIds.includes(id)) 
      && id !== currentUser.id
      &&(!currentUser.matches.includes(id))
      && (!currentUser.likes_sent.includes(id)) )
    const randomId = options[Math.floor(Math.random() * options.length)]
    if (randomId === undefined) {
      setViewedAllProfiles(true)
    }
    setProfileId(randomId)
  }, [currentUser, alreadyViewedIds])

  // ADD PROFILE TO ALREADY VIEWED
  const addToAlreadyViewed = (id) => {
    setAlreadyViewedIds([...alreadyViewedIds, id])
  }

  return (
    <div className='main'>
      {viewedAllProfiles?
        <>
          <p className='faint'>Looks like you've viewed all the profiles</p>
          <p className='faint'>Come back again later to see if there are more</p>
        </>
        :
        <>
          <OthersProfile profileId={profileId}/>
          <LikeProfile currentUser={currentUser} profileId={profileId} addToAlreadyViewed={addToAlreadyViewed}/>
        </>
      }
    </div>
  )
}

export default Find