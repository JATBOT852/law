import React from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About/about';
import  Main from './components/Main/main';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' element={<Main />} />
       <Route path='/About' element={<About />} />
      </Routes>
    </Router>
  )
}

export default App;