import React, { useEffect } from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../helpers/auth'

// components
import EditProfile from './EditProfile'
import ViewProfile from './ViewProfile'

const UserProfile = () => {

  useEffect(() => {

    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('')
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <>
      <h1>UserProfile</h1>
      <EditProfile />
      <ViewProfile />
    </>
  )
}

export default UserProfile