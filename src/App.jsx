import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import MainContent from './components/home/MainContent';
import Footer from './components/layout/Footer';
import LeftPanel from './components/home/LeftPanel';
import RightPanel from './components/home/RightPanel';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#222] text-white">
        <Navbar />
        <Hero />
        
        <div className="container mx-auto px-2 py-8">
          <div className="flex flex-col lg:flex-row gap-4 min-h-[800px]">
            <div className="lg:w-[300px] xl:w-[350px] h-full">
              <LeftPanel />
            </div>
            <div className="flex-1">
              <MainContent />
            </div>
            <div className="lg:w-[300px] xl:w-[350px] h-full">
              <RightPanel />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
