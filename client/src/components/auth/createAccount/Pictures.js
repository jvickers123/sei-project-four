import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

// components
import ImageUploadField from '../../subComponents/ImageUploadField'
import { getTokenFromLocal } from '../../../helpers/auth'

const Pictures = ({nextForm, userId}) => {

  const toast = useToast()
  const navigate = useNavigate()

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

  

  const handleImageUrl = (name, url) => {
    if (name === 'profile_pic') { 
      setUserImages({...userImages, [name]: url})
      console.log('hello')
    } else {
      setPictures({...pictures, [name]: url})
    }
  }

  useEffect(() => {
      const urlArray = Object.values(pictures)
      console.log(urlArray)
      const notBlankArray = urlArray.filter(url => url !== '')
      console.log('not blank array', notBlankArray)
      setUserImages({ ...userImages, pictures: notBlankArray})
  }, [pictures])

  useEffect(() => {
    const uploadData = async () => {
      const token = getTokenFromLocal()
      if (!userImages.profile_pic && !userImages.pictures.length) {
        return
      }
      try {
        console.log(userImages)
        const { data } = await axios.put('/api/auth/profile/', userImages, { headers: {Authorization: `Bearer ${token}` }})
        console.log(data)
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

  

  return (
    <>
      <h1>Pick your photos</h1>
      <ImageUploadField name='profile_pic' handleImageUrl={handleImageUrl} url={userImages.profile_pic}/>
      <ImageUploadField name='pic2' handleImageUrl={handleImageUrl} url={pictures.pic2}/>
      <ImageUploadField name='pic3' handleImageUrl={handleImageUrl} url={pictures.pic3}/>
      <ImageUploadField name='pic4' handleImageUrl={handleImageUrl} url={pictures.pic4}/>
      <ImageUploadField name='pic5' handleImageUrl={handleImageUrl} url={pictures.pic5}/>
      <ImageUploadField name='pic6' handleImageUrl={handleImageUrl} url={pictures.pic6}/>
      <button onClick={() => nextForm(-1)}>Previous</button>
      {/* <button onClick={() => nextForm(1)}>Next</button> */}
      <button onClick={() => navigate('/profile')}>Next</button>
    </>
  )
}

export default Pictures