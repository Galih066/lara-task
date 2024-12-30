import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const TaskDetail = ({ taskId, onClose, isModalOpen: isOpen }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            // Delay setting visibility to allow initial render
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            setIsVisible(false);
            // Delay unmounting to allow exit animation
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            // Disable scroll on body when modal opens
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scroll when modal closes
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to re-enable scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const getTimeRemaining = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const diffTime = due - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const timeStates = {
            overdue: { threshold: 0, text: 'Overdue', class: 'text-red-600' },
            dueToday: { threshold: 0, text: 'Due today', class: 'text-yellow-600' },
            dueTomorrow: { threshold: 1, text: 'Due tomorrow', class: 'text-yellow-600' },
            dueThisWeek: { threshold: 7, text: `${diffDays} days left`, class: 'text-blue-600' },
            dueLater: { threshold: Infinity, text: `${diffDays} days left`, class: 'text-green-600' }
        };

        const state = Object.values(timeStates).find(({ threshold }) =>
            diffDays < threshold || threshold === Infinity
        );

        return state || timeStates.dueLater;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const fetchTaskDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/task/${taskId}`);
                setTask(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load task details');
                console.error('Error fetching task details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && taskId) {
            fetchTaskDetail();
        }
    }, [taskId, isOpen]);

    if (!isMounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-[60] ${isVisible ? 'bg-opacity-25' : 'bg-opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`fixed inset-y-0 right-0 w-[800px] bg-white shadow-xl transform transition-all duration-300 ease-in-out z-[70] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="relative flex-1 px-4 sm:px-6">
                        <div className="h-full">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-500">{error}</div>
                            ) : task ? (
                                <div className="space-y-6">
                                    {/* Title and Description */}
                                    <div>
                                        <h3 className="text-2xl font-medium text-gray-900">{task.title}</h3>
                                        <p className="mt-2 text-gray-600 whitespace-pre-wrap">{task.description}</p>
                                    </div>

                                    {/* Status and Priority */}
                                    <div className="flex items-center space-x-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                        </span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                            {formatStatus(task.status)}
                                        </span>
                                        <span className={`inline-flex items-center gap-1 text-sm ${getTimeRemaining(task.dueDate).class}`}>
                                            <ClockIcon className="h-4 w-4" />
                                            {getTimeRemaining(task.dueDate).text}
                                        </span>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-gray-500">Created</h4>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(task.createdAt)}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(task.dueDate)}</p>
                                        </div>
                                        {task.completedDate && (
                                            <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                                                <h4 className="text-sm font-medium text-gray-500">Completed</h4>
                                                <p className="mt-1 text-sm text-gray-900">{formatDate(task.completedDate)}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* People */}
                                    <div className="space-y-4">
                                        {/* Initiator */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Initiator</h4>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-blue-800">
                                                                {task.initiator.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{task.initiator.name}</p>
                                                        <p className="text-sm text-gray-500">{task.initiator.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Assignees */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Assignees</h4>
                                            <div className="space-y-2">
                                                {task.assignees && task.assignees.length > 0 ? (
                                                    task.assignees.map((assignee, index) => (
                                                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="flex-shrink-0">
                                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                                        <span className="text-sm font-medium text-blue-800">
                                                                            {assignee.name.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">{assignee.name}</p>
                                                                    <div className="text-sm text-gray-500 space-x-2">
                                                                        <span>{assignee.email}</span>
                                                                        {assignee.job_title && (
                                                                            <>
                                                                                <span>•</span>
                                                                                <span>{assignee.job_title}</span>
                                                                            </>
                                                                        )}
                                                                        {assignee.department && (
                                                                            <>
                                                                                <span>•</span>
                                                                                <span>{assignee.department}</span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <p className="text-sm text-gray-500">No assignees</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Attachments */}
                                    {task.images && task.images.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 mb-4">Attachments</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {task.images.map((image, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={`/storage/${image.path}`}
                                                            alt={image.name}
                                                            className="w-full h-40 object-cover rounded-lg"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                            <a
                                                                href={`/storage/${image.path}`}
                                                                target="_blank"
                                                                className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium transform scale-95 group-hover:scale-100 transition-all duration-200"
                                                            >
                                                                View Full Size
                                                            </a>
                                                        </div>
                                                        <div className="mt-1">
                                                            <p className="text-sm text-gray-900 truncate">{image.name}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {(image.size / 1024).toFixed(1)} KB • {image.type.split('/')[1].toUpperCase()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const formatStatus = (status) => {
    switch (status) {
        case 'todo':
            return 'To Do';
        case 'in_progress':
            return 'In Progress';
        case 'review':
            return 'Review';
        case 'done':
            return 'Done';
        default:
            return status.charAt(0).toUpperCase() + status.slice(1);
    }
};

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
        case 'review':
            return 'bg-yellow-100 text-yellow-800';
        case 'done':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default TaskDetail;
