import React from 'react';
import TaskCard from './TaskCard'; // Import the TaskCard component we created earlier

function KanbanColumn({ title, tasks }) {
  return (
    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow-md w-80 flex-shrink-0"> {/* Increased width slightly */}
      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 border-b border-gray-300 dark:border-slate-700 pb-2">
        {title} ({tasks.length})
      </h3>
      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1"> {/* Added max-height and scroll */}
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">No tasks in this column.</p>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;