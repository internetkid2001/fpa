import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import ProjectSetupPage from './pages/ProjectSetupPage';
import PreProductionBoardPage from './pages/PreProductionBoardPage';

function App() {
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

  // The toggleTheme function can remain if you plan to reintroduce a proper toggle button component later
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
      {/* Basic Navigation */}
      <nav className="bg-gray-200 dark:bg-gray-700 p-2 text-center">
        <Link to="/" className="p-2 text-indigo-600 dark:text-indigo-300 hover:underline">Project Setup</Link>
        <Link to="/board" className="p-2 text-indigo-600 dark:text-indigo-300 hover:underline">Board</Link>
        {/* The theme toggle button that was here has been removed */}
      </nav>

      <Routes>
        <Route path="/" element={<ProjectSetupPage />} />
        <Route path="/board" element={<PreProductionBoardPage />} />
      </Routes>
    </>
  );
}

export default App;