import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css'
import Home from './components/Home'
import Header from './components/Header';
import Form from './components/Form';

function App() {

  const [movies, setMovies] = useState([]);
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
        setMovies(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Header /><br />
      <div style={{ padding: "10px", display:"flex", flexDirection:"row", gap:"10px", alignItems:"center", justifyContent:"center"}}>
        <div className="form-group " style={{ padding: "10px"}}>
          <input type="text" name="genre" className="form-control" id="" placeholder="Search by genre...." required />
        </div>
        <div className="form-group " style={{ padding: "10px"}}>
          <input type="text" name="title" className="form-control" id="" placeholder="Search by title...." required />
        </div>
      </div>
      <div className="container" style={{ width: "100vw", display: "flex", flexDirection: "row", rowGap: 10 }}>
        <div className="container" style={{ width: "30vw", marginRight: "20px" }}>
          <Form />
        </div>
        <div className="right" style={{ width: "70vw", marginLeft: "10px" }}>
          <Home movies={movies} />
        </div>
      </div>
    </>
  )
}

export default App
