import React, { useState } from 'react';
import SearchUsers from './components/SearchUsers';
import UsersList from './components/UsersList';
import TradeOffers from './components/TradeOffers';
import { MOCK_USERS } from './constants/users';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Intercambio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { t } = useTranslation();
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
    <div className="trade-page-wrapper mt-48">
      <div className="trade-page-container">
        <div className="trade-content">
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
                  <span className="whitespace-nowrap">{t('trade.pending')}</span>
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
    </div>
  );
};

export default Intercambio;
