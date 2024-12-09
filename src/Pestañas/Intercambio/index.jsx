import React, { useState } from 'react';
import SearchUsers from './components/SearchUsers';
import UsersList from './components/UsersList';
import TradeOffers from './components/TradeOffers';
import { MOCK_USERS } from './constants/users';

const Intercambio = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const handleSearch = (searchTerm) => {
    setIsLoading(true);
    setTimeout(() => {
      const results = MOCK_USERS.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#222]">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
        {showOffers ? (
          <TradeOffers onBack={() => setShowOffers(false)} />
        ) : (
          <>
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto space-y-2 sm:space-y-3">
              <SearchUsers onSearch={handleSearch} />
              
              <button
                onClick={() => setShowOffers(true)}
                className="w-full sm:w-auto bg-[#2a2a2a] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#3a3a3a] transition-all flex items-center justify-center gap-2 mx-auto -mt-2 text-sm sm:text-base"
              >
                <i className="fas fa-exchange-alt"></i>
                <span className="whitespace-nowrap">Ver ofertas pendientes</span>
              </button>
            </div>

            <div className="mt-4 sm:mt-6 md:mt-8">
              <UsersList 
                users={searchResults} 
                isLoading={isLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Intercambio;
