import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

// Components
import SiteNavbar from './components/SiteNavbar'
import Home from './components/Home'
import Likes from './components/Likes'
import Matches from './components/Matches'
import Find from './components/Find'
import WouldYouRather from './components/WouldYouRather'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserProfile from './components/UserProfile/UserProfile'

// HELPER
import { userAuth } from './helpers/auth'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(userAuth())
  })

  const logOutState = () => setIsLoggedIn(false)
  const logInState = () => setIsLoggedIn(true)
  return (
    <ChakraProvider>
      <BrowserRouter>
        <SiteNavbar isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register logInState={logInState}/>} />
          <Route path='/login' element={<Login logInState={logInState}/>} />
          <Route path='/profile' element={<UserProfile logOutState={logOutState}/>} />
          <Route path='/find' element={<Find />} />
          <Route path='/likes' element={<Likes />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/wouldyourather' element={<WouldYouRather />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
