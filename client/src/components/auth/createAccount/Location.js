import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'


const Location = ({ nextForm }) => {

  // state
  const [viewPort, setViewPort] = useState({
    latitude: 10,
    longitude: -0.1,
    zoom: 8
  })
  const [currentLocation, setCurrentLocation] = useState(null)

  // get current location
  const getCurrentLocation = async () => {
    let latitude
    let longitude
      window.navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude
      longitude = position.coords.longitude
      })
      
      try {
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`)
        console.log(data)
      } catch (error) {
        console.log(error)
      }

      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ latitude: latitude, longitude: longitude })
    }


  return (
    <>
      <ReactMapGl
        {...viewPort}
        onMove={e => setViewPort(e.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    ></ReactMapGl>
    <button onClick={getCurrentLocation} >Use CurrentLocation</button>
    <button onClick={() => nextForm(-1)} >Previous</button>
    </>
    
  )
}

export default Location