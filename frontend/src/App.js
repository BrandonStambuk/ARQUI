import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ImageSection from './components/ImageSection';
import About from './components/About';
import Plant from './components/Plant';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/plant" element={<Plant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;