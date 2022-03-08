import axios from 'axios'
import React, {useState, useEffect} from 'react'

import { getTokenFromLocal } from '../../helpers/auth'
// import SeedUsersAnswerAllQuestions from '../../helpers/seedFunctions'

const Others = ({ profileId }) => {
  
  // STATE
  const [featuredProfile, setFeaturedProfile] = useState({})
  const [user, setUser] = useState({})

  // GET FEATURED PROFILE
  useEffect(() => {
    if (!profileId) return
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profiles/${profileId}/`)
        console.log(data)
        setFeaturedProfile(data)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getProfile()
  }, [profileId])

  // GET CURRENT USER
  useEffect(() => {
    if (!featuredProfile.id) return
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
  }, [])


  return (
    <>
      {/* <SeedUsersAnswerAllQuestions /> */}
      {featuredProfile.id ?
        <>
        {featuredProfile.profile_pic ?
          <img src={featuredProfile.profile_pic} alt={featuredProfile.first_name} />
          :
          <p>Spice up your profile with a profile pic</p>
        }

        <div className='answer-container'>
          {featuredProfile.answers.length ?
          <>
            <p>I'd rather </p>
            {/* {altAnsText1 && <p>{ansText1} than {altAnsText1}</p>} */}

          </>
            :
            <p>Lookes like you need to answer some questions</p>}
        </div>

        <div className='profile-info-container'>
          <p>{featuredProfile.first_name} {featuredProfile.last_name}</p>
          <p>{featuredProfile.city}</p>
          <p>Age: {featuredProfile.age}</p>
        </div>
        {featuredProfile.pictures.length ?
          <img src={featuredProfile.pictures[0]} alt={featuredProfile.first_name}/>
          :
          <p>Spice up your profile with some extra photos</p>}

        {featuredProfile.pictures.length >= 2 ?
        <img src={featuredProfile.pictures[1]} alt={featuredProfile.first_name}/>
          :
          <p>Spice up your profile with some extra photos</p>}
        
        <div className='answer-container'>
          {featuredProfile.answers.length > 1 ?
          <>
            <p>I'd rather </p>
            {/* {altAnsText2 && <p>{ansText2} than {altAnsText2}</p>} */}
          </>
            :
            <p>Lookes like you need to answer some questions</p>}
        </div>
        {featuredProfile.pictures.length >= 3 ?
          <img src={featuredProfile.pictures[2]} alt={featuredProfile.first_name}/>
          : 
          <p>Spice up your profile with some extra photos</p>
        }
        
        <div className='answer-container'>
          {featuredProfile.answers.length > 2 ?
          <>
            <p>I'd rather </p>
            {/* {altAnsText3 && <p>{ansText3} than {altAnsText3}</p>} */}
          </>
            :
            <p>Lookes like you need to answer some questions</p>}
        </div>

        {featuredProfile.pictures.length >= 4 &&
          <img src={featuredProfile.pictures[3]} alt={featuredProfile.first_name}/>}
        
        {featuredProfile.pictures.length >= 5 &&
          <img src={featuredProfile.pictures[4]} alt={featuredProfile.first_name}/>}
        
      </>
        :
        <p>Loading</p>}
    </>
  )
}

export default Others