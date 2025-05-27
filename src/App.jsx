// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import ProjectSetupPage from './pages/ProjectSetupPage';
import PreProductionBoardPage from './pages/PreProductionBoardPage';
import StoryboardPage from './pages/StoryboardPage'; // Import the new StoryboardPage

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

  // toggleTheme function can be used later if a global theme toggle button is re-added
  const toggleTheme = () => {
    console.log('toggleTheme function called. Current theme before toggle:', theme);
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('setTheme callback. Previous theme:', prevTheme, 'New theme:', newTheme);
      return newTheme;
    });
  };

  return (
    <Routes>
      {/* Routes that use the common Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ProjectSetupPage />} /> {/* Default page for "/" */}
        <Route path="board" element={<PreProductionBoardPage />} />
        <Route path="storyboard" element={<StoryboardPage />} /> {/* Route for StoryboardPage */}
        {/* Example for a "Not Found" page (you'll need to create NotFoundPage.jsx)
        <Route path="*" element={<NotFoundPage />} /> 
        */}
      </Route>

      {/* You could define other top-level routes here that don't use the Layout, if needed */}
    </Routes>
  );
}

export default App;