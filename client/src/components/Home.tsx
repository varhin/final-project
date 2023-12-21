import React, { useEffect, useState } from 'react'
import Table from './Table';

const Home = ({movies}) => {

  const columns = [
    {
      name: "Movie ID",
      selector: (row) => row.movieid,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
      sortable: true,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      sortable: true,
    },
    {
      name: "Postername",
      selector: (row) => row.postername,
      sortable: true,
    },
    {
      name: "Ratings",
      selector: (row) => row.ratings,
      sortable: true,
    },
  ];
  return (
    <div className="dashboard-container">
          <Table columns={columns} data={movies} />
    </div>
  );
}

export default Home
