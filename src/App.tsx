import React from 'react';
import './App.css';

import {auth, db} from "./firebase-config";
import {collection } from "firebase/firestore";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';

function DatabaseContainer(){
  const [value, loading, error] = useCollection(collection(db, 'test_collection'));

  return (
  <div className="DatabaseInfo">
    {value? <div>
      {value.docs.map((obj) => (
        <div>
          {JSON.stringify(obj.data())}
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
        <DatabaseContainer></DatabaseContainer>
    </div>
  );
}

export default App;
