import React, {useState} from 'react';
import './App.css';

import {auth, db} from "./firebase-config";
import {collection, addDoc} from "firebase/firestore";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';

function CreateMovieView(){
  const [textData, setTextData] = useState<string>("");

  return (
    <div>
      <textarea value={textData} onChange={e=>setTextData(e.target.value)}></textarea>
      <button onClick={()=>{
          addDoc(collection(db, 'movies'), {
            fakeUser: "Mario",
            name: textData
          });
      }}>Send to DB</button>
    </div> 
  )
}

function MovieListView(){
  const [value, loading, error] = useCollection(collection(db, 'movies'));

  return (
  <div className="MovieListView">
    {value? <div>
      {value.docs.map((obj) => (
        <div>
          <div>fakeUser: {obj.data().fakeUser}</div>
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
