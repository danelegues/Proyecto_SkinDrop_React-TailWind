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
import Perfil from './Pestañas/Perfil';
import './i18next.config';
import { AuthProvider } from './components/Auth/AuthContext';
import BoxOpening from './Pestañas/AperturaCaja';
import { BalanceProvider } from './components/shared/BalanceContext';
import AdminPanel from './components/AdminPanel/AdminPanel';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <AuthProvider>
      <BalanceProvider>
      <Router>
        <div className="min-h-screen bg-[#222] text-white">
          <Navbar />
          
          <Routes>
            <Route path="/" element={
              <>
                <HomePage></HomePage>
              </>
            } />
            
            <Route path="/tienda" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/inventario" element={<Inventory />} />
            <Route path="/intercambio" element={<Intercambio />} />
            <Route path="/box-opening" element={<BoxOpening />} />
            <Route path="/adminPanel" element={<AdminPanel />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
      </BalanceProvider>
    </AuthProvider>
  );
}

export default App;
