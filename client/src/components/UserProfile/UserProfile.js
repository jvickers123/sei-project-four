import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../helpers/auth'

// components
import EditProfile from './EditProfile'
import ViewProfile from './ViewProfile'

const UserProfile = () => {

  // STATE
  const [user, setUser] = useState({})
  const [editing, setEditing] = useState(false)
  const [countToUpdateuser, setCountToUpdateUser] = useState(0)

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile', { headers: {Authorization: `Bearer ${token}` }})
        console.log(data)
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [countToUpdateuser])

  // TRACK WHEN USER IS UPDATED AND GET USER AGAIN
  const updateUser = () => {
    setCountToUpdateUser(countToUpdateuser + 1)
  }
  
  return (
    <>
      <h1>{user.first_name}</h1>
      <button onClick={() => setEditing(false)} >View</button>
      <button onClick={() => setEditing(true)} >Edit</button>
      {editing ?
        <EditProfile user={user} updateUser={updateUser}/>
        : 
        <ViewProfile user={user}/>
        }
    </>
  )
}

export default UserProfile