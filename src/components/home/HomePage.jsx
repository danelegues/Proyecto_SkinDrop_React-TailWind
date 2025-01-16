import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import LeftPanel from './LeftPanel';
import MainContent from './MainContent';
import RightPanel from './RightPanel';

const HomePage = () => {
  const [activeFilters, setActiveFilters] = useState({
    boxName: '',
    priceRange: {
      min: '',
      max: ''
    }
  });

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Main Layout */}
      <div className="flex flex-1 gap-4 px-4 lg:px-6">
        {/* Left Panel */}
        <div className="hidden lg:block w-72">
          <LeftPanel onFilterChange={handleFilterChange} />
        </div>

        <MainContent filters={activeFilters} />

        {/* Right Panel */}
        <div className="hidden lg:block w-72">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 