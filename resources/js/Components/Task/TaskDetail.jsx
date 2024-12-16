import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const TaskDetail = ({ taskId, onClose, isModalOpen, isEntering }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTimeRemaining = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const diffTime = due - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return { text: 'Overdue', class: 'text-red-600' };
        } else if (diffDays === 0) {
            return { text: 'Due today', class: 'text-yellow-600' };
        } else if (diffDays === 1) {
            return { text: 'Due tomorrow', class: 'text-yellow-600' };
        } else if (diffDays <= 7) {
            return { text: `${diffDays} days left`, class: 'text-blue-600' };
        } else {
            return { text: `${diffDays} days left`, class: 'text-green-600' };
        }
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

        if (isModalOpen && taskId) {
            fetchTaskDetail();
        }
    }, [taskId, isModalOpen]);

    // Add effect to handle body scroll
    useEffect(() => {
        if (isModalOpen) {
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
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex min-h-screen items-start justify-center p-4">
                <div className={`relative w-full max-w-4xl transform rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
                    isEntering ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
                }`}>
                    <div className="flex flex-col h-[calc(100vh-8rem)]">
                        <div className="border-b border-gray-200 bg-white px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Task Details</h3>
                                    {task && task.initiator && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Created by {task.initiator.name} • Last updated {new Date(task.updatedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400
                            scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                            <div className="p-8">
                                {loading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : error ? (
                                    <div className="text-center text-red-600 py-8">{error}</div>
                                ) : task && (
                                    <div className="space-y-8">
                                        {/* Basic Information */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                                    <p className="text-gray-900">{task.title}</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                                    <p className="text-gray-900 whitespace-pre-wrap">{task.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dates Section */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Timeline</h3>
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Start Date */}
                                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                            <label className="text-sm font-medium text-gray-700">Start Date</label>
                                                        </div>
                                                        <p className="text-gray-900">{formatDate(task.createdAt)}</p>
                                                    </div>

                                                    {/* Due Date */}
                                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                            <label className="text-sm font-medium text-gray-700">Due Date</label>
                                                        </div>
                                                        <p className="text-gray-900">{formatDate(task.dueDate)}</p>
                                                        <div className="mt-2 flex items-center space-x-2">
                                                            <ClockIcon className="h-4 w-4 text-gray-400" />
                                                            <span className={`text-sm font-medium ${getTimeRemaining(task.dueDate).class}`}>
                                                                {getTimeRemaining(task.dueDate).text}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Progress Timeline */}
                                                <div className="relative">
                                                    <div className="absolute left-0 top-5 h-0.5 w-full bg-gray-200">
                                                        <div 
                                                            className="h-full bg-blue-500" 
                                                            style={{ 
                                                                width: `${Math.min(100, Math.max(0, 
                                                                    ((new Date() - new Date(task.createdAt)) / 
                                                                    (new Date(task.dueDate) - new Date(task.createdAt))) * 100
                                                                ))}%` 
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="relative flex justify-between">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                                            <span className="mt-3 text-xs text-gray-500">Start</span>
                                                        </div>
                                                        {task.completedDate ? (
                                                            <div className="flex flex-col items-center">
                                                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                                                <span className="mt-3 text-xs text-gray-500">Completed</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center">
                                                                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                                                                <span className="mt-3 text-xs text-gray-500">Due</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {task.completedDate && (
                                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                            <label className="text-sm font-medium text-gray-700">Completed Date</label>
                                                        </div>
                                                        <p className="text-gray-900">{formatDate(task.completedDate)}</p>
                                                        <p className="text-sm text-green-600 mt-1">
                                                            {task.completedDate <= task.dueDate ? 'Completed on time' : 'Completed after due date'}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status and Priority */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Task Status</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                            task.status === 'todo' ? 'bg-yellow-100 text-yellow-800' :
                                                            task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                            {task.status === 'todo' ? 'To Do' :
                                                             task.status === 'in_progress' ? 'In Progress' :
                                                             'Done'}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                            task.priority === 'low' ? 'bg-gray-100 text-gray-800' :
                                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                                                        <p className="text-gray-900">{new Date(task.dueDate).toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}</p>
                                                    </div>
                                                    
                                                    {task.completedDate && (
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Completed Date</label>
                                                            <p className="text-gray-900">{new Date(task.completedDate).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Team Members */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Team Members</h3>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Owner</label>
                                                    {task.initiator && (
                                                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <span className="text-sm font-medium text-blue-800">
                                                                    {task.initiator.name ? task.initiator.name.charAt(0) : ''}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{task.initiator.name}</p>
                                                                <p className="text-sm text-gray-500">{task.initiator.email}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assignees</label>
                                                    <div className="space-y-2">
                                                        {task.assignees && task.assignees.length > 0 ? (
                                                            task.assignees.map((assignee) => (
                                                                <div key={assignee.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                                        <span className="text-sm font-medium text-blue-800">
                                                                            {assignee.name ? assignee.name.charAt(0) : ''}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-900">{assignee.name}</p>
                                                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                                            {assignee.job_title && <span>{assignee.job_title}</span>}
                                                                            {assignee.department && (
                                                                                <>
                                                                                    <span>•</span>
                                                                                    <span>{assignee.department}</span>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-gray-500 p-3 bg-white rounded-lg">No assignees</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Attachments */}
                                        {task.images && task.images.length > 0 && (
                                            <div className="bg-gray-50 p-6 rounded-lg">
                                                <h3 className="text-lg font-medium text-gray-900 mb-6">Attachments</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {task.images.map((image) => (
                                                        <div key={image.id} className="relative group">
                                                            <img
                                                                src={`/storage/${image.path}`}
                                                                alt={image.name}
                                                                className="w-full h-32 object-cover rounded-lg"
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                                <a
                                                                    href={`/storage/${image.path}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-white bg-black bg-opacity-50 px-4 py-2 rounded-full hover:bg-opacity-75 transition-all"
                                                                >
                                                                    View
                                                                </a>
                                                            </div>
                                                            <div className="mt-2">
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
