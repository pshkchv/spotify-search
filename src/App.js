import React from 'react';
import { SpotifySearch } from './components/SpotifySearch/SpotifySearch';
import './App.css';

function App() {
  return (
    <div className="appContainer">
      <header className="header">
        <h1>Spotify Search</h1>
      </header>
      
      <main>
        <SpotifySearch />
      </main>
      
      <footer className="footer">
        <p>Developed by Paul</p>
      </footer>
    </div>
  );
}

export default App;
