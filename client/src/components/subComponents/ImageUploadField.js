import React, { useState } from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

const ImageUploadField = ({ handleImageUrl, value, name }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleUpload = async (e) => {
    setIsLoading(true)
    try {
      const userData = new FormData()
      userData.append('file', e.target.files[0])
      userData.append('upload_preset', uploadPreset)
      const { data } = await axios.post(uploadUrl, userData)
      console.log(data.url)
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
      {value ?
        <div>
          <img src={value} alt={name}/>
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