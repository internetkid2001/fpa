import React, { useState } from 'react';

// We'll expect an 'onAddProject' prop from App.jsx
function ProjectSetupPage({ onAddProject }) { 
  const [projectTitle, setProjectTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectTitle.trim()) {
      alert('Please enter a project title.'); // Basic validation
      return;
    }
    onAddProject(projectTitle); // Call the function passed from App.jsx
    setProjectTitle(''); // Clear the input field after submission
    // Later, we'll add navigation here
    alert(`Project "${projectTitle}" created!`); // Temporary feedback
  };

  return (
    <div className="flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100"> {/* Adjusted alignment */}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Create New Project
          </h2>
        </div>
        <form className="mt-8 space-y-6 bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-xl shadow-xl" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="project-title" className="block text-sm font-medium mb-1"> {/* Made label visible */}
                Project Title
              </label>
              <input
                id="project-title"
                name="projectTitle"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800"
            >
              Create Project
            </button>
          </div>
        </form>
        {/* We can display a list of projects here later */}
      </div>
    </div>
  );
}

export default ProjectSetupPage;