import React, { useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const RegisterForm = ({ nextForm }) => {

  const toast = useToast()
  // const navigate = useNavigate()

  // state
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

  // Functions

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value}
    console.log(newObj)
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      toast({
        title: 'Registered.',
        description: "Your account is ready to be logged in.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      // log in
      const { data } = await axios.post('/api/auth/login/',{ email: formData.email, password: formData.password })
      console.log(data)
      window.localStorage.setItem('token-birds-of-a-feather', data.token)
      

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

      // navigate('/register/name')
      nextForm(1)
    } catch (error) {
      console.log(error.response.data.detail)
      setFormErrors({...formErrors, ...error.response.data.detail})
    }
    console.log('submitting')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Enter Your Email</label>
        <input type='email' name='email' value={formData.email} onChange={handleChange} />
        {!!formErrors.email && <p>{formErrors.email}</p>}
        <label htmlFor='password'> Enter Your Password</label>
        <input type='password' name='password' value={formData.password} onChange={handleChange} />
        <label htmlFor='password_confirmation'> Confirm Your Password</label>
        {!!formErrors.password && <p>{formErrors.password}</p>}
        <input type='password' name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} />
        <input type='submit' value='Next' />
        {!!formErrors.password_confirmation && <p>{formErrors.password_confirmation}</p>}
      </form>
    </>
  )
}

export default RegisterForm