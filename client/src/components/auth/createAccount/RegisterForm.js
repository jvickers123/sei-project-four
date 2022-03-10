import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

// HELPERS
// import { seedRandomProfileIds } from '../../../helpers/seedRandomProfileIds'

const RegisterForm = ({ nextForm, logInState }) => {

  const toast = useToast()

  // STATE
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    likes_recieved: [],
    questions_owned: []
  })
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    likes_recieved: '',
    questions_owned: ''
  })


  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value}
    console.log(newObj)
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    try {
      // REGISTER USER
      await axios.post('/api/auth/register/', formData)
      toast({
        title: 'Registered.',
        description: "Your account is ready to be logged in.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      

      // LOG USER IN
      const { data: loginData } = await axios.post('/api/auth/login/',{ email: formData.email, password: formData.password })
      console.log(loginData)
      window.localStorage.setItem('token-birds-of-a-feather', loginData.token)
      logInState()
      toast({
        title: 'Logged in.',
        description: "Your account is ready to be logged in.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      setFormData({
        email: '',
        password: '',
        password_confirmation: '',
        likes_recieved: [],
        questions_owned: []
      })

      nextForm(1)
    } catch (error) {
      console.log(error.response.data.detail)
      setFormErrors({...formErrors, ...error.response.data.detail})
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Enter Your Email</label>
        <input type='email' name='email' value={formData.email} placeholder='email@email.com' onChange={handleChange} />
        {!!formErrors.email && <p>{formErrors.email}</p>}
        <label htmlFor='password'> Enter Your Password</label>
        <input type='password' name='password' value={formData.password} onChange={handleChange} />
        <label htmlFor='password_confirmation'> Confirm Your Password</label>
        {!!formErrors.password && <p>{formErrors.password}</p>}
        <input type='password' name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} />
        {!!formErrors.password_confirmation && <p>{formErrors.password_confirmation}</p>}
        <input type='submit' className='pink' value='Next' />
      </form>
    </>
  )
}

export default RegisterForm