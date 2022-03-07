import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

// auth
import { getTokenFromLocal } from '../../../helpers/auth'

const Name = ({ nextForm, parent, closeComponent }) => {

  const toast = useToast()

  // STATE
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: ""
  })

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: ""
  })


  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value}
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  // UPDATE USER INFO
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getTokenFromLocal()
    try {
      const { data } = await axios.put('/api/auth/profile/', formData, { headers: {Authorization: `Bearer ${token}` }})
      console.log(data)

      toast({
        title: 'Added name.',
        description: `Added ${formData.first_name} ${formData.last_name} to profile.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
      setFormData({
        first_name: "",
        last_name: ""
      })

      parent === 'register' ? nextForm(1) : closeComponent('name')
    } catch (error) {
      console.log(error.response.data.detail)
      setFormErrors({...formErrors, ...error.response.data.detail})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <label htmlFor='first_name'>First Name</label>
      <input type='first_name' name='first_name' placeholder='First name (required)' value={formData.first_name} onChange={handleChange} />
      {!!formErrors.first_name && <p>{formErrors.first_name}</p>}
      
      <label htmlFor='last_name'>Last Name</label>
      <input type='last_name' name='last_name' placeholder='Last name' value={formData.last_name} onChange={handleChange} />
      {!!formErrors.last_name && <p>{formErrors.last_name}</p>}
      
      <input type='submit' value={parent === 'register' ? 'Next' : 'Update'} />
      {parent === 'register' && <input type='button' value='previous' onClick={() => nextForm(-1)}/>}
    
    </form>
  )
}

export default Name