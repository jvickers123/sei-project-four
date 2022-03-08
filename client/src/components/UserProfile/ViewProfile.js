import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ViewProfile = ({ user }) => {

  // STATE
  // const [answersPicked, setAnswersPicked] = useState([])
  // const [answersShown, setAnswersShown] = useState([])
  // const [answerIds, setAnswerIds] = useState({
  //   answer1: null,
  //   answer2: null,
  //   answer3: null
  // })
  // const [questions, setQuestions] = useState(null)
  // const [alternativeAnswers, setAlternativeAnswers] = useState([])
  const [answer1, setAnswer1] = useState(null)
  const [answer2, setAnswer2] = useState(null)
  const [answer3, setAnswer3] = useState(null)

  // GET FIRST USER ANSWER
  useEffect(() => {
    if (!user.first_name) return
    if(!user.answers.length) return
    console.log('getting first answer')
    setAnswer1(user.answers[Math.floor(Math.random() * user.answers.length)])
  }, [user])

  // GET SECOND USER ANSWER
  useEffect(() => {
    if (!user.first_name) return
    if(user.answers.length < 1) return
    const options = user.answers.filter(id => id !== answer1)
    console.log(options)
    setAnswer2(options[Math.floor(Math.random() * options.length)])
  }, [answer1])

  useEffect(() => {
    if (!user.first_name) return
    if(user.answers.length < 2) return
    const options = user.answers.filter(id => id !== answer1 && id !== answer2)
    console.log(options)
    setAnswer3(options[Math.floor(Math.random() * options.length)])
  }, [answer2])

  //GET RANDOM SELECTION OF ANSWERS 
  // useEffect(() => {

  //   const getRandomId = () => {
  //     if (!user.first_name) return 
  //     let ans1
  //     let ans2
  //     let ans3
  //     const getAns1 = () => {
  //       ans1 = user.answers[Math.floor(Math.random() * user.answers.length)]
  //     }

  //     const getAns2 = () => {
  //       const answer = user.answers[Math.floor(Math.random() * user.answers.length)]
  //       if (answer === ans1) {
  //         ans2()} else {
  //           ans2 = answer
  //         }
  //     }

  //     const getAns3 = () => {
  //       const answer = user.answers[Math.floor(Math.random() * user.answers.length)]
  //       if (answer === ans1 || answer === ans2) {
  //         ans3()} else {
  //           ans3 = answer
  //         }
  //     }
  //     getAns1()
  //     getAns2()
  //     getAns3()
  //     setAnswerIds({
  //       answer1: ans1,
  //       answer2: ans2,
  //       answer3: ans3
  //     })
  //     }
  //   getRandomId()
  // }, [user])

  // useEffect(() => {
  //   const getAlternativeAnswers = async () => {
  //     if (!user.first_name) return
      
  //     try {
        
  //     } catch (error) {
        
  //     }
  //   }
  //   getAlternativeAnswers()
  // }, [answerIds])

  // GET QUESTIONS ASOCIATED WITH ANSWERS
  // useEffect(() => {
  //   const getQuestions = async () => {
  //     const questions = []
  //     try {
  //       const { data } = await axios.get('/api/')
  //     } catch (error) {
        
  //     }
      
  //   }
  // }, [answerIds])


  return (
    <>
      {user.first_name ? 
        <>
          <img src={user.profile_pic} alt={user.first_name} />

          <div className='answer-container'>
            {user.answers.length ?
            <>
              <p>I'd rather </p>
              {/* {answersShown.length ? <p>{answersShown[0]}</p> : <p>loading...</p>} */}
            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          </div>

          <div className='profile-info-container'>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.city}</p>
            <p>Age: {user.age}</p>
          </div>
          
          <img src={user.pictures[0]} alt={user.first_name}/>
          <img src={user.pictures[1]} alt={user.first_name}/>
          
          <div className='answer-container'>
            {user.answers.length > 1 ?
            <>
              <p>I'd rather </p>
              {/* {<p>{user.answers[Math.floor(Math.random() * user.answers.length)]}</p>} */}
            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          </div>

          <img src={user.pictures[3]} alt={user.first_name}/>
          
          <div className='answer-container'>
            {user.answers.length > 2 ?
            <>
              <p>I'd rather </p>
              {/* {answersShown.length ? <p>{answersShown[1]}</p> : <p>loading...</p>} */}
            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          </div>

          <img src={user.pictures[4]} alt={user.first_name}/>
          <img src={user.pictures[5]} alt={user.first_name}/>
          
        </>
        :
        <p>Loading</p>}
    </>
  )
}

export default ViewProfile