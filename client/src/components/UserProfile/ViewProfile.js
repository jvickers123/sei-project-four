import React, { useState, useEffect } from 'react'
import axios from 'axios'

// STYLING
import { Image, Box, HStack } from '@chakra-ui/react'


// ICONS
import { AiOutlineHome } from "react-icons/ai"
import { BiCake } from "react-icons/bi"

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
    if(user.answers.length <= 1) return
    const options = user.answers.filter(id => id !== answer1)
    console.log(options)
    setAnswer2(options[Math.floor(Math.random() * options.length)])
  }, [answer1])

  // GET THIRD USER ANSWER
  useEffect(() => {
    if (!user.first_name) return
    if(user.answers.length <= 2) return
    const options = user.answers.filter(id => id !== answer1 && id !== answer2)
    console.log(options)
    setAnswer3(options[Math.floor(Math.random() * options.length)])
  }, [answer2])

  // GET ANSWER TEXT
  useEffect(() => {
    if(!answer1) return
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
    if(!answer2) return
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
    if(!answer3) return
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
    if(!answer1) return
    if (answer1 % 2 === 0) setAlternativeAnswer1(answer1 - 1)
    if (answer1 % 2 === 1) setAlternativeAnswer1(answer1 + 1)
  }, [answer1])

  useEffect(() => {
    if(!answer2) return
    if (answer2 % 2 === 0) setAlternativeAnswer2(answer2 - 1)
    if (answer2 % 2 === 1) setAlternativeAnswer2(answer2 + 1)
  }, [answer2])

  useEffect(() => {
    if(!answer3) return
    if (answer3 % 2 === 0) setAlternativeAnswer3(answer3 - 1)
    if (answer3 % 2 === 1) setAlternativeAnswer3(answer3 + 1)
  }, [answer3])

  // GET ALTERNATIVE ANSWER TEXT
  useEffect(() => {
    if(!alternativeAnswer1) return
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
    if(!alternativeAnswer2) return
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
    if(!alternativeAnswer3) return
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/answers/${alternativeAnswer3}`)
        setAltAnsText3(data.text)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getAnswer()
  }, [alternativeAnswer3])

  return (
    <>
      {user.id ? 
        <>
          <div className='image-container'>
            {user.profile_pic ?
              <Image src={user.profile_pic} alt={user.first_name} objectFit='cover' marginTop={55} borderRadius={7} boxSize='360px'/>
              :
              <p>Spice up your profile with a profile pic</p>
            }
          </div>
          

          <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
            {user.answers.length ?
            <>
              <p>I'd rather </p>
              {altAnsText1 && <h3>{ansText1} than {altAnsText1}</h3>}

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


          {user.pictures.length ?
            <Image src={user.pictures[0]} alt={user.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
            :
            <p>Spice up your profile with some extra photos</p>}

          {user.pictures.length >= 2 ?
          <Image src={user.pictures[1]} alt={user.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
            :
            <p>Spice up your profile with some extra photos</p>}
          
          <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
            {user.answers.length > 1 ?
            <>
              <p>I'd rather </p>
              {altAnsText2 && <h3>{ansText2} than {altAnsText2}</h3>}
            </>
              :
              <p>Lookes like you need to answer some questions</p>}
          </Box>
          {user.pictures.length >= 3 ?
            <Image src={user.pictures[2]} alt={user.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='360px'/>
            : 
            <p>Spice up your profile with some extra photos</p>
          }
          
          <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
            {user.answers.length > 2 ?
            <>
              <p>I'd rather </p>
              {altAnsText3 && <h3>{ansText3} than {altAnsText3}</h3>}
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