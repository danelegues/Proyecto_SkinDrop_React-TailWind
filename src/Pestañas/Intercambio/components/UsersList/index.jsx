import React, { useState } from 'react';
import UserInventory from '../UserInventory';
import TradeOffer from '../TradeOffer';

const UsersList = ({ users, isLoading }) => {
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
        Buscando usuarios...
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {users.map(user => (
            <div key={user.id} 
                 className="bg-[#1a1a1a] rounded-lg p-6 flex items-center justify-between hover:bg-[#2a2a2a] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <i className="fas fa-user text-gray-600 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">{user.username}</h3>
                  <p className="text-gray-400">{user.totalItems} items en inventario</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  className="bg-[#2a2a2a] text-white px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-all"
                  onClick={() => setSelectedUser(user)}
                >
                  Ver Inventario
                </button>
                <button 
                  className="bg-[#ff6b00] text-white px-6 py-3 rounded-lg hover:bg-[#ff8533] transition-all"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowTradeOffer(true);
                  }}
                >
                  Hacer Oferta
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
    </>
  );
};

export default UsersList;
