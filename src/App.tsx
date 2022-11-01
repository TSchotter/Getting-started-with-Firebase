import React, {useState} from 'react';
import './App.css';

import {auth, db} from "./firebase-config";
import {collection, addDoc} from "firebase/firestore";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';

function AddToDatabase(){
  const [textData, setTextData] = useState<string>("");

  return (
    <div>
      <textarea value={textData} onChange={e=>setTextData(e.target.value)}></textarea>
      <button onClick={()=>{
          addDoc(collection(db, 'test_collection'), {
            fakeUser: "Mario",
            fakeData: textData
          });
      }}>Send to DB</button>
    </div> 
  )
}

function DatabaseContainer(){
  const [value, loading, error] = useCollection(collection(db, 'test_collection'));

  return (
  <div className="DatabaseInfo">
    {value? <div>
      {value.docs.map((obj) => (
        <div>
          <div>fakeUser: {obj.data().fakeUser}</div>
          <div>fakeData: {obj.data().fakeData}</div>
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
        <AddToDatabase></AddToDatabase>
        <hr/>
        <DatabaseContainer></DatabaseContainer>
    </div>
  );
}

export default App;
