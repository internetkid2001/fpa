// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Make sure useNavigate is imported
import Layout from './components/Layout';
import ProjectSetupPage from './pages/ProjectSetupPage';
import PreProductionBoardPage from './pages/PreProductionBoardPage';
import StoryboardPage from './pages/StoryboardPage';

function App() {
  // ... (theme state and logic)
  const [theme, setTheme] = useState(/* ... */);
  useEffect(() => { /* ... theme effect ... */ }, [theme]);

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // 1. Ensure navigate is initialized here

  const handleAddProject = (projectTitle) => {
    const newProject = {
      id: `proj-${Date.now()}`, 
      title: projectTitle,
    };
    setProjects(prevProjects => {
      const updatedProjects = [...prevProjects, newProject];
      console.log('Projects:', updatedProjects); 
      return updatedProjects;
    });
    
    // 2. Ensure this line is present, uncommented, and called
    console.log(`Navigating to /board/${newProject.id}`); // Add this log
    navigate(`/board/${newProject.id}`); 
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProjectSetupPage onAddProject={handleAddProject} />} />
        <Route path="board/:projectId" element={<PreProductionBoardPage />} />
        <Route path="storyboard" element={<StoryboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;