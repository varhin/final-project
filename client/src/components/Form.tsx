import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


const Form = () => {

    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        comment: "",
        postername: "",
        ratings: 0,
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:4000/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        setFormData({
            title: "",
            genre: "",
            comment: "",
            postername: "",
            ratings: 0,
        });
    };


    const handleDataChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <form action='' onSubmit={handleSubmit}>
            <legend>Post a movie</legend>
            <div className="form-group " style={{ padding: "10px" }}>
                <input type="text" value={formData.postername}
                    onChange={handleDataChange} name="postername" className="form-control" id="" placeholder="Enter your name..." required />
            </div>
            <div className="form-group " style={{ padding: "10px" }}>
                <input type="text" value={formData.title}
                    onChange={handleDataChange} name="title" className="form-control" id="" placeholder="Enter movie title..." required />
            </div>
            <div className="form-group" style={{ padding: "10px" }}>

                <input type="text" value={formData.genre}
                    onChange={handleDataChange} name="genre" className="form-control" id="" placeholder="Enter movie genre..." required />
            </div>
            <div className="form-group" style={{ padding: "10px" }}>

                <input type="number" value={formData.ratings}
                    onChange={handleDataChange} name="ratings" className="form-control" id="" placeholder="Rate this movie" min="1" max="10" required />
            </div>
            <div className="form-group" style={{ padding: "10px" }}>

                <textarea rows={4} cols={50} value={formData.comment}
                    onChange={handleDataChange} name="comment" className="form-control" id="" placeholder="Comment on the movie..." required />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" style={{ padding: "10px", width: "90%" }} />
        </form>
    )
};

export default Form


