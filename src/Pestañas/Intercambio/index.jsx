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
      <div className="container mx-auto px-4 py-24">
        {showOffers ? (
          <TradeOffers onBack={() => setShowOffers(false)} />
        ) : (
          <>
            <div className="max-w-2xl mx-auto space-y-1">
              <SearchUsers onSearch={handleSearch} />
              
              <button
                onClick={() => setShowOffers(true)}
                className="bg-[#2a2a2a] text-white px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-all flex items-center gap-2 mx-auto -mt-2"
              >
                <i className="fas fa-exchange-alt"></i>
                Ver ofertas pendientes
              </button>
            </div>

            <div className="mt-8">
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
