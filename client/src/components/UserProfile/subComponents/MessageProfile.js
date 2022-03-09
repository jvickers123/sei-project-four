import React from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../../helpers/auth'

import { BiMessageDetail } from 'react-icons/bi'

const MessageProfile = ({ currentUser, profileId, refreshMatches }) => {

  const rejectProfile = async () => {
    const matchesAlreadyRecieved= [...currentUser.matches]
    const matches = matchesAlreadyRecieved.map(profile => profile.id)
    const indexOfMatch = matches.indexOf(profileId)
    matches.splice(indexOfMatch, 1)

    const token = getTokenFromLocal()
    try {
      await axios.put('/api/auth/profile/', { matches: matches }, { headers: {Authorization: `Bearer ${token}` }} )
      refreshMatches()
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
  return (
    <div className='likebtns-container'>
      <button className='reject-btn' onClick={rejectProfile}>x</button>
      <button className='like-btn' onClick={() => window.alert('coming soon')}><BiMessageDetail /></button>
    </div>
  )
}

export default MessageProfile