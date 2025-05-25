import React, { useState } from 'react'; // Removed useEffect as it's not used here directly
import KanbanColumn from '../components/KanbanColumn';
import TaskTableView from '../components/TaskTableView';
import TaskDetailModal from '../components/TaskDetailModal';

// ... (sampleTasksData and KANBAN_COLUMN_CONFIG remain the same)
const sampleTasksData = [
  { id: 'task-1', title: 'Equipment Draft', status: 'Not Started', category: 'Equipment', description: 'Draft initial list of required equipment.', dueDate: '2025-06-15' },
  { id: 'task-2', title: 'Shot List (Scene 1-5)', status: 'In Progress', category: 'Shot', description: 'Detail all shots for scenes 1 through 5.', dueDate: '2025-06-30' },
  { id: 'task-3', title: 'Crew Draft', status: 'Not Started', category: 'Crew', description: 'Identify key crew members and availability.', dueDate: '2025-06-20' },
  { id: 'task-4', title: 'Casting - Lead Roles', status: 'In Progress', category: 'Cast', description: 'Finalize casting for lead roles.', dueDate: '2025-07-10' },
  { id: 'task-5', title: 'Casting - Supporting Roles', status: 'Delayed', category: 'Cast', description: 'Casting for supporting roles is currently on hold.', dueDate: '2025-07-20' },
  { id: 'task-6', title: 'Release Order Planning', status: 'Not Started', category: 'Scene', description: 'Plan the initial shooting release order.', dueDate: null },
  { id: 'task-7', title: 'Scene Pairing Analysis', status: 'Completed', category: 'Scene', description: 'Analyze scenes for efficient pairing during shoots.', dueDate: '2025-06-01' },
  { id: 'task-8', title: 'Location Scouting - Initial List', status: 'In Progress', category: 'Location', description: 'Compile a list of potential shooting locations.', dueDate: '2025-07-01' },
  { id: 'task-9', title: 'Budget Draft v1', status: 'Completed', category: 'Finance', description: 'Initial draft of the production budget.', dueDate: '2025-05-20' },
  { id: 'task-10', title: 'Script Lockdown (v2.1)', status: 'Completed', category: 'Script', description: 'Script version 2.1 is locked for pre-production.', dueDate: '2025-05-15' },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // if null, indicates creating a new task for the modal

  // Modified to handle opening for 'new' task or 'edit' task
  const handleOpenModal = (task = null) => { // Default task to null for creating
    setSelectedTask(task); // If task is null, modal will know it's for creation
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null); // Reset selectedTask on close
  };

  // Modified to handle both creating new tasks and updating existing ones
  const handleSaveTask = (taskDataFromModal) => {
    if (taskDataFromModal.id) {
      // Editing existing task
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskDataFromModal.id ? { ...task, ...taskDataFromModal } : task
        )
      );
    } else {
      // Adding new task
      const newTask = {
        ...taskDataFromModal,
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate a unique ID
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-full mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Pre-Production Board</h1>
            {/* Add Task Button */}
            <button
              onClick={() => handleOpenModal()} // Call with no arguments for 'add task' mode
              className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              Add New Task
            </button>
          </div>
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
          {/* ... (Kanban and Table view rendering remains the same, passing handleOpenModal) ... */}
          {activeView === 'kanban' && (
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {KANBAN_COLUMN_CONFIG.map((columnConfig) => {
                const columnTasks = tasks.filter(task => task.status === columnConfig.statusFilter);
                return (
                  <KanbanColumn
                    key={columnConfig.id}
                    title={columnConfig.title}
                    tasks={columnTasks}
                    onTaskClick={handleOpenModal}
                  />
                );
              })}
            </div>
          )}

          {activeView === 'table' && (
            <TaskTableView 
              tasks={tasks} 
              onTaskClick={handleOpenModal} 
            />
          )}
        </main>
      </div>

      <TaskDetailModal
        isOpen={isModalOpen}
        // Pass the selectedTask. If it's null, the modal will know it's for creating.
        task={selectedTask} 
        onClose={handleCloseModal}
        onSave={handleSaveTask}
      />
    </div>
  );
}

export default PreProductionBoardPage;