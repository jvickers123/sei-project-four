import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

// HELPERS
import { getTokenFromLocal } from '../../helpers/auth'

// STYLING
import { Heading, Image, Box, HStack, Spinner } from '@chakra-ui/react'

// ICONS
import { AiOutlineHome } from "react-icons/ai"
import { BiCake } from "react-icons/bi"

const OthersProfile = ({ profileId }) => {
  const navigate = useNavigate()
  
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
    if(!disagreeAnswers.length) return
    setMatchRating(parseInt((matchingAnswers.length / (disagreeAnswers.length + matchingAnswers.length)) * 100))
  }, [disagreeAnswers])

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
        <div className='main-user-profile-header'>
          <header className='profile-header'>
            <Heading as='h1' size='md'>{featuredProfile.first_name}</Heading>
          </header>
        </div>
        
        <div className='image-container'>
          {featuredProfile.profile_pic ?
            <Image src={featuredProfile.profile_pic} alt={featuredProfile.first_name} objectFit='cover' marginTop={55} borderRadius={7} boxSize='360px'/>
            :
            <p>No profile image for them yet</p>
          }

        </div>
        

        <Box className='match-rating-container text-container' width='360px' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
          <p>Match Rating</p> 
          {matchRating ?
            <>
              <h3 id='match-rating'>{matchRating}%</h3>
              <p className='faint'>You answered {matchingAnswers.length} questions the same and {disagreeAnswers.length} differently</p>
            </>
            :
            <p className='faint'>Answer more would you rather questions to get a rating</p>
          }
          
          
          </Box>

        <Box className='info-container' margin={5} borderRadius={7} paddingTop={7} paddingBottom={7} paddingLeft={5} minW='360px' paddingRight={5}>
          <HStack className='inside-info-container' marginBottom={5}>
            <AiOutlineHome />
            <p>{featuredProfile.location}</p>
          </HStack>
          <HStack className='inside-info-container'>
            <BiCake />
            <p>{featuredProfile.age}</p>
          </HStack>
        </Box>

        {featuredProfile.pictures.length ?
          <Image src={featuredProfile.pictures[0]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
          :
          <p>Looks like they need some more photos</p>}

        {featuredProfile.pictures.length >= 2 ?
        <Image src={featuredProfile.pictures[1]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
          :
          <p>Looks like they need some more photos</p>}
        
        <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
          {featuredProfile.answers.length ?
          <>
            {matchAnsText ?
              <>
                <p>You'd both rather </p>
                <h3>{matchAnsText} than {altMatchAnsText}</h3>
                <button className='pink' onClick={() => setGetAnotherMatch(getAnotherMatch + 1)}>Get another Match</button>
              </> 
              : 
              <>
                <p>Looks like you agree on nothing </p>
                <p>Answer some more would you rathers and see if this is still the case</p>
                <button  onClick={() => navigate('/wouldyourather')}>Answer more Would You Rathers</button>
              </>
            }
          </>
            :
            <p>Lookes like they need to answer some questions</p>}
        </Box>

        {featuredProfile.pictures.length >= 3 &&
          <Image src={featuredProfile.pictures[2]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>}
        
        <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
          {featuredProfile.answers.length ?
          <>
            {disagreeAnswerText1 ? 
              <>
                <p>You disagree on whether you'd rather </p>
                <h3>{disagreeAnswerText1} or {disagreeAnswerText2}</h3>
                <button className='pink' onClick={() => setGetAnotherDisagreement(getAnotherDisagreement + 1)}>Get another Disagreement</button>
              </>
              :
              <>
                <p>You don't disagree on anything</p>
                <p>Probably a sign you need to answer more questions</p>
                <button onClick={() => navigate('/wouldyourather')}>Answer more Would You Rathers</button>
              </>
              }

          </>
            :
            <p>Lookes like they need to answer some questions</p>}
        </Box>

        {featuredProfile.pictures.length >= 4 &&
          <Image src={featuredProfile.pictures[3]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>}
        
        {featuredProfile.pictures.length >= 5 &&
          <Image src={featuredProfile.pictures[4]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>}
        
      </>
        :
        <Spinner />}
    </>
  )
}

export default OthersProfile