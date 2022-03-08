import axios from 'axios'
import React, {useState, useEffect} from 'react'

import { getTokenFromLocal } from '../../helpers/auth'

const Others = ({ profileId }) => {
  
  // STATE
  const [featuredProfile, setFeaturedProfile] = useState({})
  const [user, setUser] = useState({})

  // GET FEATURED PROFILE
  useEffect(() => {
    if (!profileId) return
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profiles/${profileId}/`)
        console.log(data)
        setFeaturedProfile(data)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getProfile()
  }, [profileId])

  // GET CURRENT USER
  useEffect(() => {
    if (!featuredProfile.id) return
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile', { headers: {Authorization: `Bearer ${token}` }})
        console.log(data)
        setUser(data)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getUser()
  }, [])
  return (
    <>
      {profileId && profileId}
    </>
  )
}

export default Others