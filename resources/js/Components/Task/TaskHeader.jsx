import { PlusIcon, MagnifyingGlassIcon, ViewColumnsIcon, ListBulletIcon, CalendarIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TaskFilters from "./TaskFilters";

const ViewButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${isActive
            ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
            : 'text-gray-700 hover:bg-gray-50'
            }`
        }
    >
        <Icon className="w-5 h-5 mr-1.5" />
        {label}
    </button>
);

const TaskHeader = ({ onToggleFilters, onNewTask, view, onViewChange, onSearch, onFilterChange }) => {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleFilterChange = (type, value) => {
        onFilterChange?.(type, value);
    };

    return (
        <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage and track your team's tasks efficiently
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleFilters}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${showFilters ? "bg-gray-50" : ""
                            }`}
                    >
                        <FunnelIcon className="w-5 h-5 mr-2 text-gray-400" />
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

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        onChange={(e) => onSearch?.(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <ViewButton
                        icon={ViewColumnsIcon}
                        label="Board"
                        isActive={view === 'board'}
                        onClick={() => onViewChange?.('board')}
                    />
                    <ViewButton
                        icon={ListBulletIcon}
                        label="List"
                        isActive={view === 'list'}
                        onClick={() => onViewChange?.('list')}
                    />
                    <ViewButton
                        icon={CalendarIcon}
                        label="Calendar"
                        isActive={view === 'calendar'}
                        onClick={() => onViewChange?.('calendar')}
                    />
                </div>
            </div>

            <TaskFilters showFilters={showFilters} onFilterChange={handleFilterChange} />
        </div>
    );
};

export default TaskHeader;
