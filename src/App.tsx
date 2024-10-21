import React, {useState} from 'react';
import './App.css';

import MovieListView from './components/MovieListView';
import CreateMovieView from './components/CreateMovieView';
import LoginButton from './components/LoginButton';


function App() {


  return (
    <div className="App">
        <LoginButton />
        <hr/>
        <CreateMovieView/>
        <hr/>
        <MovieListView/>
    </div>
  );
}

export default App;
