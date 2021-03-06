import React, { useState, useRef } from 'react'
import axios from 'axios'

// STYLING
import { Image, Box, VStack } from '@chakra-ui/react'

const ImageUploadField = ({ handleImageUrl, url, name }) => {

  // CLOUDINARY
  const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  // STATE
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // REF
  const inputFileRef = useRef(null)

  // UPLOAD PHOTO
  const handleUpload = async (e) => {
    setIsLoading(true)
    try {
      const userData = new FormData()
      userData.append('file', e.target.files[0])
      userData.append('upload_preset', uploadPreset)
      const { data } = await axios.post(uploadUrl, userData)
      handleImageUrl(name, data.url)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      setIsError(true)
    }
  }  

  const handleClick = () => {
    inputFileRef.current.click()
  }

  return (
    <>
      <input className='input' ref={inputFileRef} type='file' onChange={handleUpload}/>
      {url ?
            <VStack marginRight={3}>
              <Image src={url} alt={name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='100px'/>
              {isLoading ?
                <p>loading...</p>
                :
                <button className='add-image-btn pink small-btn' onClick={handleClick}>Change Photo</button>
                }
            </VStack>
            : 
            <Box className='image-upload-container' display='flex' alignItems='center' marginRight={3} marginTop={4} borderRadius={7} width='100px' height='100px'>
              {isLoading ?
                <p>loading...</p>
                : 
                <button className='add-image-btn' onClick={handleClick}>+</button>
                }
            </Box>
          }
          {isError &&
            <p>There was an error. Please try another file</p>
          }
    </>
    

  )
}

export default ImageUploadField