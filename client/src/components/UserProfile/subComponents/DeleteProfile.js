import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { getTokenFromLocal } from '../../../helpers/auth'

const DeleteProfile = ({ user }) => {

  const navigate = useNavigate()

  const deleteProfile = async () => {
    const token = getTokenFromLocal()
    try {
      await axios.delete('/api/auth/profile/', { headers: {Authorization: `Bearer ${token}` }})
      window.localStorage.removeItem('token-birds-of-a-feather')
      navigate('/')
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }

  return (
    <button onClick={deleteProfile}>Delete Profile</button>
  )
}

export default DeleteProfile