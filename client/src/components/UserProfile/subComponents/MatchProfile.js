import React from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../../helpers/auth'

import { GiLovers } from "react-icons/gi";

const MatchProfile = ({ currentUser, profileId, refreshLikes }) => {

  const MatchProfile = async () => {
    const matchesAlready = [...currentUser.matches]
    const matches = matchesAlready.map(profile => profile.id)
    matches.push(profileId)

    const likesAlreadyRecieved= [...currentUser.likes_recieved]
    const likesRecieved = likesAlreadyRecieved.map(profile => profile.id)
    const indexOfMatch = likesRecieved.indexOf(profileId)
    likesRecieved.splice(indexOfMatch, 1)

    const token = getTokenFromLocal()
    try {
      await axios.put('/api/auth/profile/', { matches: matches, likes_recieved: likesRecieved }, { headers: {Authorization: `Bearer ${token}` }} )
      refreshLikes()
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }

  const rejectProfile = async () => {
    const likesAlreadyRecieved= [...currentUser.likes_recieved]
    const likesRecieved = likesAlreadyRecieved.map(profile => profile.id)
    const indexOfMatch = likesRecieved.indexOf(profileId)
    likesRecieved.splice(indexOfMatch, 1)

    const token = getTokenFromLocal()
    try {
      await axios.put('/api/auth/profile/', { likes_recieved: likesRecieved }, { headers: {Authorization: `Bearer ${token}` }} )
      refreshLikes()
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
  return (
    <div className='likebtns-container'>
      <button className='reject-btn' onClick={rejectProfile}>x</button>
      <button className='like-btn'onClick={MatchProfile}><GiLovers /></button>
    </div>
  )
}

export default MatchProfile