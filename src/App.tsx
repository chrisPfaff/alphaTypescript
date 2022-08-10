import './App.scss';

import Header from './components/Header'
import React from 'react';
import { useState } from 'react';

function App() {
  fetch(`https://api.artic.edu/api/v1/artworks?page=2&limit=100`)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
