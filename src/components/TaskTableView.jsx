import React from 'react';

// 1. Add requestSort, sortConfigKey, sortConfigDirection to props
function TaskTableView({ tasks, onTaskClick, requestSort, sortConfigKey, sortConfigDirection }) {
  
  // 2. Define which columns are sortable and map header text to task object keys
  const sortableHeaders = [
    { label: 'Task Name', key: 'title' },
    { label: 'Category', key: 'category' },
    { label: 'Status', key: 'status' },
    { label: 'Due Date', key: 'dueDate' },
  ];

  // Helper function to get sort indicator
  const getSortIndicator = (columnKey) => {
    if (sortConfigKey !== columnKey) {
      return null; // No indicator or a default one for non-sorted columns
    }
    if (sortConfigDirection === 'ascending') {
      return ' ▲'; // Up arrow for ascending
    }
    return ' ▼'; // Down arrow for descending
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <thead className="bg-gray-50 dark:bg-slate-700">
          <tr>
            {sortableHeaders.map(header => (
              <th
                key={header.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                onClick={() => requestSort(header.key)} // 3. Call requestSort on click
              >
                {header.label}
                {/* 4. Display sort indicator */}
                <span>{getSortIndicator(header.key)}</span> 
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
          {/* ... (tbody rendering tasks remains the same, as it receives already sorted tasks) ... */}
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr 
                key={task.id} 
                className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-100">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
                  {task.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${task.status === 'Completed' ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100' :
                      task.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100' :
                      task.status === 'Delayed' ? 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
                  {task.dueDate || 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={sortableHeaders.length} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-slate-400">
                No tasks to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTableView;