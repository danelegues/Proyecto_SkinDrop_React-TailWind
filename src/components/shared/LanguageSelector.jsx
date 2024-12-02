import React, { useState } from 'react';

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState('es');
  
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <div className="relative inline-block text-left">
      <select
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
        className="bg-transparent text-white border border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-orange-500"
      >
        {languages.map(lang => (
          <option 
            key={lang.code} 
            value={lang.code}
            className="bg-[#1a1a1a] text-white"
          >
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
