import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

// STYLING
import { Heading } from '@chakra-ui/react'

// HELPERS
import { getTokenFromLocal } from '../../helpers/auth'

// components
import EditProfile from './EditProfile'
import ViewProfile from './ViewProfile'

const UserProfile = ({ logOutState }) => {

  const navigate = useNavigate()

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
        console.log(error.response.data.detail)
      }
    }
    getUser()
  }, [countToUpdateuser])

  // TRACK WHEN USER IS UPDATED AND GET USER AGAIN
  const updateUser = () => {
    setCountToUpdateUser(countToUpdateuser + 1)
  }

   // LOG OUT
  const logOut = () => {
    window.localStorage.removeItem('token-birds-of-a-feather')
    navigate('/')
    logOutState()
  }
  
  return (
    <div className='main'>
      <div className='main-user-profile-header'>
        <header className='profile-header'>
          <Heading as='h2' size='sm'>Profile</Heading>
          <Heading as='h1' size='md'>{user.first_name}</Heading>
          <button onClick={logOut}>Logout</button>
        </header>
        
        <div className='view-edit-container'>
          <button onClick={() => setEditing(false)} className={!editing && 'highlighted'}>View</button>
          <button onClick={() => setEditing(true)} className={editing && 'highlighted'}>Edit</button>
        </div>
      </div>

      {editing ?
        <EditProfile user={user} updateUser={updateUser} logOutState={logOutState}/>
        : 
        <ViewProfile user={user}/>
        }
    </div>
  )
}

export default UserProfile