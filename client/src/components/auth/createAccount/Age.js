import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import Picker from 'react-mobile-picker-scroll'

// helpers
import { getTokenFromLocal } from '../../../helpers/auth'
import { getDateArray, getYearsArray } from '../../../helpers/getDates'

const Age = ({ nextForm, parent, closeComponent }) => {
  const toast = useToast()
  const datesArray = getDateArray()
  const yearsArray = getYearsArray()

  // State
  const [valueGroups, setValueGroups] = useState({
    date: '15',
    month: 'March',
    year: '2001'
  })

  // scroll options
  const optionGroups = {
    date: datesArray,
    month: ['January ', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    year: yearsArray
  }

  const handleChange = (name, value) => {
    console.log(name, value)
    setValueGroups({ ...valueGroups, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getTokenFromLocal()
    
    // calculate age
    const currentDate = new Date()
    const monthIndex = optionGroups.month.indexOf(valueGroups.month)

    // if they've not had brithday this year
    let userAge
    if(monthIndex > currentDate.getMonth() || (monthIndex === currentDate.getMonth() && valueGroups.date > currentDate.getDate())) {
      userAge = currentDate.getFullYear() - parseInt(valueGroups.year) - 1
    } else {
      userAge = currentDate.getFullYear() - parseInt(valueGroups.year)
    }

    try {
      const { data } = await axios.put('/api/auth/profile/',{ age: userAge }, { headers: {Authorization: `Bearer ${token}` }})
      console.log(data)

      toast({
        title: 'Age added.',
        description: `Added age ${userAge} to profile.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
      setValueGroups({
        date: '15',
        month: 'March',
        year: '2001'
      })

      parent === 'register' ? nextForm(1) : closeComponent('age')
    } catch (error) {
      console.log(error.response.data.detail)
      // setFormError(error.response.data.detail)
    }
  }


  

  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Picker valueGroups={valueGroups} optionGroups={optionGroups} onChange={handleChange}/>
        <input type='submit' value={parent === 'register' ? 'Next' : 'Update'} />
        {parent === 'register' && <input type='button' value='previous' onClick={() => nextForm(-1)}/>}
      </form>
    </>
  
  )
}

export default Age