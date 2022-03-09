import axios from 'axios'
import React, {useState, useEffect} from 'react'

import { getTokenFromLocal } from '../../helpers/auth'

const Others = ({ profileId }) => {
  
  // STATE
  const [featuredProfile, setFeaturedProfile] = useState({})
  const [user, setUser] = useState({})
  const [matchingAnswers, setMatchingAnswers] = useState([])
  const [matchRating, setMatchRating] = useState(null)

  const [randomMatchingAns, setRandomMatchingAns] = useState(null)
  const [matchAnsText, setMatchAnsText] = useState('')
  const [altMatchAns, setAltMatchAns] = useState(null)
  const [altMatchAnsText, setAltMatchAnsText] = useState('') 
  const [getAnotherMatch, setGetAnotherMatch] = useState(0)

  const [disagreeAnswers, setDisagreeAnsewrs] = useState([])
  const [disagreeAnswerText1, setDisaagreeAnswerText1] = useState('')
  const [disagreeAnswerText2, setDisaagreeAnswerText2] = useState('')
  const [getAnotherDisagreement, setGetAnotherDisagreement] = useState(0)

  // GET FEATURED PROFILE
  useEffect(() => {
    if (!profileId) return
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profiles/${profileId}/`)
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

  // GET RANDOM MATCHING ANSWER
  useEffect(() => {
    if(!matchingAnswers.length) return
    setRandomMatchingAns(matchingAnswers[Math.floor(Math.random() * matchingAnswers.length)])
  }, [matchingAnswers, getAnotherMatch])

  // GET SHARED ANSWER TEXT
  useEffect(() => {
    if (!matchingAnswers.length) return
    const getText = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${randomMatchingAns}`)
        setMatchAnsText(data.text)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getText()
  }, [randomMatchingAns])

  // GET ALTERNATIVE ANSWER
  useEffect(() => {
    if(!randomMatchingAns) return
    if (randomMatchingAns % 2 === 0) setAltMatchAns(randomMatchingAns - 1)
    if (randomMatchingAns % 2 === 1) setAltMatchAns(randomMatchingAns + 1)
  }, [randomMatchingAns])


   // GET ALTERNATIVE ANSWER TEXT
  useEffect(() => {
    if(!altMatchAns) return
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${altMatchAns}`)
        setAltMatchAnsText(data.text)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    getAnswer()
  }, [altMatchAns])

  // GET DISAGREED ANSWERS
  useEffect(() => {
    if (!matchingAnswers.length) return

    const userAnswers = user.answers.filter(answer => !matchingAnswers.includes(answer))
    const featuredProfileAnswers = featuredProfile.answers.filter(answer => !matchingAnswers.includes(answer))

    const sameQuestion = []
    userAnswers.forEach(answer => {
      for (let i = 0; i < featuredProfileAnswers.length; i++) {
        if (Math.ceil(featuredProfileAnswers[i] / 2) === Math.ceil(answer / 2)){
          sameQuestion.push([answer, featuredProfileAnswers[i]])
        }}
      })

    setDisagreeAnsewrs(sameQuestion)
    }, [matchingAnswers])

  // GET RANDOM ANSWER TEXT
  useEffect(() => {
    if (!disagreeAnswers.length) return
    const randomIndex = Math.floor(Math.random() * disagreeAnswers.length)
    const getAnswer1 = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${disagreeAnswers[randomIndex][0]}`)
        setDisaagreeAnswerText1(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    const getAnswer2 = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${disagreeAnswers[randomIndex][1]}`)
        setDisaagreeAnswerText2(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getAnswer1()
    getAnswer2()
  }, [disagreeAnswers, getAnotherDisagreement])

  
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
          {featuredProfile.answers.length ?
          <>
            {matchAnsText ?
              <>
                <p>You'd both rather </p>
                <p>{matchAnsText} than {altMatchAnsText}</p>
                <button onClick={() => setGetAnotherMatch(getAnotherMatch + 1)}>Get another Match</button>
              </> 
              : 
              <>
                <p>Looks like you agree on nothing </p>
                <p>Answer some more would you rathers and see if this is still the case</p>
              </>
            }
          </>
            :
            <p>Lookes like they need to answer some questions</p>}
        </div>

        {featuredProfile.pictures.length >= 3 ?
          <img src={featuredProfile.pictures[2]} alt={featuredProfile.first_name}/>
          : 
          <p>Spice up your profile with some extra photos</p>
        }
        
        <div className='answer-container'>
          {featuredProfile.answers.length ?
          <>
            <p>You disagree on whether you'd rather </p>
            {disagreeAnswerText1 && <p>{disagreeAnswerText1} or {disagreeAnswerText2}</p>}
            <button onClick={() => setGetAnotherDisagreement(getAnotherDisagreement + 1)}>Get another Disagreement</button>

          </>
            :
            <p>Lookes like they need to answer some questions</p>}
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