import React, { useState } from 'react'
import axios from 'axios'



const ImageUploadField = ({ handleImageUrl, url, name }) => {

  // CLOUDINARY
  const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  // STATE
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // UPLOAD PHOTO
  const handleUpload = async (e) => {
    setIsLoading(true)
    try {
      const userData = new FormData()
      userData.append('file', e.target.files[0])
      userData.append('upload_preset', uploadPreset)
      const { data } = await axios.post(uploadUrl, userData)
      handleImageUrl(name, data.url)
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      setIsError(true)
    }
  }  

  return (
    <>
      <label>{name}</label>
      <input className='input' type='file' onChange={handleUpload}/>
      {url ?
        <div>
          <img src={url} alt={name}/>
        </div>
        : isLoading ?
          <p>loading...</p>
          : isError &&
            <p>There was an error. Please try another file</p>
      }
    </>
  )
}

export default ImageUploadField