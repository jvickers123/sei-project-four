import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

// Components
import SiteNavbar from './components/SiteNavbar'
import Home from './components/Home'
import Likes from './components/Likes'
import Matches from './components/Matches'
import OtherProfile from './components/OtherProfile'
import WouldYouRather from './components/WouldYouRather'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Name from './components/auth/createAccount/Name'
import Age from './components/auth/createAccount/Age'
import Pictures from './components/auth/createAccount/Pictures'
import Location from './components/auth/createAccount/Location'
import UserProfile from './components/UserProfile/UserProfile'
// import EditProfile from './components/UserProfile/EditProfile'
// import ViewProfile from './components/UserProfile/ViewProfile'


function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/') // * <-- replace with your endpoint
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
      
    }
    getData()
  }, [])

  return (
    <ChakraProvider>
      <BrowserRouter>
        <SiteNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register/name' element={<Name />} />
          <Route path='/register/age' element={<Age />} />
          <Route path='/register/location' element={<Location />} />
          <Route path='/register/pictures' element={<Pictures />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<UserProfile />} />
          {/* <Route path='/profile/view' element={<ViewProfile />} />
          <Route path='/profile/edit' element={<EditProfile />} /> */}
          <Route path='/profile/:userId' element={<OtherProfile />} />
          <Route path='/likes' element={<Likes />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/wouldyourather' element={<WouldYouRather />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
