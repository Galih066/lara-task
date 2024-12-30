import { motion } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
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
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white border border-gray-200 hover:border-blue-500 rounded-lg p-4 transition-all duration-200"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ')}
                        </span>
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
                        {dueStatus && (
                            <span className={`text-xs ${dueStatus.class}`}>
                                {dueStatus.text}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            </div>
        </motion.div>
    );
};

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortedTasks = [...tasks].sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const requestSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return null;
        return sortConfig.direction === 'asc' ? (
            <ChevronUpIcon className="h-4 w-4" />
        ) : (
            <ChevronDownIcon className="h-4 w-4" />
        );
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => requestSort('title')}
                            className="flex items-center space-x-1 text-sm font-medium text-gray-700"
                        >
                            <span>Title</span>
                            <SortIcon columnKey="title" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => requestSort('priority')}
                                className="flex items-center space-x-1 text-sm font-medium text-gray-700"
                            >
                                <span>Priority</span>
                                <SortIcon columnKey="priority" />
                            </button>
                            <button
                                onClick={() => requestSort('dueDate')}
                                className="flex items-center space-x-1 text-sm font-medium text-gray-700"
                            >
                                <span>Due Date</span>
                                <SortIcon columnKey="dueDate" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    {tasks.length === 0 ? (
                        <EmptyState
                            icon={ClipboardDocumentListIcon}
                            title="No tasks found"
                            description="Create a new task to get started"
                        />
                    ) : (
                        <div className="mt-4 space-y-4">
                            {sortedTasks.map((task) => (
                                <TaskRow
                                    key={task.id}
                                    task={task}
                                    onUpdate={onUpdateTask}
                                    onDelete={onDeleteTask}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
