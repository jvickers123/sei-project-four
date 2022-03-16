import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// STYLING
import { Image, Box, HStack } from '@chakra-ui/react'


// ICONS
import { AiOutlineHome } from "react-icons/ai"
import { BiCake } from "react-icons/bi"

const ViewProfile = ({ user }) => {

  // STATE
  const [randomAnswers, setRandomAnswers] = useState([])
  const [alternateAnswersText, setAlternateAnswersText] = useState([])

  // GET RANDOM ANSWERS
  useEffect(() => {
    if(!user.answers.length) return

    const answersArray = []
    
    const getRandomAnswer = () => {
    const randomAnswer = answersArray.push(user.answers[Math.floor(Math.random() * user.answers.length)])
    if (answersArray.includes(randomAnswer)) {
      getRandomAnswer()
    } else {
      if (typeof randomAnswer === 'number') return
      answersArray.push(randomAnswer)
    }
  }

  for (let i = 0; i < 3; i++) {
    getRandomAnswer()
  }
  setRandomAnswers(answersArray)
  }, [user])

  // GET ALTERNATE ANSWER
  useEffect(() => {
    if (!randomAnswers.length) return
    const alternateAnswers = randomAnswers.map((answer, i) => {
      return answer.question.answers.filter(answer => answer.id !== randomAnswers[i].id)[0].text
    })
    setAlternateAnswersText(alternateAnswers)
  }, [randomAnswers])

  return (
    <>
      {user.id ? 
        <>
          <div className='image-container'>
            {user.profile_pic ?
              <Image id='profile-pic' src={user.profile_pic} alt={user.first_name} objectFit='cover' marginTop={55} borderRadius={7} boxSize='360px'/>
              :
              <div className='empty-photo-container'><p className='faint'>Spice up your profile with a profile pic</p></div>
            }
          </div>
          

          <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
            {user.answers.length ?
            <>
              <p>I'd rather </p>
              {randomAnswers.length && <h3>{randomAnswers[0].text} than {alternateAnswersText[0]}</h3>}

            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          </Box>

          <Box className='info-container' margin={5} borderRadius={7} paddingTop={7} paddingBottom={7} paddingLeft={5} minW='360px' paddingRight={5}>
            <HStack className='inside-info-container' marginBottom={5}>
                <AiOutlineHome />
                <p>{user.location}</p>
              </HStack>
              <HStack className='inside-info-container'>
                <BiCake />
                <p>{user.age}</p>
              </HStack>
          </Box>


          {!!user.pictures.length &&
            <Image src={user.pictures[0]} alt={user.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
          }

          {user.pictures.length >= 2 ?
          <Image src={user.pictures[1]} alt={user.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
            :
            <div className='empty-photo-container'><p className='faint'>Spice up your profile with some extra photos</p></div>}
          
          <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
            {user.answers.length > 1 ?
            <>
              <p>I'd rather </p>
              {randomAnswers.length && <h3>{randomAnswers[1].text} than {alternateAnswersText[1]}</h3>}

            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          
          </Box>
          
          {user.pictures.length >= 3 ?
            <Image src={user.pictures[2]} alt={user.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
            : 
            <div className='empty-photo-container'><p className='faint'>Spice up your profile with some extra photos</p></div>
          }
          
          <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
            {user.answers.length > 2 ?
            <>
              <p>I'd rather </p>
              {randomAnswers.length && <h3>{randomAnswers[2].text} than {alternateAnswersText[2]}</h3>}

            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          </Box>

          {user.pictures.length >= 4 &&
            <Image src={user.pictures[3]} alt={user.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>}
          
          {user.pictures.length >= 5 &&
            <Image src={user.pictures[4]} alt={user.first_name} objectFit='cover' marginTop={5} marginBottom={55} borderRadius={7} boxSize='360px'/>}
          
        </>
        :
        <p>Loading</p>}
    </>
  )
}

export default ViewProfile