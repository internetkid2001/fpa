import React, { useState } from 'react';

function PreProductionBoardPage() {
  const [activeView, setActiveView] = useState('kanban'); // 'kanban' or 'table'

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Pre-Production Board</h1>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setActiveView('kanban')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150
                ${activeView === 'kanban'
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600'
                }`}
            >
              Kanban View
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150
                ${activeView === 'table'
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600'
                }`}
            >
              Table View
            </button>
          </div>
        </header>

        {/* Main content area where Kanban or Table will be rendered */}
        <main>
          {activeView === 'kanban' && (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Kanban Board Area</h2>
              <p>The Kanban board component will go here.</p>
              {/* Placeholder for Kanban Columns */}
            </div>
          )}

          {activeView === 'table' && (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Table View Area</h2>
              <p>The Table view component will go here.</p>
              {/* Placeholder for Table */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PreProductionBoardPage;