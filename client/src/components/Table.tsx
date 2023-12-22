import React, { useState } from "react";
import DataTable from "react-data-table-component";

const Table = ({columns,data}) => {
  const [searchGenre, setSearchGenre] = useState("");
  const [tableData, setTableData] = useState(data);

  const handleGenreChange = (event) => { 
    setSearchGenre(event.target.value) 
  };

  const handleGenreSearch =()=>{
    const newRecords = tableData.filter((row)=> row.genre.toLowerCase()==searchGenre.toLowerCase())
      setTableData(newRecords);
      
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
         <button className="btn btn-secondary" onClick={handleReload}>Reload</button>
         </div>
      </div>
      <DataTable className="table table-striped" columns={columns} data={tableData} fixedHeader pagination></DataTable>
    </>
   
  );
};

export default Table;