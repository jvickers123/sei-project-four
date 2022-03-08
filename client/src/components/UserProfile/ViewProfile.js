import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ViewProfile = ({ user }) => {

  // STATE
  const [answer1, setAnswer1] = useState(null)
  const [answer2, setAnswer2] = useState(null)
  const [answer3, setAnswer3] = useState(null)

  const [ansText1, setAnsText1] = useState('')
  const [ansText2, setAnsText2] = useState('')
  const [ansText3, setAnsText3] = useState('')

  const [alternativeAnswer1, setAlternativeAnswer1] = useState(null)
  const [alternativeAnswer2, setAlternativeAnswer2] = useState(null)
  const [alternativeAnswer3, setAlternativeAnswer3] = useState(null)

  const [altAnsText1, setAltAnsText1] = useState('')
  const [altAnsText2, setAltAnsText2] = useState('')
  const [altAnsText3, setAltAnsText3] = useState('')



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

  // GET THIRD USER ANSWER
  useEffect(() => {
    if (!user.first_name) return
    if(user.answers.length < 2) return
    const options = user.answers.filter(id => id !== answer1 && id !== answer2)
    console.log(options)
    setAnswer3(options[Math.floor(Math.random() * options.length)])
  }, [answer2])

  // GET ANSWER TEXT
  useEffect(() => {
    const getText = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${answer1}`)
        setAnsText1(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getText()
  }, [answer1])

  useEffect(() => {
    const getText = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${answer2}`)
        setAnsText2(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getText()
  }, [answer2])

  useEffect(() => {
    const getText = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${answer3}`)
        setAnsText3(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getText()
  }, [answer3])

  // GET ALTERNATIVE ANSWERS
  useEffect(() => {
    if (answer1 % 2 === 0) setAlternativeAnswer1(answer1 - 1)
    if (answer1 % 2 === 1) setAlternativeAnswer1(answer1 + 1)
  }, [answer1])

  useEffect(() => {
    if (answer2 % 2 === 0) setAlternativeAnswer2(answer2 - 1)
    if (answer2 % 2 === 1) setAlternativeAnswer2(answer2 + 1)
  }, [answer2])

  useEffect(() => {
    if (answer3 % 2 === 0) setAlternativeAnswer3(answer3 - 1)
    if (answer3 % 2 === 1) setAlternativeAnswer3(answer3 + 1)
  }, [answer3])

  // GET ALTERNATIVE ANSWER TEXT
  useEffect(() => {
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${alternativeAnswer1}`)
        setAltAnsText1(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getAnswer()
  }, [alternativeAnswer1])

  useEffect(() => {
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${alternativeAnswer2}`)
        setAltAnsText2(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getAnswer()
  }, [alternativeAnswer2])

  useEffect(() => {
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${alternativeAnswer3}`)
        setAltAnsText3(data.text)
      } catch (error) {
        console.log(error)
      }
    }
    getAnswer()
  }, [alternativeAnswer3])

  return (
    <>
      {user.first_name ? 
        <>
          <img src={user.profile_pic} alt={user.first_name} />

          <div className='answer-container'>
            {user.answers.length ?
            <>
              <p>I'd rather </p>
              {altAnsText1 && <p>{ansText1} than {altAnsText1}</p>}

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
              {altAnsText2 && <p>{ansText2} than {altAnsText2}</p>}
            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          </div>

          <img src={user.pictures[3]} alt={user.first_name}/>
          
          <div className='answer-container'>
            {user.answers.length > 2 ?
            <>
              <p>I'd rather </p>
              {altAnsText3 && <p>{ansText3} than {altAnsText3}</p>}
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