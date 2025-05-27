import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KanbanColumn from '../components/KanbanColumn';
import TaskTableView from '../components/TaskTableView';
import TaskDetailModal from '../components/TaskDetailModal';

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

const allCategories = ['All Categories', ...new Set(sampleTasksData.map(task => task.category))];
const allStatuses = ['All Statuses', ...KANBAN_COLUMN_CONFIG.map(col => col.statusFilter)];

function PreProductionBoardPage() {
  const { projectId } = useParams();

  const [activeView, setActiveView] = useState('kanban');
  const [tasks, setTasks] = useState(sampleTasksData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortConfigKey, setSortConfigKey] = useState(null);
  const [sortConfigDirection, setSortConfigDirection] = useState('ascending');

  useEffect(() => {
    console.log("Current Project ID:", projectId);
    setCategoryFilter('All Categories');
    setStatusFilter('All Statuses');
    setSortConfigKey(null);
  }, [projectId]);

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (taskDataFromModal) => {
    if (taskDataFromModal.id) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskDataFromModal.id ? { ...task, ...taskDataFromModal } : task
        )
      );
    } else {
      const newTask = {
        ...taskDataFromModal,
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    handleCloseModal();
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfigKey === key && sortConfigDirection === 'ascending') {
      direction = 'descending';
    } else if (sortConfigKey === key && sortConfigDirection === 'descending') {
      direction = 'ascending';
    }
    setSortConfigKey(key);
    setSortConfigDirection(direction);
  };

  const displayedTasks = useMemo(() => {
    console.log("useMemo for displayedTasks: Initial tasks count:", tasks.length);
    console.log("useMemo filters:", { categoryFilter, statusFilter });
    console.log("useMemo sortConfig:", { sortConfigKey, sortConfigDirection });

    if (!Array.isArray(tasks)) {
      console.error("useMemo: Main 'tasks' state is not an array!", tasks);
      return []; // Return an empty array to prevent further errors
    }

    let filteredAndSortedTasks = [...tasks];

    if (categoryFilter && categoryFilter !== 'All Categories') {
      filteredAndSortedTasks = filteredAndSortedTasks.filter(task => task.category === categoryFilter);
      console.log("After category filter:", filteredAndSortedTasks.length, "tasks");
    }
    if (statusFilter && statusFilter !== 'All Statuses') {
      filteredAndSortedTasks = filteredAndSortedTasks.filter(task => task.status === statusFilter);
      console.log("After status filter:", filteredAndSortedTasks.length, "tasks");
    }

    if (sortConfigKey !== null) {
      console.log(`Sorting by key: ${sortConfigKey}, direction: ${sortConfigDirection}`);
      try {
        filteredAndSortedTasks.sort((a, b) => {
          const valA = a[sortConfigKey];
          const valB = b[sortConfigKey];
          if (valA === null || typeof valA === 'undefined') return sortConfigDirection === 'ascending' ? -1 : 1;
          if (valB === null || typeof valB === 'undefined') return sortConfigDirection === 'ascending' ? 1 : -1;
          if (valA < valB) { return sortConfigDirection === 'ascending' ? -1 : 1; }
          if (valA > valB) { return sortConfigDirection === 'ascending' ? 1 : -1; }
          return 0;
        });
        console.log("After sorting:", filteredAndSortedTasks.length, "tasks");
      } catch (error) {
        console.error("Error during sorting:", error);
      }
    }
    
    console.log("useMemo final displayedTasks:", filteredAndSortedTasks);
    return filteredAndSortedTasks;
  }, [tasks, categoryFilter, statusFilter, sortConfigKey, sortConfigDirection]);

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
        <div className="max-w-full mx-auto">
          <header className="mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Pre-Production Board (Project: {projectId})</h1>
              <button
                onClick={() => handleOpenModal()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors"
              >
                Add New Task
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() => setActiveView('kanban')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeView === 'kanban' ? 'bg-indigo-600 dark:bg-indigo-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600'}`}
              >
                Kanban View
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeView === 'table' ? 'bg-indigo-600 dark:bg-indigo-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600'}`}
              >
                Table View
              </button>
              
              {activeView === 'table' && (
                <div className="flex items-center space-x-2 ml-auto">
                  <div>
                    <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
                    <select
                      id="category-filter"
                      name="category"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      {allCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
                    <select
                      id="status-filter"
                      name="status"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      {allStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </header>

          <main>
            {activeView === 'kanban' && (
              <div className="flex flex-wrap gap-6 pb-4">
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
                tasks={displayedTasks} 
                onTaskClick={handleOpenModal}
                requestSort={requestSort}
                sortConfigKey={sortConfigKey}
                sortConfigDirection={sortConfigDirection}
              />
            )}
          </main>
        </div>

        <TaskDetailModal 
          isOpen={isModalOpen} 
          task={selectedTask} 
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      </div>
  );
}

export default PreProductionBoardPage;