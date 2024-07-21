import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import NoPage from './pages/NoPage'
import { useEffect, useState } from 'react'

function App() {

  const [title, setTitle] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:8080/sheet")
      result.json().then(json => {
        console.log(json)
      })
    }
    fetchData()
  })

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>  
  )
}

export default App
