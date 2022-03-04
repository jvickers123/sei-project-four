import React, { useEffect } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/questions/') // * <-- replace with your endpoint
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
      
    }
    getData()
  }, [])

  return <h1>Hello World</h1>
}

export default App
