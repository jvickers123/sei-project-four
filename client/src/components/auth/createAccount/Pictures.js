import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

// subcomponents
import ImageUploadField from '../../subComponents/ImageUploadField'
import { getTokenFromLocal } from '../../../helpers/auth'
import SeedImages from '../../subComponents/SeedImages'

const Pictures = ({ nextForm, logInState }) => {

  const toast = useToast()
  const navigate = useNavigate()

  // STATE
  const [userImages, setUserImages] = useState({
    profile_pic: '',
    pictures: []
  })
  const [pictures, setPictures] = useState({
    pic2: '',
    pic3: '',
    pic4: '',
    pic5: '',
    pic6: ''
  })

  
  // SET URLS TO STATE
  const handleImageUrl = (name, url) => {
    if (name === 'profile_pic') { 
      setUserImages({...userImages, [name]: url})
    } else {
      setPictures({...pictures, [name]: url})
    }
  }

  // SET PICTURES ARRAY TO STATE
  useEffect(() => {
      const urlArray = Object.values(pictures)
      const notBlankArray = urlArray.filter(url => url !== '')
      setUserImages({ ...userImages, pictures: notBlankArray})
  }, [pictures])

  // ADD PHOTOS TO USER
  useEffect(() => {
    const uploadData = async () => {
      const token = getTokenFromLocal()
      if (!userImages.profile_pic && !userImages.pictures.length) {
        return
      }
      try {
        await axios.put('/api/auth/profile/', userImages, { headers: {Authorization: `Bearer ${token}` }})
        toast({
          title: 'Added image.',
          description: `Added image to profile.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    uploadData()
  }, [userImages])

  const handleCreateAccount = () => {
    logInState()
    navigate('/profile')
  }

  // SEED RANDOM PHOTOS FOR USER
  const uploadSeeds = (photosArray) => {
    console.log('happening', photosArray)
    setUserImages({
      profile_pic: photosArray[0],
      pictures: photosArray.slice(1)
    })
  }

  return (
    <>
      <SeedImages uploadSeeds={uploadSeeds}/>
      <form>
        <label className='location-label'>Pick your photos</label>
      </form>

      <div className='register-profile-pic-container'>
        <p className='faint'>My Profile Pic</p>
        <div className='profile-upload-container'>
          <ImageUploadField name='profile_pic' handleImageUrl={handleImageUrl} url={userImages.profile_pic}/>
        </div>
      </div>

      <p className='faint'>My Photos</p>
      <div className='upload-images-container-register'>
        <ImageUploadField name='pic2' handleImageUrl={handleImageUrl} url={userImages.pictures[0]}/>
        <ImageUploadField name='pic3' handleImageUrl={handleImageUrl} url={userImages.pictures[1]}/>
        <ImageUploadField name='pic4' handleImageUrl={handleImageUrl} url={userImages.pictures[2]}/>
        <ImageUploadField name='pic5' handleImageUrl={handleImageUrl} url={userImages.pictures[3]}/>
        <ImageUploadField name='pic6' handleImageUrl={handleImageUrl} url={userImages.pictures[4]}/>
      </div>

      <button className='pink' onClick={handleCreateAccount }>Create account</button>
      <button className='location-previous' onClick={() => nextForm(-1)}>Previous</button>

    </>
    
    
  )
}

export default Pictures