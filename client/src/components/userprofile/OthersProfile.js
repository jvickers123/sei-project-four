import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

// STYLING
import { Heading, Image, Box, HStack, Spinner } from '@chakra-ui/react'

// ICONS
import { AiOutlineHome } from "react-icons/ai"
import { BiCake } from "react-icons/bi"

const OthersProfile = ({ profileId, currentUser }) => {
  const navigate = useNavigate()
  
  // STATE
  const [featuredProfile, setFeaturedProfile] = useState({})

  const [matchingAnswers, setMatchingAnswers] = useState([])
  const [alternateAnswerText, setAlternateAnswerText] = useState('')
  const [randomMatchingAns, setRandomMatchingAns] = useState({})
  const [getAnotherMatch, setGetAnotherMatch] = useState(0)

  const [disagreeAnswers, setDisagreeAnsewrs] = useState([])
  const [randomDisagreeAns, setRandomDisagreeAns] = useState({})
  const [getAnotherDisagreement, setGetAnotherDisagreement] = useState(0)

  const [matchRating, setMatchRating] = useState(null)


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


  // GET MATCHING ANSWERS
  useEffect(() => {
    if(!featuredProfile.id) return
    if(!featuredProfile.answers.length) return
    if(!currentUser.answers.length) return
    const featuredProfileAnsIds = featuredProfile.answers.map(ans => ans.id)
    const matchingAns = currentUser.answers.filter(answer => featuredProfileAnsIds.includes(answer.id))
    setMatchingAnswers(matchingAns)
  }, [featuredProfile])

  // GET RANDOM MATCHING ANSWER
  useEffect(() => {
    if (!matchingAnswers.length) return
    setRandomMatchingAns(matchingAnswers[Math.floor(Math.random() * matchingAnswers.length)])
  }, [matchingAnswers, getAnotherMatch])

  // GET ALTERNATE ANSWERS TEXT
  useEffect(() => {
    if (!randomMatchingAns.id) return
    const alternateAnswer = randomMatchingAns.question.answers.filter(answer => answer.id !== randomMatchingAns.id)
    setAlternateAnswerText(alternateAnswer[0].text)
  }, [randomMatchingAns])

  // GET DISAGREEMENTS
  useEffect(() => {
    if(!featuredProfile.id) return
    if(!featuredProfile.answers.length) return
    if(!currentUser.answers.length) return
    
    //GET ARRAY OF FEATURED PROFILE [ANSWER.ID, QUESTION.ID] 
    const featuredProfileQAndAIds = featuredProfile.answers.map(ans => [ans.id, ans.question.id])

    // RETURN ANSWERS WHERE THE ANSWER.ID DOESN'T MATCH BUT THE QUESTION.ID DOES
    const disagreeAns = currentUser.answers.filter(answer => featuredProfileQAndAIds.some(featuredProfileQandA => (
      (featuredProfileQandA[0] !== answer.id) && (featuredProfileQandA[1] === answer.question.id)
    )))
    setDisagreeAnsewrs(disagreeAns)

  }, [featuredProfile, currentUser])

  // GET RANDOM DISAGREE ANSWER
  useEffect(() => {
    if (!disagreeAnswers.length) return
    setRandomDisagreeAns(disagreeAnswers[Math.floor(Math.random() * disagreeAnswers.length)])
  }, [disagreeAnswers, getAnotherDisagreement])

  // GET MATCH RATING
  useEffect(() => {
    if(!matchingAnswers.length) return
    if(!disagreeAnswers.length) return
    setMatchRating(parseInt((matchingAnswers.length / (disagreeAnswers.length + matchingAnswers.length)) * 100))
  }, [disagreeAnswers])

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
            <Image id='profile-pic' src={featuredProfile.profile_pic} alt={featuredProfile.first_name} objectFit='cover' marginTop={55} borderRadius={7} boxSize='360px'/>
            :
            <div className='empty-photo-container'><p className='faint'>No profile image for them yet</p></div>
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

        {!!featuredProfile.pictures.length &&
          <Image src={featuredProfile.pictures[0]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
          }

        {featuredProfile.pictures.length >= 2 ?
        <Image src={featuredProfile.pictures[1]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
          :
          <div className='empty-photo-container'><p className='faint'>Looks like they need some more photos</p></div>}
        
        <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
          {featuredProfile.answers.length ?
          <>
            {randomMatchingAns.id ?
              <>
                <p>You'd both rather </p>
                <h3>{randomMatchingAns.text} than {alternateAnswerText}</h3>
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

        {featuredProfile.pictures.length >= 3 ?
          <Image src={featuredProfile.pictures[2]} alt={featuredProfile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
          :
          <div className='empty-photo-container'><p className='faint'>Looks like they need some more photos</p></div>}
        
        <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
          {featuredProfile.answers.length ?
          <>
            {randomDisagreeAns.id? 
              <>
                <p>You disagree on whether you'd rather </p>
                <h3>{randomDisagreeAns.question.answers[0].text} or {randomDisagreeAns.question.answers[1].text}</h3>
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