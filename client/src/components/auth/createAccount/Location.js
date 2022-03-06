import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactMapGl from 'react-map-gl'
import { useToast } from '@chakra-ui/react'
import { getTokenFromLocal } from '../../../helpers/auth'

const Location = ({ nextForm, userId }) => {
  const toast = useToast()
  // state
  const [viewPort, setViewPort] = useState({
    latitude: 10,
    longitude: -0.1,
    zoom: 8
  })
  const [currentLocation, setCurrentLocation] = useState({
    longitude: null,
    latitude: null
  })
  const [userLocation, setUserLocation] = useState({
    location: '',
    longitude: null,
    latitude: null
  })

  // get current location
  const getCurrentLocation = () => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ ...viewPort, latitude: latitude, longitude: longitude })
    })
  }

  useEffect(() => {
    const getCurrentCity = async () => {
      try {
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocation.longitude},${currentLocation.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`)
        setUserLocation({ 
          location: data.features[0].context[1].text,
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude
        })
      } catch (error) {
        console.log(error)
      }
    }
    getCurrentCity()
  }, [currentLocation])
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getTokenFromLocal()
    try {
      const { data } = await axios.put(`/api/auth/profile/${userId}/`, userLocation, { headers: {Authorization: `Bearer ${token}` }})
      console.log(data)

      toast({
        title: 'Added name.',
        description: `Added ${userLocation.location} to profile.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
      setUserLocation({
        location: '',
        longitude: null,
        latitude: null
      })

      nextForm(1)
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
  return (
    <>
      {!!userLocation.location.length && <p>{userLocation.location}</p>}
      <ReactMapGl
        {...viewPort}
        onMove={e => setViewPort(e.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    ></ReactMapGl>
    <button onClick={getCurrentLocation} >Use CurrentLocation</button>
    <button onClick={() => nextForm(-1)} >Previous</button>
    <button onClick={handleSubmit} >Next</button>
    </>
    
  )
}

export default Location