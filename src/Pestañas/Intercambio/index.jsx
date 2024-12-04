import React from 'react';
import SearchUsers from './components/SearchUsers';
import UsersList from './components/UsersList';
import { useUserSearch } from './hooks/useUserSearch';

const Intercambio = () => {
  const {
    searchResults,
    isLoading,
    selectedUser,
    searchUsers,
    selectUser
  } = useUserSearch();

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <SearchUsers onSearch={searchUsers} />
      <UsersList 
        users={searchResults} 
        isLoading={isLoading}
        onSelectUser={selectUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Intercambio;
