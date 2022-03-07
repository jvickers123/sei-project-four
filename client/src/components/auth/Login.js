import React, {useState} from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const toast = useToast()

  //SET TOKEN TO LOCAL STORAGE
  const setTokenFromLocal = (token) => {
    window.localStorage.setItem('token-birds-of-a-feather', token)
  }

  //STATE
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  // LOG USER IN
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', loginInfo)
      setTokenFromLocal(data.token)
      navigate('/profile')
    } catch (error) {
      setError(error.response.data.detail)
      toast({
        title: 'Error',
        description: "Failed to login.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleChange = (e) => {
    const newObj = { ...loginInfo, [e.target.name]: e.target.value }
    setLoginInfo(newObj)
    setError('')
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Enter your email</label>
        <input type='email' name='email' value={loginInfo.email} placeholder='email@email.com' onChange={handleChange} />
        {!!error && <p>{error}</p>}
        <label htmlFor='password'>Enter your password</label>
        <input type='password' name='password' value={loginInfo.password} onChange={handleChange} />
        <input type='submit' value='Sign in' />
      </form>
    </>
  )
}

export default Login