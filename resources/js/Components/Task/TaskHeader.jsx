import { PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const TaskHeader = ({ onToggleFilters, onNewTask }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage and track your team's tasks efficiently
                </p>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleFilters}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-gray-400" />
                    Filters
                </button>
                <button
                    onClick={onNewTask}
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    New Task
                </button>
            </div>
        </div>
    );
};

export default TaskHeader;
