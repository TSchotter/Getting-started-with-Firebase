import React, {useState} from 'react';
import './App.css';

import {auth, db} from "./firebase-config";
import {collection, addDoc} from "firebase/firestore";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';

interface movie {
  user: string,
  name: string
}

// MovieController.tsx
function createMovie(movie : movie){
  addDoc(collection(db, 'movies'), {
            user: movie.user,
            name: movie.name
          });
}


function CreateMovieView(){
  const [textData, setTextData] = useState<string>("");

  return (
    <div>
      <textarea value={textData} onChange={e=>setTextData(e.target.value)}></textarea>
      <button onClick={()=>{
          createMovie({user: "Mario", name: textData });
      }}>Send to DB</button>
    </div> 
  )
}

function MovieListView(){
  const [value, loading, error] = useCollection(collection(db, 'movie'));

  return (
  <div className="MovieListView">
    {value? <div>
      {value.docs.map((obj) => (
        <div>
          <div>user: {obj.data().user}</div>
          <div>name: {obj.data().name}</div>
        </div>
      ))}
    </div>:<div>Loading Data</div>}
  </div>
  );
}

function App() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="App">
        <div className="LoginArea">
          <button onClick={() => signInWithGoogle()}>Sign In</button>
          {(user)? <div>{user.user.displayName}</div> : <div>Not Logged In</div>}
        </div>
        <hr/>
        <CreateMovieView></CreateMovieView>
        <hr/>
        <MovieListView></MovieListView>
    </div>
  );
}

export default App;
