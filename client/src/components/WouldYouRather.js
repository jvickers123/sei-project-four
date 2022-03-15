import React, { useState, useEffect } from 'react'
import axios from 'axios'

// HELPERS
import { getTokenFromLocal } from '../helpers/auth'

// STYLING
import { Heading, Box, Spinner } from '@chakra-ui/react'

const WouldYouRather = () => {
  // STATE
  const [question, setQuestion] = useState(null)
  const [user, setUser] = useState(null)
  const [answeredAllQuestions, setAnsweredAllQuestions] = useState(false)
  const [userAnswered, setUserAnswered] = useState([])
  const [skippedQuestions, setSkippedQuestions] = useState([])

  // GET USER AND QUESTIONS ANSWERED ALREADY
  useEffect(() => {
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile/', { headers: {Authorization: `Bearer ${token}` }})
        setUser(data)
        const answeredIds = data.answers.map(answer => answer.id)
        setUserAnswered(answeredIds)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  // GET QUESTION
  useEffect(() => {
    if(!user) return
    const getQuestsionId = async () => {
      try {
        const {data: allQuestionsData} = await axios.get('/api/questions/')
        const numOfQusetions = allQuestionsData.length

        // CHECK IF USER ANSWERED ALL QUESTIONS
        if (userAnswered.length >= allQuestionsData.length) {
          setAnsweredAllQuestions(true)
          return
        }

        // GET RANDOM QUESTION WHICH HAS NOT ALREADY BEEN ANSWERED
        const randomQuestionId = async () => {
          const randomId = Math.ceil(Math.random() * numOfQusetions)
          if (userAnswered.some(answerId => Math.ceil(answerId / 2) === randomId) || skippedQuestions.includes(randomId)) {
            randomQuestionId()
          } else {
            try {
              const { data: singleQdata } = await axios.get(`/api/questions/${randomId}/`)
              setQuestion(singleQdata)
            } catch (error) {
              console.log(error)
            }
          }
        }
        randomQuestionId()
      } catch (error) {
        console.log(error)
        console.log(error.response.data.detail)
      }
    }
    getQuestsionId()
  }, [userAnswered, skippedQuestions])

  // ADDS ANSWER TO STATE
  const chooseAnswer = (e) => {
    setUserAnswered([...userAnswered, parseInt(e.target.id)])
  }

  // ADD ANSWER TO USER PROFILE
  useEffect(() => {
    const addAnsweredToUser = async () => {
      if (userAnswered.length === 0) {
        console.log(userAnswered.length)
        return
      }
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.put('/api/auth/profile/', { answers: userAnswered }, { headers: {Authorization: `Bearer ${token}` }})
        console.log(data)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    addAnsweredToUser()
  }, [userAnswered])

  // SKIP QUESTION
  const skipQuestion = (e) => {
    setSkippedQuestions([...skippedQuestions, parseInt(e.target.id)])
  }
    
  return (
    <div className='wyr-main'>
      <Heading as='h1' size='lg'>Would You Rather</Heading>
      {question ?
        <div className='question-answer-container'>
        {answeredAllQuestions ? 
            <p>you have answered all the questions</p>
            :
            !!question &&
              <>
                <Box className='question-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
                  <p className='faint'>Would you rather</p>
                  <h3>{question.text}</h3>
                </Box>
  
  
                <button className='pink' id={question.answers[0].id} onClick={chooseAnswer}>{question.answers[0].text}</button>
                <button className='pink' id={question.answers[1].id} onClick={chooseAnswer}>{question.answers[1].text}</button>
                <button id={question.id} className='skip-btn' onClick={skipQuestion}>Skip</button>
              </>}
        
        </div>
        :
        <Spinner />
      }
      
        
    </div>
    
  )
}

export default WouldYouRather