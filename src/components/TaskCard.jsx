import React from 'react';

// Add onClick to props
function TaskCard({ task, onClick }) { 
  // ... (categoryColorMap remains the same)
  const categoryColorMap = {
    Equipment: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Shot: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Crew: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Cast: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Scene: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Location: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    Finance: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Script: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    Default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };
  const categoryClasses = categoryColorMap[task.category] || categoryColorMap.Default;

  return (
    // Add onClick handler to the main div
    <div 
      className="bg-white dark:bg-slate-700 p-3 mb-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick} // Attach the onClick handler
    >
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {task.title}
      </h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 truncate" title={task.description}>
        {task.description}
      </p>
      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryClasses}`}>
          {task.category}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;