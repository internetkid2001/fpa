import React from 'react';

function ProjectSetupPage() {
  return (
    // Main page background: Light gray for light mode, dark gray for dark mode
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Form card: White for light mode, a slightly lighter dark gray for dark mode */}
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-10 rounded-xl shadow-2xl transition-colors duration-300">
        <div>
          {/* Heading: Dark text for light mode, light/white text for dark mode */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Create New Project
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="project-title" className="sr-only">
                Project Title
              </label>
              <input
                id="project-title"
                name="projectTitle"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 
                           border border-slate-300 placeholder-slate-500 text-slate-900 
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                           dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:bg-slate-700 
                           dark:focus:ring-indigo-500 dark:focus:border-indigo-500 transition-colors duration-300"
                placeholder="Project Title"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md 
                         text-white bg-indigo-600 hover:bg-indigo-700 
                         dark:bg-indigo-500 dark:hover:bg-indigo-600 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                         dark:focus:ring-offset-slate-800 transition-colors duration-300"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectSetupPage;