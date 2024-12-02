import { useState } from 'react';

export function useShopNavigation() {
  const [currentTab, setCurrentTab] = useState('market'); // 'market', 'skindrop', 'sales'
  
  return {
    currentTab,
    setCurrentTab
  };
}
