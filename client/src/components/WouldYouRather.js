import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { getTokenFromLocal } from '../helpers/auth'

const WouldYouRather = () => {
  // state
  const [question, setQuestion] = useState(null)
  const [user, setUser] = useState(null)
  const [answeredAllQuestions, setAnsweredAllQuestions] = useState(false)
  const [userAnswered, setUserAnswered] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const token = getTokenFromLocal()
      try {
        const { data } = await axios.get('/api/auth/profile', { headers: {Authorization: `Bearer ${token}` }})
        console.log(data)
        setUser(data)
        setUserAnswered(data.answers)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const getQuestsionId = async () => {
      try {
        const {data: allQuestionsData} = await axios.get('/api/questions')
        const numOfQusetions = allQuestionsData.length

        // check if user has answered all the questions
        if (userAnswered.length >= allQuestionsData.length) {
          setAnsweredAllQuestions(true)
          return
        }

        // check wich questions have been answered
        const randomQuestionId = async () => {
          const randomId = Math.ceil(Math.random() * numOfQusetions)
          if (userAnswered.some(answerId => Math.ceil(answerId / 2) === randomId)) {
            console.log('do it again', randomId)
            randomQuestionId()
          } else {
            try {
              console.log(randomId)
              const { data: singleQdata } = await axios.get(`/api/questions/${randomId}`)
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
  }, [user, userAnswered])


  const chooseAnswer = (e) => {
    setUserAnswered([...userAnswered, e.target.id])
  }

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
        // setQuestion(null)
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    addAnsweredToUser()
  }, [userAnswered])
    
  return (
    <>
      <h1>WouldYouRather...</h1>
      {answeredAllQuestions ? 
        <p>you have answered all the questions</p>
        :
        !!question &&
          <>
            <h2>{question.text}</h2>
            <button id={question.answers[0].id} onClick={chooseAnswer}>{question.answers[0].text}</button>
            <button id={question.answers[1].id} onClick={chooseAnswer}>{question.answers[1].text}</button>
          </>}
    </>
    
  )
}

export default WouldYouRather