import React, { useState, useEffect } from 'react';
// import ProjectSetupPage from './pages/ProjectSetupPage'; // Comment out or remove
import PreProductionBoardPage from './pages/PreProductionBoardPage'; // Import the new page

function App() {
  // ... (all your existing theme logic from App.jsx should remain unchanged)
  console.log('App component rendered');

  const [theme, setTheme] = useState(() => {
    console.log('Initializing theme state...');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      console.log('Found saved theme in localStorage:', savedTheme);
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('Using OS preference: dark');
      return 'dark';
    }
    console.log('Defaulting to light theme');
    return 'light';
  });

  useEffect(() => {
    console.log('useEffect triggered. Current theme:', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Added "dark" class to html element');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed "dark" class from html element');
    }
    localStorage.setItem('theme', theme);
    console.log('Saved theme to localStorage:', theme);
  }, [theme]);

  const toggleTheme = () => {
    // This function is not currently used by any UI element but can remain
    console.log('toggleTheme function called. Current theme before toggle:', theme);
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('setTheme callback. Previous theme:', prevTheme, 'New theme:', newTheme);
      return newTheme;
    });
  };

  return (
    <>
      {/* Render the PreProductionBoardPage */}
      <PreProductionBoardPage />
    </>
  );
}

export default App;