import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import Home from './components/Home'

function App() {
  
  const [favLinks, setFavLinks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setFavLinks(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Home favLinks={favLinks}/>
    </>
  )
}

export default App
