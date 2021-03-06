import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

// AUTH
import { getTokenFromLocal } from '../../../helpers/auth'

// SEED HELPER
import { seedRandomProfileIds } from '../../../helpers/seedRandomProfileIds'

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

  // SEED RADOM LIKES RECIEVED
  useEffect(() => {
    const likesRecieved = seedRandomProfileIds()
    console.log(likesRecieved)
    setFormData({...formData, likes_recieved: likesRecieved })
  }, [])


  return (
    <form onSubmit={handleSubmit}>
      
      <label htmlFor='first_name'>What's your name?</label>
      <input required type='first_name' name='first_name' placeholder='First name (required)' value={formData.first_name} onChange={handleChange} />
      {!!formErrors.first_name && <p>{formErrors.first_name}</p>}
      
      <input type='last_name' name='last_name' placeholder='Last name' value={formData.last_name} onChange={handleChange} />
      {!!formErrors.last_name && <p>{formErrors.last_name}</p>}
      
      <input type='submit' className='pink' value={parent === 'register' ? 'Next' : 'Update'} />
      {parent === 'register' && <button onClick={() => nextForm(-1)}>Go back</button>}
    
    </form>
  )
}

export default Name