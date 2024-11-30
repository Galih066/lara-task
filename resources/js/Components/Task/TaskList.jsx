import { motion } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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
                        <div className="flex items-center space-x-2">
                            <span className="inline-block h-6 w-6 rounded-full bg-gray-200 text-xs flex items-center justify-center">
                                {task.assignee.charAt(0)}
                            </span>
                            <span className="text-xs text-gray-500">{task.assignee}</span>
                        </div>
                        {dueStatus && (
                            <span className={`text-xs ${dueStatus.class}`}>
                                {dueStatus.text}
                            </span>
                        )}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                onClick={() => onUpdate(task)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                            >
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [sortField, setSortField] = useState('dueDate');
    const [sortDirection, setSortDirection] = useState('asc');

    const sortTasks = (tasks) => {
        return [...tasks].sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
                    break;
                case 'dueDate':
                    comparison = new Date(a.dueDate) - new Date(b.dueDate);
                    break;
                default:
                    comparison = 0;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });
    };

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const SortHeader = ({ field, label }) => (
        <button
            onClick={() => toggleSort(field)}
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
            <span>{label}</span>
            {sortField === field && (
                sortDirection === 'asc' ? 
                <ChevronUpIcon className="w-4 h-4" /> : 
                <ChevronDownIcon className="w-4 h-4" />
            )}
        </button>
    );

    const sortedTasks = sortTasks(tasks);

    return (
        <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                    <SortHeader field="title" label="Title" />
                    <SortHeader field="priority" label="Priority" />
                    <SortHeader field="dueDate" label="Due Date" />
                </div>
            </div>
            <div className="space-y-2">
                {sortedTasks.map(task => (
                    <TaskRow
                        key={task.id}
                        task={task}
                        onUpdate={onUpdateTask}
                        onDelete={onDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
