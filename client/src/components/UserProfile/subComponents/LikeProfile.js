import React from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../../helpers/auth'

const LikeProfile = ({ currentUser, profileId, addToAlreadyViewed }) => {

  const likeProfile = async () => {
    const likesAlreadySent = [...currentUser.likes_sent]
    console.log(likesAlreadySent)
    const likesSent = likesAlreadySent.map(profile => profile.id)
    console.log('just IDs',likesSent)
    likesSent.push(profileId)
    console.log(likesSent)
    const token = getTokenFromLocal()
    try {
      const { data } = await axios.put('/api/auth/profile/', { likes_sent: likesSent }, { headers: {Authorization: `Bearer ${token}` }} )
      console.log(data)
      addToAlreadyViewed(profileId)
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }

  const rejectProfile = () => {
    addToAlreadyViewed(profileId)
  }
  return (
    <>
      <button onClick={rejectProfile}>Reject</button>
      <button onClick={likeProfile}>Like</button>
    </>
  )
}

export default LikeProfile