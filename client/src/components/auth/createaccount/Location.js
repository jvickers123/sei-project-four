import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactMapGl, { Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import { useToast } from '@chakra-ui/react'
import { getTokenFromLocal } from '../../../helpers/auth'

// STYLING
import { MdMyLocation } from 'react-icons/md'

mapboxgl.workerClass = MapboxWorker; 


const Location = ({ nextForm, parent, closeComponent }) => {
  const toast = useToast()

  // STATE
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
  const [loadingCurrentLocation, setLoadingCurrentLocation] = useState(false)

  // GET CURRENT LOCATION
  const getCurrentLocation = () => {
    setLoadingCurrentLocation(true)
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ latitude: latitude, longitude: longitude, zoom: 10 })
      setLoadingCurrentLocation(false)
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
    

  // ADD LOCATION TO PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getTokenFromLocal()
    try {
      const { data } = await axios.put('/api/auth/profile/', userLocation, { headers: {Authorization: `Bearer ${token}` }})
      console.log(data)

      toast({
        title: 'Added location.',
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

  // SEARCH
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
    setViewPort({ latitude: clickedLocation.center[1], longitude: clickedLocation.center[0], zoom: 10 })
    setSearchValue('')
    setSearchOptions([])
  }

  return (
    <>
      <form>
        <label className='location-label' htmlFor='location'>Where do you live?</label>
        <input type='search' name='location' placeholder='enter your neighborhood' value={searchValue} onChange={handleChange}/>
      </form>

      <div className={parent === 'register' ? 'search-options-container' : 'search-options-container edit-options'}>
        {!!searchOptions.length && 
          searchOptions.map(result => (
            <div  key={result.id} className='search-options'>
              <p onClick={handleClick} name={result.text} id={result.id} data={result.center}>{result.place_name}</p>
            </div>
          ))  
        }
      </div>
      

      {!!userLocation.longitude && <p className='location-text'>{userLocation.location}</p>}
      
      <div className='map-container'>
        <ReactMapGl
          {...viewPort}
          onMove={e => setViewPort(e.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          {!!userLocation.longitude && 
            <Popup closeOnMove={false} closeOnClick={false} latitude={userLocation.latitude} longitude={userLocation.longitude} anchor='bottom'>
              {userLocation.location}
            </Popup>}
        </ReactMapGl>
      </div>

      {loadingCurrentLocation ?
        <button className='current-location-btn' onClick={getCurrentLocation} >loading...</button>
        :
        <button className='current-location-btn' onClick={getCurrentLocation} ><MdMyLocation /> Use CurrentLocation</button>
        }
      <button className='pink' onClick={handleSubmit} >{parent === 'register' ? 'Next' : 'update'}</button>
      {parent === 'register' && <button className='location-previous' onClick={() => nextForm(-1)} >Previous</button>}
    </>
    
  )
}

export default Location