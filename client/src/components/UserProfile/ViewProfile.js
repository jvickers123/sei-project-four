import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ViewProfile = ({ user }) => {

  // STATE
  // const [answersPicked, setAnswersPicked] = useState([])
  // const [answersShown, setAnswersShown] = useState([])
  const [answerIds, setAnswerIds] = useState([])

  //GET RANDOM SELECTION OF ANSWERS 
  useEffect(() => {
    const getRandomId = () => {
      if (!user.first_name) return 
      const ans1 = () => user.answers[Math.floor(Math.random() * user.answers.length)]

      const ans2 = () => {
        const answer = user.answers[Math.floor(Math.random() * user.answers.length)]
        if (answer === ans1) {
          ans2()} else {
            return answer
          }
      }

      const ans3 = () => {
        const answer = user.answers[Math.floor(Math.random() * user.answers.length)]
        if (answer === ans1 || answer === ans2) {
          ans3()} else {
            return answer
          }
      }

      setAnswerIds({
        answer1: ans1(),
        answer2: ans2(),
        answer3: ans3()
      })
      }
    getRandomId()
  }, [user])

  // GET QUESTIONS ASOCIATED WITH ANSWERS
  useEffect(() => {

  }, [answerIds])


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
              {<p>{user.answers[Math.floor(Math.random() * user.answers.length)]}</p>}
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