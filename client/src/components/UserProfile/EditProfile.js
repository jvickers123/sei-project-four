import axios from 'axios'
import React, { useState, useEffect } from 'react'

// subcomponents
import ImageUploadField from '../subComponents/ImageUploadField'
import { getTokenFromLocal } from '../../helpers/auth'
import Name from '../auth/createAccount/Name'
import Location from '../auth/createAccount/Location'
import Age from '../auth/createAccount/Age'

const EditProfile = ({ user, updateUser }) => {

  // State 
  const [userPictures, setUserPictures] = useState({
    profile_pic: '',
    pictures: []
  })
  const [isEditing, setIsEditing] = useState({
    location: false
  })

  // const [formData]

  // ADD/REMOVE PHOTOS FUNCTIONS
  const removePicture = (index) => {
    userPictures.pictures.splice(index, 1)
    setUserPictures({ ...userPictures })
  }

  const handleImageUrl = (name, url) => {
    if (name === 'profile_pic') { 
      setUserPictures({...userPictures, [name]: url})
    } else {
      setUserPictures({...userPictures, [name]: [...userPictures.pictures, url]})
    }
  }

  useEffect(() => {
    const postPicture = async () => {
      const token = getTokenFromLocal()
      try {
        await axios.put('/api/auth/profile/', userPictures, { headers: {Authorization: `Bearer ${token}` }})
        updateUser()
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    postPicture()
  }, [userPictures])

  const closeComponent = (component) => {
    setIsEditing({...isEditing, [component]: false})
  } 

  return (
    <>
      <h2>Edit Profile</h2>
      {!!user.profile_pic &&
        <img src={user.profile_pic} alt={user.first_name} />}
        <ImageUploadField name='profile_pic' handleImageUrl={handleImageUrl} url={''}/>
      <p>My Photo's & Videos</p>
      {!!user.pictures.length && 
        user.pictures.map((url, i) => (
          <div key={i} className='edit-photos-container'>
            <button onClick={() => removePicture(i)}>X</button>
            <img src={url} alt={user.first_name + i} />
            </div>
        ))}
        {user.pictures.length < 5 &&
          <ImageUploadField name='pictures' handleImageUrl={handleImageUrl} url={''}/>}

      <p>My info</p>
      {!!user.first_name && <p>{user.first_name + user.last_name}</p>}
      {!!user.location && <p onClick={() => setIsEditing({...isEditing, location: true})}>{user.location}</p>}
      {!!isEditing.location && <Location parent='profile' closeComponent={closeComponent}/>}
      {!!user.age && <p>{user.age}</p>}
        
      
    </>

  )
}

export default EditProfile