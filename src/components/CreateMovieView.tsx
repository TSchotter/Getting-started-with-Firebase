import React, {useState} from 'react';
import {collection, addDoc, deleteDoc, getDocs, query, doc} from "firebase/firestore";
import {db} from "../firebase-config";
import movie from "../models/movie";

// MovieController.tsx
async function createMovie(movie : movie){
    await addDoc(collection(db, 'movies'), {
              name: movie.name,
              genre: movie.genre
            });
  }
  
  

  function CreateMovieView(){
    const [movieName, setMovieName] = useState<string>("");
    const [movieGenre, setMovieGenre] = useState<string>("");
  
    return (
      <div>
        <div className="movieNameBox">
            Movie Name: <input id="movieNameInput" 
                value={movieName} 
                onChange={e=>setMovieName(e.target.value)}
                data-testid="movie-name-input"></input>
            <br></br>
            Movie Genre: <input id="movieGenreInput" 
                value={movieGenre} 
                onChange={e=>setMovieGenre(e.target.value)}
                data-testid="movie-genre-input"></input>
        </div>
        <button onClick={()=>{
            createMovie({genre: movieGenre, name: movieName });
        }}>Send to DB</button>
      </div> 
    )
  }
  export default CreateMovieView;