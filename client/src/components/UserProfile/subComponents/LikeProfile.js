import React from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../../helpers/auth'

import { FaRegHeart } from 'react-icons/fa'
const LikeProfile = ({ currentUser, profileId, addToAlreadyViewed }) => {

  const likeProfile = async () => {
    const likesAlreadySent = [...currentUser.likes_sent]
    const likesSent = likesAlreadySent.map(profile => profile.id)
    likesSent.push(profileId)
    const token = getTokenFromLocal()
    try {
      const { data } = await axios.put('/api/auth/profile/', { likes_sent: likesSent }, { headers: {Authorization: `Bearer ${token}` }} )
      addToAlreadyViewed(profileId)
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }

  const rejectProfile = () => {
    addToAlreadyViewed(profileId)
  }
  return (
    <div className='likebtns-container'>
      <button className='reject-btn' onClick={rejectProfile}>x</button>
      <button className='like-btn' onClick={likeProfile}><FaRegHeart /></button>
    </div>
  )
}

export default LikeProfile