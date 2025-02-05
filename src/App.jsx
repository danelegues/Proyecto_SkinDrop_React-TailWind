import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import MainContent from './components/home/MainContent';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Footer from './components/layout/Footer';
import Shop from './Pestañas/Tienda';
import Inventory from './Pestañas/Inventario';
import Intercambio from './Pestañas/Intercambio';
import Register from './Pestañas/Register';
import Login from './Pestañas/Login';
import Perfil from './Pestañas/Perfil';
import './i18next.config';
import { AuthProvider } from './components/Auth/AuthContext';
import BoxOpening from './Pestañas/AperturaCaja';


function App() {
  return (
    <AuthProvider>
      
      <Router>
        <div className="min-h-screen bg-[#222] text-white">
          <Navbar />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                
                <div className="ml-2 mr-2 py-8">
                  <div className="flex flex-col lg:flex-row gap-2 min-h-[900px]">
                      <MainContent />
                  </div>
                </div>
                
              </>
            } />
            
            <Route path="/adminPanel" element={<AdminPanel />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/inventario" element={<Inventory />} />
            <Route path="/intercambio" element={<Intercambio />} />
            <Route path="/box-opening" element={<BoxOpening />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
      
    </AuthProvider>
  );
}

export default App;
