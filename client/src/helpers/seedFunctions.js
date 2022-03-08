import axios from 'axios'
import React, { useState, useEffect } from 'react'

const SeedUsersAnswerAllQuestions = () => {

  const [randomAnswersArray, setRandomAnswersArray] = useState([])
  const [profileId, setProfileId] = useState(4)
  const [updateDone, setUpdateDone] = useState(0)

  useEffect(() => {
    const randomArray = []
    for (let i = 1; i <= 29; i++) {
      randomArray.push(i * 2 - (Math.round(Math.random())))
    }
    console.log(randomArray)
    setRandomAnswersArray(randomArray)
  }, [profileId])

  useEffect(() => {
    const addAnswersToSeeds = async () => {
      try {
        const { data } = await axios.put(`/api/auth/profiles/${profileId}/`, { answers: randomAnswersArray })
        console.log(data)
        setUpdateDone(updateDone + 1)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    addAnswersToSeeds()
  }, [randomAnswersArray])

  useEffect(() => {
    if(!updateDone) return
    if(updateDone >= 14) return
    setProfileId(profileId + 1)
  }, [updateDone])
  
  return <h2>seeding answers</h2>
}

export default SeedUsersAnswerAllQuestions