import React, {useEffect, useState} from 'react'
import axios from 'axios'

// SUB COMPONENTS
import OthersProfile from './UserProfile/OthersProfile'
import { getTokenFromLocal } from '../helpers/auth'

const Find = () => {

  // STATE
  const [alluserIds, setAllUserIds] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null)
  const [alreadyViewedIds, setAlreadyViewedIds] = useState([])
  const [profileId, setProfileId] = useState(null)
  
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
      const getUser = async () => {
        const token = getTokenFromLocal()
        try {
          const { data } = await axios.get('/api/auth/profile', { headers: {Authorization: `Bearer ${token}` }})
          console.log(data)
          setCurrentUserId(data.id)
        } catch (error) {
          console.log(error.response.data.detail)
        }
      }
      getUser()
  }, [alluserIds])

  // GET NEXT PROFILE
  useEffect(() => {
    if (!currentUserId) return
    const options = alluserIds.filter(id => (!alreadyViewedIds.includes(id)) && id !== currentUserId)
    const randomId = options[Math.floor(Math.random() * options.length)]
    setProfileId(randomId)
  }, [alluserIds])

  return (
    <div>
      <OthersProfile profileId={profileId}/>
    </div>
  )
}

export default Find