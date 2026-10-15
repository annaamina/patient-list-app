import React from 'react';
import './App.css';
import ProtectedComponent from './components/ProtectedComponent';

function App() {
  return (
    <div className="app-container">
      <ProtectedComponent />
    </div>
  );
}

export default App;