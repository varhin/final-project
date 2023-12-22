import React, { useState } from "react";
import DataTable from "react-data-table-component";

const Table = ({columns,data}) => {
  
  const [searchGenre, setSearchGenre] = useState("");
  const [tableData, setTableData] = useState(data);
  const [movieId, setMovieId] = useState("");

  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    comment: "",
    postername: "",
    ratings: "",
});

  const handleGenreChange = (event) => { 
    setSearchGenre(event.target.value) 
  };

  const handleGenreSearch =()=>{
    const newRecords = tableData.filter((row)=> row.genre.toLowerCase()==searchGenre.toLowerCase())
      setTableData(newRecords);   
  }

  const handleMovieIdChange = (event) => { 
    setMovieId(event.target.value) 
  };

  const handleMovieRetrieval =()=>{
    fetch("http://localhost:4000/api/movies/"+movieId, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      }).then((data)=>{
        setMovieData(data[0])
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  }

  const handleReload = async () => {
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
      setTableData(result);
    } catch (error) {
      console.log(error.message);
    }  
  }

  return (
    <>
    <div style={{ padding: "10px", display:"flex", flexDirection:"row", gap:"10px", alignItems:"center", justifyContent:"center"}}>
        <div className="form-group " style={{ padding: "10px"}}>
          <input type="text" name="genre" value={searchGenre} onChange={handleGenreChange} className="form-control" id="" placeholder="Search by genre...." required />
        </div>
        <div className="form-group " style={{ padding: "10px"}}>
         <button className="btn btn-primary" onClick={handleGenreSearch}>Search</button>
         </div>
         <div className="form-group " style={{ padding: "10px"}}>
         <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{borderRadius: ".5rem"}} onClick={handleReload}>Movie Detail</button>
         </div>
         <div className="form-group " style={{ padding: "10px"}}>
         <button className="btn btn-secondary" onClick={handleReload}>Reload Table Data</button>
         </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title badge bg-primary"  id="exampleModalLabel">Movie Details</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group mb-2"  style={{ padding: "10px" }}>
                        <input  name="movieId" value={movieId} onChange={handleMovieIdChange} type="text" className="form-control" placeholder="Enter movie Id..."/>
                    </div>
                    <div className="form-group mb-2"  style={{ padding: "10px" }}>
                        <input  name="postername" value={movieData.postername} readOnly type="text" className="form-control" placeholder="Poster's name"/>
                    </div>
                    <div className="form-group mb-2"  style={{ padding: "10px" }}>
                        <input  name="title" value={movieData.title} readOnly type="text" className="form-control" placeholder="Title"/>
                    </div>
                    <div className="form-group mb-2"  style={{ padding: "10px" }}>
                        <input  name="genre" readOnly value={movieData.genre} type="text" className="form-control" placeholder="Genre"/>
                    </div>
                    <div className="form-group" style={{ padding: "10px" }}>
                      <input type="text" readOnly value={movieData.ratings} name="ratings" className="form-control" id="" placeholder="Ratings" />
                    </div>
                    <div className="form-group" style={{ padding: "10px" }}>
                      <textarea rows={4} cols={50} readOnly value={movieData.comment} name="comment" className="form-control" id="" placeholder="Comments..." />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleMovieRetrieval} >View Details</button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <DataTable className="table table-striped" columns={columns} data={tableData} fixedHeader pagination></DataTable>
    </>
   
  );
};

export default Table;