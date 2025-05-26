import React, { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Delayed', 'Completed', 'Cancelled'];
const CATEGORY_OPTIONS = ['Equipment', 'Shot', 'Crew', 'Cast', 'Scene', 'Location', 'Finance', 'Script', 'Other'];

function TaskDetailModal({ task, isOpen, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode
  const [formData, setFormData] = useState({});

  // Determine if we are in 'create' or 'view/edit' mode based on the task prop
  const isCreatingNew = !task?.id; // If task has no id, we assume it's a new task being created

  useEffect(() => {
    if (isOpen) {
      if (isCreatingNew) {
        // Initialize with defaults for a new task, and go straight to editing form
        setFormData({
          title: '',
          description: '',
          status: STATUS_OPTIONS[0],
          category: CATEGORY_OPTIONS[0],
          dueDate: '',
        });
        setIsEditing(true); // For a new task, start in edit mode
      } else if (task) {
        // Populate with existing task data for viewing/editing
        setFormData({
          id: task.id,
          title: task.title || '',
          description: task.description || '',
          status: task.status || STATUS_OPTIONS[0],
          category: task.category || CATEGORY_OPTIONS[0],
          dueDate: task.dueDate || '',
        });
        setIsEditing(false); // For an existing task, start in view mode
      }
    } else {
      setIsEditing(false); // Reset editing state when modal closes
      setFormData({});    // Clear form data when modal closes
    }
  }, [task, isOpen, isCreatingNew]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // This will either create a new task or update an existing one
    // Modal will be closed by the onSave handler in the parent if successful
  };

  // Styling for badges (can be refactored)
  const categoryColorMap = { /* ... same as before ... */ };
  const currentCategoryClasses = categoryColorMap[formData.category] || categoryColorMap.Default;
  const currentStatusClasses = formData.status === 'Completed' ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100' :
                               formData.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100' :
                               formData.status === 'Delayed' ? 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100' :
                               'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      {/* Use form tag only if isEditing or isCreatingNew, or always and handle submit conditionally? 
          Let's wrap the whole content in a form if isEditing is true for clarity.
          Or, keep the form tag and conditionally render its content.
          For simplicity, we'll have one form and toggle what's inside or what buttons do.
      */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {isCreatingNew ? 'Add New Task' : (isEditing ? 'Edit Task' : 'Task Details')}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {isEditing ? (
          // EDITING MODE: Show Form
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
              <input type="text" name="title" id="title" value={formData.title || ''} onChange={handleChange} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea name="description" id="description" rows="4" value={formData.description || ''} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select name="status" id="status" value={formData.status || ''} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {STATUS_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select name="category" id="category" value={formData.category || ''} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {CATEGORY_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
              <input type="date" name="dueDate" id="dueDate" value={formData.dueDate || ''} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            {/* Footer for Edit Mode */}
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => { if (isCreatingNew) { onClose(); } else { setIsEditing(false); } }} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500 rounded-md border border-slate-300 dark:border-slate-500 transition-colors">
                {isCreatingNew ? 'Cancel' : 'Back to View'}
              </button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition-colors">
                {isCreatingNew ? 'Add Task' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          // VIEW MODE: Show Static Details
          <>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-6">
              <div>
                <strong className="text-slate-600 dark:text-slate-400 block mb-1">Status:</strong>
                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${currentStatusClasses}`}>
                  {formData.status}
                </span>
              </div>
              <div>
                <strong className="text-slate-600 dark:text-slate-400 block mb-1">Category:</strong>
                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${currentCategoryClasses}`}>
                  {formData.category}
                </span>
              </div>
              {formData.dueDate && (
                <div>
                  <strong className="text-slate-600 dark:text-slate-400 block mb-1">Due Date:</strong> {formData.dueDate}
                </div>
              )}
              <div>
                <strong className="text-slate-600 dark:text-slate-400 block mb-1">Description:</strong>
                <p className="mt-1 whitespace-pre-wrap bg-gray-50 dark:bg-slate-700/50 p-3 rounded-md">{formData.description || 'No description provided.'}</p>
              </div>
            </div>
            {/* Footer for View Mode */}
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500 rounded-md border border-slate-300 dark:border-slate-500 transition-colors">
                Close
              </button>
              {!isCreatingNew && ( // Only show Edit button if not a new task (though new tasks start in edit mode)
                <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition-colors">
                  Edit Task
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetailModal;