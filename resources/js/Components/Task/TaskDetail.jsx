import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import moment from 'moment';

import TaskDates from './Detail/TaskDates';
import TaskStatus from './Detail/TaskStatus';
import TaskPeople from './Detail/TaskPeople';
import TaskAttachments from './Detail/TaskAttachments';

const TaskDetail = ({ taskId, onClose, isModalOpen: isOpen }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const getTimeRemaining = (startDate, dueDate) => {
        if (!startDate && !dueDate) {
            return {
                text: 'No dates set',
                class: 'text-gray-500'
            };
        }

        const now = moment();
        
        if (startDate) {
            const start = moment(startDate);
            if (now.isBefore(start)) {
                const daysToStart = start.diff(now, 'days');
                return {
                    text: `Starts in ${daysToStart} days`,
                    class: 'text-blue-600'
                };
            }
        }

        if (!dueDate) {
            return {
                text: 'No due date set',
                class: 'text-gray-500'
            };
        }

        const due = moment(dueDate);
        const diffDays = due.diff(now, 'days');

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
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'bg-blue-100 text-blue-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800'
        };
        return colors[priority] || colors.medium;
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-gray-100 text-gray-800'
        };
        return colors[status] || colors.pending;
    };

    const formatStatus = (status) => {
        return status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
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
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-[60] ${isVisible ? 'bg-opacity-25' : 'bg-opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <div
                className={`fixed inset-y-0 right-0 w-[800px] bg-white shadow-xl transform transition-all duration-300 ease-in-out z-[70] flex flex-col ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            >
                <div className="flex-none p-6 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : task ? (
                        <div className="space-y-6 pb-20">
                            <div>
                                <h3 className="text-2xl font-medium text-gray-900 mb-2">{task.title}</h3>
                                <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
                            </div>

                            <TaskStatus 
                                task={task}
                                getPriorityColor={getPriorityColor}
                                getStatusColor={getStatusColor}
                                formatStatus={formatStatus}
                                getTimeRemaining={getTimeRemaining}
                            />

                            <TaskDates 
                                task={task}
                                formatDate={formatDate}
                            />

                            <TaskPeople task={task} />

                            <TaskAttachments images={task.images} />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default TaskDetail;
