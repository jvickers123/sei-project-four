import React from 'react'
import axios from "axios"

const ImageUpload = ({name}) => {

  const handleUpload = async (e) => {
    const imageData = new FormData()
    imageData.append('file', e.target.files[0])
    imageData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)
    imageData.append('timestamp', Math.round(new Date().getTime() / 1000))
    imageData.append('upload_preset',process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    console.log(imageData)
    try {
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, imageData)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
    
  }
    return (
      <form>
        <label htmlFor={name}>Upload Image</label>
        <input id={name} type='file' onChange={handleUpload} />
      </form>
    )
}

export default ImageUpload
