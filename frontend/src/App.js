import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ImageSection from './components/ImageSection';
import About from './components/About';
import Plant from './components/Plant';
import Login from './components/Login';
import RegisterPlant from './components/RegisterPlant';
import Table from './components/Table';
import Types from './components/Types';
import EditPlant from './components/EditPlant';
import CarouselComponent from './components/Carrousel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarrouselPlant from './components/CarrouselPlant';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/plant" element={<Plant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPlant />} />
          <Route path="/table" element={<Table/>} />
          <Route path="/types" element={<Types/>} />
          <Route path="/editPlant/:id" element={<EditPlant />} />
          <Route path="/CarrouselPlant/" element={<CarrouselPlant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;