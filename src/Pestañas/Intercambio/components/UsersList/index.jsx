import React from 'react';

const UsersList = ({ users, isLoading, onSelectUser, selectedUser }) => {
  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b00] mx-auto mb-4"></div>
        Buscando usuarios...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
        No se encontraron usuarios
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {users.map(user => (
          <div key={user.id} 
               className={`bg-[#1a1a1a] rounded-lg p-6 flex items-center justify-between hover:bg-[#2a2a2a] transition-all
                         ${selectedUser?.id === user.id ? 'border-2 border-[#ff6b00]' : ''}`}>
            <div className="flex items-center gap-4">
              <img 
                src={user.avatarUrl} 
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover bg-[#2a2a2a]"
                onError={(e) => e.target.src = '/img/default-avatar.png'}
              />
              <div>
                <h3 className="text-white text-xl font-bold">{user.username}</h3>
                <p className="text-gray-400">{user.totalItems} items en inventario</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                className="bg-[#2a2a2a] text-white px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-all"
                onClick={() => onSelectUser(user.id)}
              >
                Ver Inventario
              </button>
              <button 
                className="bg-[#ff6b00] text-white px-6 py-3 rounded-lg hover:bg-[#ff8533] transition-all"
                onClick={() => console.log('Hacer oferta a', user.username)}
              >
                Hacer Oferta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
