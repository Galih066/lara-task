import { motion } from "framer-motion";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    PencilIcon,
    TrashIcon,
    ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";
import { useState, useMemo, useEffect } from "react";
import EmptyState from "../EmptyState";
import {
    utils,
    getDueDateStatus,
    getStatusColor,
    getPriorityColor
} from "../../utils/taskUtils";

const TaskRow = ({ task, onUpdate, onDelete }) => {
    const dueStatus = getDueDateStatus(task.due_date);

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
                    {utils.formatText(task.priority)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {utils.formatText(task.status)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    {dueStatus && (
                        <span className={`text-xs ${dueStatus.class}`}>
                            {dueStatus.text}
                        </span>
                    )}
                    <span className="text-xs text-gray-500">
                        {utils.formatDate(task.due_date)}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                    onClick={() => onUpdate(task)}
                    className="text-blue-600 hover:text-blue-900"
                >
                    <PencilIcon className="w-4" />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-900"
                >
                    <TrashIcon className="w-4" />
                </button>
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

    const statusOptions = ['all', 'todo', 'in_progress', 'done'];
    const priorityOptions = ['all', 'high', 'medium', 'low'];

    const sortedAndFilteredTasks = useMemo(() => {
        let filteredTasks = [...tasks];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(searchLower) ||
                task.description.toLowerCase().includes(searchLower)
            );
        }

        if (statusFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task =>
                task.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (priorityFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task =>
                task.priority.toLowerCase() === priorityFilter.toLowerCase()
            );
        }

        return filteredTasks.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [tasks, sortConfig, searchTerm, statusFilter, priorityFilter]);

    const totalPages = Math.ceil(sortedAndFilteredTasks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleTasks = sortedAndFilteredTasks.slice(startIndex, startIndex + itemsPerPage);

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, priorityFilter]);

    if (!tasks.length) {
        return <EmptyState
            icon={<ClipboardDocumentListIcon className="h-12 w-12" />}
            title="No tasks found"
            message="Get started by creating a new task"
        />;
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="w-full sm:w-96">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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
                                        : utils.formatText(status)
                                    }
                                </option>
                            ))}
                        </select>
                    </div>

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
                                        : utils.formatText(priority)
                                    }
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                    {searchTerm && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Search: {searchTerm}
                            <button
                                onClick={() => setSearchTerm('')}
                                className="ml-1 hover:text-gray-900"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {statusFilter !== 'all' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Status: {utils.formatText(statusFilter)}
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
                            Priority: {utils.formatText(priorityFilter)}
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

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                                Title
                                {sortConfig.key === 'title' && (
                                    sortConfig.direction === 'asc'
                                        ? <ChevronUpIcon className="h-4 w-4 inline ml-1" />
                                        : <ChevronDownIcon className="h-4 w-4 inline ml-1" />
                                )}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('priority')}>
                                Priority
                                {sortConfig.key === 'priority' && (
                                    sortConfig.direction === 'asc'
                                        ? <ChevronUpIcon className="h-4 w-4 inline ml-1" />
                                        : <ChevronDownIcon className="h-4 w-4 inline ml-1" />
                                )}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                                Status
                                {sortConfig.key === 'status' && (
                                    sortConfig.direction === 'asc'
                                        ? <ChevronUpIcon className="h-4 w-4 inline ml-1" />
                                        : <ChevronDownIcon className="h-4 w-4 inline ml-1" />
                                )}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('due_date')}>
                                Due Date
                                {sortConfig.key === 'due_date' && (
                                    sortConfig.direction === 'asc'
                                        ? <ChevronUpIcon className="h-4 w-4 inline ml-1" />
                                        : <ChevronDownIcon className="h-4 w-4 inline ml-1" />
                                )}
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {visibleTasks.map(task => (
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

            {totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
