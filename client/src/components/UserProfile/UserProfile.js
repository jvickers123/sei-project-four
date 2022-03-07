import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../helpers/auth'

// components
import EditProfile from './EditProfile'
import ViewProfile from './ViewProfile'

const UserProfile = () => {

  const [user, setUser] = useState({})
  const [editing, setEditing] = useState(false)

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
  }, [])


  return (
    <>
      <h1>{user.first_name}</h1>
      <button onClick={() => setEditing(false)} >View</button>
      <button onClick={() => setEditing(true)} >Edit</button>
      {editing ?
        <EditProfile user={user}/>
        : 
        <ViewProfile user={user}/>
        }
    </>
  )
}

export default UserProfile