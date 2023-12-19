const express = require('express'); 
const pool = require('./db')
const cors = require('cors');

app = express();
app.use(express.json())
app.use(cors());

const PORT = 4000



app.get('/api/movies/', async(req, res) => {
    try {
         const result = await pool.query('SELECT * FROM movies');
         if(result.rows.length > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(404).json({"message":"No resource found"})
        }    
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/api/movies/:id', async(req, res) => {
    try {
         const result = await pool.query('SELECT * FROM movies where movieid = $1',[req.params.id]);
         if(result.rows.length > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(404).json({"message":"No resource found based on the movieid provided"})
        }    
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete('/api/movies/:id', async(req, res) => {
    try {
        await pool.query('DELETE FROM movies where movieid = $1',[req.params.id]);
        const links = await pool.query('SELECT * FROM  movies');
        res.status(200).json(links.rows);  
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.put('/api/movies/:id', async(req, res) => {
    try {
        const { title, genre, comment ,postername, ratings } = req.body
        await pool.query('UPDATE movies SET title=$1, genre=$2, comment=$3, postername=$4, ratings=$4 where movieid=$6 RETURNING *',[title, genre, comment ,postername, ratings,req.params.id]); 
        const links = await pool.query('SELECT * FROM  movies');
        res.status(200).json(links.rows);
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/api/movies', async(req, res) => {
    try {
        const { title, genre, comment ,postername, ratings } = req.body
        const result = await pool.query('INSERT INTO movies(title,genre,comment,postername,ratings) values($1,$2,$3,$4,$5) RETURNING *',[title,genre,comment,postername,ratings]); 
        res.status(200).json(result.rows[0]); 
          
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });
