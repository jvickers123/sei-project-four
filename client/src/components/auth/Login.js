import React, {useState} from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

// STYLING
import { Heading } from '@chakra-ui/react'

const Login = ({ logInState }) => {

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
      logInState()
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
    <div className='form-main'>
      {/* <Heading as='h1' size='2xl'>Sign in</Heading> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Enter your email</label>
        <input type='email' name='email' value={loginInfo.email} placeholder='email@email.com' onChange={handleChange} />
        {!!error && <p>{error}</p>}
        <label htmlFor='password'>Enter your password</label>
        <input type='password' name='password' value={loginInfo.password} onChange={handleChange} />
        <input class='pink' type='submit' value='Sign in' />
      </form>
    </div>
  )
}

export default Login