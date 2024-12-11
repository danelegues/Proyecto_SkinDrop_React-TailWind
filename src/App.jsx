import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import MainContent from './components/home/MainContent';
import Footer from './components/layout/Footer';
import LeftPanel from './components/home/LeftPanel';
import RightPanel from './components/home/RightPanel';
import Shop from './Pestañas/Tienda';
import Inventory from './Pestañas/Inventario';
import Intercambio from './Pestañas/Intercambio';
import Register from './Pestañas/Register';
import Login from './Pestañas/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#222] text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="ml-2 mr-2 py-8">
                <div className="flex flex-col lg:flex-row gap-2 min-h-[900px]">
                  <div className="lg:w-[250px] xl:w-[300px] h-full">
                    <LeftPanel />
                  </div>
                  <div className="flex-1">
                    <MainContent />
                  </div>
                  <div className="lg:w-[250px] xl:w-[300px] h-full">
                    <RightPanel />
                  </div>
                </div>
              </div>
            </>
          } />
          
          <Route path="/tienda" element={<Shop />} />
          <Route path="/intercambio" element={<Intercambio />} />
          <Route path="/inventario" element={<Inventory />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
