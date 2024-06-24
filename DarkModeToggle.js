import React, { useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="dark-mode-toggle">
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Aydınlık Modu' : 'Karanlık Modu'}
      </button>
    </div>
  );
}

export default DarkModeToggle;
