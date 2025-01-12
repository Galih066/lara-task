import { motion } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useState, useMemo, useEffect } from "react";
import EmptyState from "../EmptyState";

const TaskRow = ({ task, onUpdate, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'todo':
                return 'bg-gray-100 text-gray-800';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800';
            case 'done':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getDueDateStatus = (dueDate) => {
        if (!dueDate) return null;
        const today = new Date();
        const due = new Date(dueDate);
        const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return { class: 'text-red-600', text: 'Overdue' };
        if (diffDays === 0) return { class: 'text-orange-600', text: 'Due Today' };
        if (diffDays <= 2) return { class: 'text-yellow-600', text: 'Due Soon' };
        return { class: 'text-gray-600', text: `Due in ${diffDays} days` };
    };

    const dueStatus = getDueDateStatus(task.dueDate);
    const assigneesCount = task.assignees?.length || 0;

    return (
        <motion.tr 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group hover:bg-gray-50"
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-md">{task.description}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    {dueStatus && (
                        <span className={`text-xs ${dueStatus.class}`}>
                            {dueStatus.text}
                        </span>
                    )}
                    {task.dueDate && (
                        <span className="text-xs text-gray-500">
                            {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {assigneesCount > 0 && (
                    <div className="flex -space-x-1">
                        {assigneesCount === 1 ? (
                            <span className="inline-block h-6 w-6 rounded-full bg-gray-200 text-xs flex items-center justify-center">
                                {task.initiator?.charAt(0) || '?'}
                            </span>
                        ) : (
                            <span className="inline-block h-6 px-2 rounded-full bg-gray-200 text-xs flex items-center justify-center">
                                +{assigneesCount}
                            </span>
                        )}
                    </div>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onUpdate(task)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <PencilIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-1 hover:bg-red-100 rounded-full"
                    >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                </div>
            </td>
        </motion.tr>
    );
};

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    // Status and Priority options
    const statusOptions = ['all', 'todo', 'in_progress', 'done'];
    const priorityOptions = ['all', 'high', 'medium', 'low'];

    // Sorting function
    const sortedTasks = useMemo(() => {
        if (!tasks) return [];
        let sortedItems = [...tasks];
        sortedItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sortedItems;
    }, [tasks, sortConfig]);

    // Filtering function
    const filteredTasks = useMemo(() => {
        return sortedTasks.filter(task => {
            const matchesSearch = 
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
            const matchesPriority = priorityFilter === 'all' || task.priority.toLowerCase() === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [sortedTasks, searchTerm, statusFilter, priorityFilter]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, priorityFilter]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName) {
            return <ChevronUpIcon className="h-4 w-4 text-gray-400" />;
        }
        return sortConfig.direction === 'asc' 
            ? <ChevronUpIcon className="h-4 w-4 text-blue-500" />
            : <ChevronDownIcon className="h-4 w-4 text-blue-500" />;
    };

    if (!tasks || tasks.length === 0) {
        return <EmptyState 
            icon={<ClipboardDocumentListIcon className="h-12 w-12" />}
            title="No tasks found"
            description="Get started by creating a new task."
        />;
    }

    return (
        <div className="bg-white rounded-lg shadow">
            {/* Search and filters */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    {/* Search input */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {/* Status filter */}
                    <div className="w-full sm:w-48">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {status === 'all' 
                                        ? 'All Statuses'
                                        : status.split('_').map(word => 
                                            word.charAt(0).toUpperCase() + word.slice(1)
                                          ).join(' ')
                                    }
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Priority filter */}
                    <div className="w-full sm:w-48">
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            {priorityOptions.map(priority => (
                                <option key={priority} value={priority}>
                                    {priority === 'all' 
                                        ? 'All Priorities'
                                        : priority.charAt(0).toUpperCase() + priority.slice(1)
                                    }
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Active filters display */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {searchTerm && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Search: {searchTerm}
                            <button
                                onClick={() => setSearchTerm('')}
                                className="ml-1 hover:text-blue-900"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {statusFilter !== 'all' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Status: {statusFilter.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                            <button
                                onClick={() => setStatusFilter('all')}
                                className="ml-1 hover:text-gray-900"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {priorityFilter !== 'all' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Priority: {priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}
                            <button
                                onClick={() => setPriorityFilter('all')}
                                className="ml-1 hover:text-gray-900"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-2/5"
                                onClick={() => requestSort('title')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Title</span>
                                    {getSortIcon('title')}
                                </div>
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-24"
                                onClick={() => requestSort('priority')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Priority</span>
                                    {getSortIcon('priority')}
                                </div>
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-28"
                                onClick={() => requestSort('status')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Status</span>
                                    {getSortIcon('status')}
                                </div>
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-32"
                                onClick={() => requestSort('dueDate')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Due Date</span>
                                    {getSortIcon('dueDate')}
                                </div>
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                            >
                                Assignees
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTasks.slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage).map((task) => (
                            <TaskRow 
                                key={task.id} 
                                task={task} 
                                onUpdate={onUpdateTask}
                                onDelete={onDeleteTask}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTasks.length / itemsPerPage)))}
                            disabled={currentPage === Math.ceil(filteredTasks.length / itemsPerPage)}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredTasks.length)}</span> of{' '}
                                <span className="font-medium">{filteredTasks.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                {[...Array(Math.ceil(filteredTasks.length / itemsPerPage))].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            currentPage === index + 1
                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTasks.length / itemsPerPage)))}
                                    disabled={currentPage === Math.ceil(filteredTasks.length / itemsPerPage)}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
