// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <nav className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                FilmProdApp
              </Link>
            </div>
            <div className="space-x-1 sm:space-x-4">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Project Setup
              </Link>
              {/* Temporarily comment out or remove direct /board link as it now needs a projectId */}
              {/* <Link 
                to="/board" // This will likely result in an error or empty projectId now
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Board
              </Link> 
              */}
              <Link
                to="/storyboard"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Storyboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-800 text-center p-4 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-slate-700">
        © {new Date().getFullYear()} Film Production App
      </footer>
    </div>
  );
}

export default Layout;