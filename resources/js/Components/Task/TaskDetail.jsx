import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const TaskDetail = ({ taskId, onClose, isModalOpen, isEntering }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className={`relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out ${
                    isEntering ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
                }`}>
                    <div className="border-b border-gray-200 bg-white px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-900">Task Details</h3>
                            <button
                                onClick={onClose}
                                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-600 py-8">{error}</div>
                        ) : task && (
                            <div className="space-y-8">
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

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Task Details</h3>
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
                                                <p className="text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Initiator</label>
                                                <p className="text-gray-900">{task.initiator}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                                    <a
                                                        href={`/storage/${image.path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="text-white">View</span>
                                                    </a>
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
    );
};

export default TaskDetail;
