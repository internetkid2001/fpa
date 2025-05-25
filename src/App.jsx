import React, { useState, useEffect } from 'react';
import ProjectSetupPage from './pages/ProjectSetupPage';

function App() {
  console.log('App component rendered'); // Log when App renders

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
    console.log('useEffect triggered. Current theme:', theme); // Log when effect runs
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Added "dark" class to html element');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed "dark" class from html element');
    }
    localStorage.setItem('theme', theme); // Still saves the determined theme
    console.log('Saved theme to localStorage:', theme);
  }, [theme]);

  // The toggleTheme function is no longer called by a button,
  // but we can leave it here if we plan to reintroduce a toggle later.
  // Or remove it if you want to clean up.
  const toggleTheme = () => {
    console.log('toggleTheme function called. Current theme before toggle:', theme);
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('setTheme callback. Previous theme:', prevTheme, 'New theme:', newTheme);
      return newTheme;
    });
  };

  return (
    <>
      {/* The button container and button have been removed from here */}
      <ProjectSetupPage />
    </>
  );
}

export default App;