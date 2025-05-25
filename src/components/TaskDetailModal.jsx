import React from 'react';

function TaskDetailModal({ task, isOpen, onClose }) {
  if (!isOpen || !task) {
    return null; // Don't render anything if the modal is not open or no task is selected
  }

  // Basic color mapping for categories - can be shared or expanded
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

  // Basic styling for statuses - can be shared or expanded
  const statusClasses = task.status === 'Completed' ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100' :
                       task.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100' :
                       task.status === 'Delayed' ? 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100' :
                       'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';


  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{task.title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Close modal"
          >
            {/* Simple X icon using text, you can replace with an SVG icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Modal Body - Task Details */}
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
          <div>
            <strong className="text-slate-600 dark:text-slate-400">Status:</strong>
            <span className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses}`}>
              {task.status}
            </span>
          </div>
          <div>
            <strong className="text-slate-600 dark:text-slate-400">Category:</strong>
            <span className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryClasses}`}>
              {task.category}
            </span>
          </div>
          {task.dueDate && (
            <div>
              <strong className="text-slate-600 dark:text-slate-400">Due Date:</strong> {task.dueDate}
            </div>
          )}
          <div>
            <strong className="text-slate-600 dark:text-slate-400">Description:</strong>
            <p className="mt-1 whitespace-pre-wrap">{task.description || 'No description provided.'}</p>
          </div>
          {/* Add more fields as needed */}
        </div>

        {/* Modal Footer (optional) */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md border border-slate-300 dark:border-slate-600 transition-colors"
          >
            Close
          </button>
          {/* Example: Edit button for later
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition-colors"
          >
            Edit Task
          </button>
          */}
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;