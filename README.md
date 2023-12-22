# Movie Sharing App

## Project Overview

This project is a movie sharing app that allows users to share and explore information about the movies they have watched.

## Getting Started

These instructions will guide you on how to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Installation

 Clone the repository to your local machine
 cd client
 run npm install
 Open another terminal and navigate to the server folder:
 cd server
 run npm install

 Open the db.js file in the server folder. Replace the database connection properties with your own. Make sure to create a PostgreSQL database named movieapi.
 const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  host: 'your_host',
  database: 'movieapi',
  port: 5432,
};

In your PostgreSQL database, create a table named movies with the following columns:
movieId (primary key)
title
genre
postername (varchar)
comment (text)
ratings (int)

cd server
npm run server
cd client
npm run dev

Open the URL provided in the client terminal to start sharing your movies.




 
