import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserInventory from '../UserInventory';
import TradeOffer from '../TradeOffer';

const UsersList = ({ users, isLoading }) => {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTradeOffer, setShowTradeOffer] = useState(false);

  const handleCloseAll = () => {
    setSelectedUser(null);
    setShowTradeOffer(false);
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b00] mx-auto mb-4"></div>
        {t('trade.search.loading')}
      </div>
    );
  }

  return (
    <div className="users-tabs-container">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto">
          {users.map(user => (
            <div key={user.id} 
                 className="bg-[#1a1a1a] rounded-lg p-6 flex items-center justify-between hover:bg-[#2a2a2a] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <i className="fas fa-user text-gray-600 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">{user.username}</h3>
                  <p className="text-gray-400">
                    {user.totalItems} {t('trade.userList.items')}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                  className="bg-[#2a2a2a] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg hover:bg-[#3a3a3a] transition-all text-sm sm:text-base"
                  onClick={() => setSelectedUser(user)}
                >
                  {t('trade.userList.viewInventory')}
                </button>
                <button 
                  className="bg-[#ff6b00] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg hover:bg-[#ff8533] transition-all text-sm sm:text-base"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowTradeOffer(true);
                  }}
                >
                  {t('trade.userList.makeOffer')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && !showTradeOffer && (
        <UserInventory 
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {showTradeOffer && selectedUser && (
        <TradeOffer 
          user={selectedUser}
          onClose={handleCloseAll}
        />
      )}
    </div>
  );
};

export default UsersList;
