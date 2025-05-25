import React, { useState } from 'react';
import KanbanColumn from '../components/KanbanColumn'; // Import the new component

// Sample Data (as defined previously)
const sampleTasksData = [
  // ... (your existing sampleTasksData remains here) ...
  { id: 'task-1', title: 'Equipment Draft', status: 'Not Started', category: 'Equipment', description: 'Draft initial list of required equipment.' },
  { id: 'task-2', title: 'Shot List (Scene 1-5)', status: 'In Progress', category: 'Shot', description: 'Detail all shots for scenes 1 through 5.' },
  { id: 'task-3', title: 'Crew Draft', status: 'Not Started', category: 'Crew', description: 'Identify key crew members and availability.' },
  { id: 'task-4', title: 'Casting - Lead Roles', status: 'In Progress', category: 'Cast', description: 'Finalize casting for lead roles.' },
  { id: 'task-5', title: 'Casting - Supporting Roles', status: 'Delayed', category: 'Cast', description: 'Casting for supporting roles is currently on hold.' },
  { id: 'task-6', title: 'Release Order Planning', status: 'Not Started', category: 'Scene', description: 'Plan the initial shooting release order.' },
  { id: 'task-7', title: 'Scene Pairing Analysis', status: 'Completed', category: 'Scene', description: 'Analyze scenes for efficient pairing during shoots.' },
  { id: 'task-8', title: 'Location Scouting - Initial List', status: 'In Progress', category: 'Location', description: 'Compile a list of potential shooting locations.' },
  { id: 'task-9', title: 'Budget Draft v1', status: 'Completed', category: 'Finance', description: 'Initial draft of the production budget.' },
  { id: 'task-10', title: 'Script Lockdown (v2.1)', status: 'Completed', category: 'Script', description: 'Script version 2.1 is locked for pre-production.' },
];

const KANBAN_COLUMN_CONFIG = [
  { id: 'notStartedCol', title: 'Not Started', statusFilter: 'Not Started' },
  { id: 'inProgressCol', title: 'In Progress', statusFilter: 'In Progress' },
  { id: 'delayedCol', title: 'Delayed', statusFilter: 'Delayed' },
  { id: 'completedCol', title: 'Completed', statusFilter: 'Completed' },
];

function PreProductionBoardPage() {
  const [activeView, setActiveView] = useState('kanban');
  const [tasks, setTasks] = useState(sampleTasksData);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-full mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Pre-Production Board</h1>
          <div className="mt-4 flex space-x-2">
            {/* ... (View switcher buttons remain unchanged) ... */}
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

        <main>
          {activeView === 'kanban' && (
            <div className="flex space-x-4 overflow-x-auto pb-4"> {/* Container for horizontal scrolling columns */}
              {KANBAN_COLUMN_CONFIG.map((columnConfig) => {
                const columnTasks = tasks.filter(task => task.status === columnConfig.statusFilter);
                return (
                  <KanbanColumn
                    key={columnConfig.id}
                    title={columnConfig.title}
                    tasks={columnTasks}
                  />
                );
              })}
            </div>
          )}

          {activeView === 'table' && (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Table View Area</h2>
              <p>The Table view component will go here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PreProductionBoardPage;