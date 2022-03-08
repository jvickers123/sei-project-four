import axios from 'axios'
import React, {useState, useEffect} from 'react'

import { getTokenFromLocal } from '../../helpers/auth'

const Others = ({ profileId }) => {
  
  // STATE
  const [featuredProfile, setFeaturedProfile] = useState({})
  const [user, setUser] = useState({})
  const [matchingAnswers, setMatchingAnswers] = useState([])
  const [matchRating, setMatchRating] = useState(null)

  const [matchingAns1, setMatchingAns1] = useState(null)
  const [matchingAns2, setMatchingAns2] = useState(null)
  const [matchingAns3, setMatchingAns3] = useState(null)

  const [matchAnsText1, setMatchAnsText1] = useState('')
  const [matchAnsText2, setMatchAnsText2] = useState('')
  const [matchAnsText3, setMatchAnsText3] = useState('')

  const [altMatchAns1, setAltMatchAns1] = useState(null)
  const [altMatchAns2, setAltMatchAns2] = useState(null)
  const [altMatchAns3, setAltMatchAns3] = useState(null)

  const [altMatchAnsText1, setAltMatchAnsText1] = useState('')
  const [altMatchAnsText2, setAltMatchAnsText2] = useState('')
  const [altMatchAnsText3, setAltMatchAnsText3] = useState('')



  // GET FEATURED PROFILE
  useEffect(() => {
    if (!profileId) return
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profiles/${profileId}/`)
        // console.log(data)
        setFeaturedProfile(data)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getProfile()
  }, [profileId])

  // GET CURRENT USER AND MATCHING ANSWERS
  useEffect(() => {
    if (!featuredProfile.id) return
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile', { headers: {Authorization: `Bearer ${token}` }})
        setUser(data)
        const matchingAns = data.answers.filter(ans => featuredProfile.answers.includes(ans))
        setMatchingAnswers(matchingAns)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getUser()
  }, [featuredProfile])

  // GET MATCH RATING
  useEffect(() => {
    if(!matchingAnswers.length) return
    const combinedAnswers = [...user.answers]
    featuredProfile.answers.forEach(ans => !combinedAnswers.includes(ans) && combinedAnswers.push(ans))
    let matchRatingPercentage = Math.floor((matchingAnswers.length * 2) / combinedAnswers.length * 100)
    if (matchRatingPercentage > 100) {
      matchRatingPercentage = 100
    }
    setMatchRating(matchRatingPercentage)
  }, [matchingAnswers])

  // GET RANDOM SELECTION OF RANDOM ANSWERS
  useEffect(() => {
    if(!matchingAnswers.length) return
    setMatchingAns1(matchingAnswers[Math.floor(Math.random() * matchingAnswers.length)])
  }, [matchingAnswers])

  useEffect(() => {
    if(!matchingAns1) return
    if(matchingAnswers.length <= 1) return
    const options = matchingAnswers.filter(id => id !== matchingAns1)
    console.log(options)
    setMatchingAns2(options[Math.floor(Math.random() * options.length)])
  }, [matchingAns1])

  useEffect(() => {
    if(!matchingAns2) return
    if(matchingAnswers.length <= 2) return
    const options = matchingAnswers.filter(id => id !== matchingAns1 && id !== matchingAns2)
    console.log(options)
    setMatchingAns3(options[Math.floor(Math.random() * options.length)])
  }, [matchingAns2])

  // GET SHARED ANSWER TEXT
  useEffect(() => {
    const getText = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${matchingAns1}`)
        setMatchAnsText1(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getText()
  }, [matchingAns1])

  useEffect(() => {
    const getText = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${matchingAns2}`)
        setMatchAnsText2(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getText()
  }, [matchingAns2])

  useEffect(() => {
    const getText = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${matchingAns3}`)
        setMatchAnsText3(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getText()
  }, [matchingAns3])

  // GET ALTERNATIVE ANSWERS
  useEffect(() => {
    if (matchingAns1 % 2 === 0) setAltMatchAns1(matchingAns1 - 1)
    if (matchingAns1 % 2 === 1) setAltMatchAns1(matchingAns1 + 1)
  }, [matchingAns1])

  useEffect(() => {
    if (matchingAns2 % 2 === 0) setAltMatchAns2(matchingAns2 - 1)
    if (matchingAns2 % 2 === 1) setAltMatchAns2(matchingAns2 + 1)
  }, [matchingAns2])

  useEffect(() => {
    if (matchingAns3 % 2 === 0) setAltMatchAns3(matchingAns3 - 1)
    if (matchingAns3 % 2 === 1) setAltMatchAns3(matchingAns3 + 1)
  }, [matchingAns3])

   // GET ALTERNATIVE ANSWER TEXT
  useEffect(() => {
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${altMatchAns1}`)
        setAltMatchAnsText1(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getAnswer()
  }, [altMatchAns1])

  useEffect(() => {
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${altMatchAns2}`)
        setAltMatchAnsText2(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getAnswer()
  }, [altMatchAns2])

  useEffect(() => {
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${altMatchAns3}`)
        setAltMatchAnsText3(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getAnswer()
  }, [altMatchAns3])

  return (
    <>
      {featuredProfile.id ?
        <>
        <h1>{featuredProfile.first_name}</h1>
        {featuredProfile.profile_pic ?
          <img src={featuredProfile.profile_pic} alt={featuredProfile.first_name} />
          :
          <p>Spice up your profile with a profile pic</p>
        }

        <div className='match-rating-container' >
          <h2>Match Rating: {matchRating}%</h2>
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
            <p>You'd both rather </p>
            {matchAnsText1 && <p>{matchAnsText2} than {altMatchAnsText2}</p>}
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