import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';

const App: React.FC = () => {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<HomePage/>} /> 
      </Routes> 
    </Router>
  );
}

export default App;
