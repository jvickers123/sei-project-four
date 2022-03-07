import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactMapGl, { Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useToast } from '@chakra-ui/react'
import { getTokenFromLocal } from '../../../helpers/auth'

const Location = ({ nextForm, parent, closeComponent }) => {
  const toast = useToast()
  // state
  const [viewPort, setViewPort] = useState({
    latitude: 51.5,
    longitude: -0.118,
    zoom: 10
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
  const [searchValue, setSearchValue] = useState('')
  const [searchOptions, setSearchOptions] = useState([])

  // get current location
  const getCurrentLocation = () => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ latitude: latitude, longitude: longitude, zoom: 10 })
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
      const { data } = await axios.put('/api/auth/profile/', userLocation, { headers: {Authorization: `Bearer ${token}` }})
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

      parent === 'register' ? nextForm(1) : closeComponent('location')
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }

  const handleChange = async (e) => {
    setSearchValue(e.target.value)
    console.log(searchValue)
  }

  useEffect(() => {
    const search = async () => {
      try {
        const { data } =  await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`)
        setSearchOptions(data.features)
      } catch (error) {
        console.log(error)
      }
    }
    search()
  }, [searchValue])

  const handleClick = (e) => {
    const clickedLocation = searchOptions[searchOptions.findIndex(result => result.id === e.target.id)]
    console.log(clickedLocation)
    setUserLocation({
      location: clickedLocation.text,
      longitude: clickedLocation.center[0],
      latitude: clickedLocation.center[1]
    })
    // setCurrentLocation({ longitude: clickedLocation.center[0], latitude: clickedLocation.center[1] })
    setViewPort({ latitude: clickedLocation.center[1], longitude: clickedLocation.center[0], zoom: 10 })
    setSearchValue('')
    setSearchOptions([])
  }
  return (
    <>
      <form>
        <input type='search' placeholder='enter your neighborhood' value={searchValue} onChange={handleChange}/>
      </form>
      {!!searchOptions.length && 
        searchOptions.map(result => (
          <div  key={result.id} >
            <p onClick={handleClick} name={result.text} id={result.id} data={result.center}>{result.place_name}</p>
          </div>
        ))  
      }

      {!!currentLocation.longitude && <p>{userLocation.location}</p>}
      <div className='map-container'>
        <ReactMapGl
          {...viewPort}
          onMove={e => setViewPort(e.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          {!!currentLocation.longitude && 
            <Popup closeOnMove={false} closeOnClick={false} latitude={userLocation.latitude} longitude={userLocation.longitude} anchor='bottom'>
              {userLocation.location}
            </Popup>}
        </ReactMapGl>
      </div>
      
      <button onClick={getCurrentLocation} >Use CurrentLocation</button>
      {parent === 'register' && <button onClick={() => nextForm(-1)} >Previous</button>}
      <button onClick={handleSubmit} >{parent === 'register' ? 'Next' : 'update'}</button>
    </>
    
  )
}

export default Location