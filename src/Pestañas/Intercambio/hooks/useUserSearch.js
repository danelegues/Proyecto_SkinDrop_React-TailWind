import { useState } from 'react';
import { MOCK_USERS } from '../constants/users';

export const useUserSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const searchUsers = (searchTerm) => {
    setIsLoading(true);
    
    // Simulamos una llamada a la API
    setTimeout(() => {
      const results = MOCK_USERS.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const selectUser = (userId) => {
    const user = MOCK_USERS.find(u => u.id === userId);
    setSelectedUser(user);
  };

  return {
    searchResults,
    isLoading,
    selectedUser,
    searchUsers,
    selectUser
  };
};
