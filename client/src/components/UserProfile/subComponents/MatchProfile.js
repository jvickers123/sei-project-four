import React from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../../../helpers/auth'

const MatchProfile = ({ currentUser, profileId, refreshLikes }) => {

  const MatchProfile = async () => {
    const matchesAlready = [...currentUser.matches]
    console.log(matchesAlready)
    const matches = matchesAlready.map(profile => profile.id)
    matches.push(profileId)
    console.log('matches', matches)
    const likesAlreadyRecieved= [...currentUser.likes_recieved]
    console.log(likesAlreadyRecieved)
    const likesRecieved = likesAlreadyRecieved.map(profile => profile.id)
    console.log(likesRecieved)
    const indexOfMatch = likesRecieved.indexOf(profileId)
    console.log(indexOfMatch)
    likesRecieved.splice(indexOfMatch, 1)
    console.log(likesRecieved)
    const token = getTokenFromLocal()
    try {
      const { data } = await axios.put('/api/auth/profile/', { matches: matches, likes_recieved: likesRecieved }, { headers: {Authorization: `Bearer ${token}` }} )
      console.log(data)
      refreshLikes()
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }

  const rejectProfile = () => {
  }
  return (
    <>
      <button onClick={rejectProfile}>Reject</button>
      <button onClick={MatchProfile}>Match</button>
    </>
  )
}

export default MatchProfile