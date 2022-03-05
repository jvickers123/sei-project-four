import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

// auth
import { getTokenFromLocal } from '../../../helpers/auth'

const Age = ({ nextForm, userId }) => {
  const toast = useToast()

  // state
  const [formData, setFormData] = useState({ dateOfBirth: null })
  const [formError, setFormError] = useState('')

  // functions
  const handleChange = (e) => {
    setFormData({ dateOfBirth: e.target.value })
    console.log(e.target.value, typeof e.target.value)
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getTokenFromLocal()
    console.log('submitting')
    // calculate age
    const dateOfBirthArray = formData.dateOfBirth.split('-').map(num => parseInt(num))
    const currentDate = new Date()
    // if they've not had brithday this year
    let userAge
    if(dateOfBirthArray[1] > currentDate.getMonth() + 1 || (dateOfBirthArray[1] === currentDate.getMonth() + 1 && dateOfBirthArray[2] > currentDate.getDate())) {
      userAge = currentDate.getFullYear() - dateOfBirthArray[0] - 1
    } else {
      userAge = currentDate.getFullYear() - dateOfBirthArray[0]
    }
    try {
      const { data } = await axios.put(`/api/auth/profile/${userId}/`,{ age: userAge }, { headers: {Authorization: `Bearer ${token}` }})
      console.log(data)

      toast({
        title: 'Age added.',
        description: `Added age ${userAge} to profile.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
      setFormData({ age: null})

      nextForm(1)
    } catch (error) {
      console.log(error.response.data.detail)
      setFormError(error.response.data.detail)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='dateOfBirth'>What's your date of birth?</label>
      <input type='date' name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange}/>
      <input type='submit' value='next' />
      <input type='button' value='previous' onClick={() => nextForm(-1)}/>
    </form>
  )
}

export default Age