import React from 'react';
import TaskCard from './TaskCard';

// Add onTaskClick to props
function KanbanColumn({ title, tasks, onTaskClick }) { 
  return (
    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow-md w-80 flex-shrink-0">
      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 border-b border-gray-300 dark:border-slate-700 pb-2">
        {title} ({tasks.length})
      </h3>
      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1">
        {tasks.length > 0 ? (
          tasks.map(task => (
            // Pass onTaskClick and the specific task to TaskCard
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => onTaskClick(task)} // Call onTaskClick with this task
            />
          ))
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">No tasks in this column.</p>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;