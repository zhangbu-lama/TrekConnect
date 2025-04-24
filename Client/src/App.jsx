
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Routing from './Routing.jsx';
function App() {

  return (
    <>
        <Router>
        <Routes>
          <Route path="/" element={<Routing />} />
        </Routes>
        </Router>
    </>
  )
}

export default App
