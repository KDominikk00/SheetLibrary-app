import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import NoPage from './pages/NoPage'
import Library from './components/Library'
import { useEffect, useState } from 'react'

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("http://localhost:8080/sheet");
        const json = await result.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<Home data={data}/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/library" element={<Library data={data} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>  
  )
}

export default App
