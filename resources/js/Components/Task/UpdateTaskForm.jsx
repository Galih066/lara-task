import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import AssigneeSelect from './Form/AssigneeSelect';
import ImageUpload from './Form/ImageUpload';

const UpdateTaskForm = ({ onClose, users, isModalOpen, isEntering, onSuccess }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        assignees: [],
        start_date: '',
        due_date: '',
        priority: 'medium',
        status: 'todo',
        images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        data.assignees.forEach(assignee => {
            formData.append('assignees[]', assignee);
        });
        formData.append('start_date', data.start_date);
        formData.append('due_date', data.due_date);
        formData.append('priority', data.priority);
        formData.append('status', data.status);
        selectedFiles.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        post('/task/store', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                setSelectedFiles([]);
                onClose();
                // Delay the success message and page refresh
                setTimeout(() => {
                    onSuccess();
                    setTimeout(() => {
                        router.visit(window.location.pathname);
                    }, 3000); // Wait for success message duration
                }, 300); // Wait for modal close animation
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        setData('images', files);
    };

    const removeFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
        setData('images', updatedFiles);
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className={`relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out ${isEntering ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}>
                    <div className="border-b border-gray-200 bg-white px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-900">Create New Task</h3>
                            <button
                                onClick={onClose}
                                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="w-full h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter task title"
                                        />
                                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Describe the task..."
                                        />
                                        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Task Details</h3>
                                    <div className="flex items-center gap-1 text-blue-600">
                                        <InformationCircleIcon className="h-4 w-4" />
                                        <p className="text-sm font-medium">Start and due dates can be set later</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className='space-y-4'>
                                            <div>
                                                <AssigneeSelect
                                                    users={users}
                                                    value={data.assignees}
                                                    onChange={value => setData('assignees', value)}
                                                />
                                                {errors.assignees && <p className="mt-2 text-sm text-red-600">{errors.assignees}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                                <input
                                                    type="date"
                                                    id="start_date"
                                                    value={data.start_date}
                                                    onChange={e => {
                                                        setData('start_date', e.target.value);
                                                        if (data.due_date && e.target.value > data.due_date) {
                                                            setData('due_date', e.target.value);
                                                        }
                                                    }}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                {errors.start_date && <p className="mt-2 text-sm text-red-600">{errors.start_date}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                                <select
                                                    id="priority"
                                                    value={data.priority}
                                                    onChange={e => setData('priority', e.target.value)}
                                                    className="w-full h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                                {errors.priority && <p className="mt-2 text-sm text-red-600">{errors.priority}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                                                <input
                                                    type="date"
                                                    id="due_date"
                                                    value={data.due_date}
                                                    onChange={e => setData('due_date', e.target.value)}
                                                    min={data.start_date || new Date().toISOString().split('T')[0]}
                                                    className="w-full h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                {errors.due_date && <p className="mt-2 text-sm text-red-600">{errors.due_date}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Attachments</h3>
                                <ImageUpload
                                    selectedFiles={selectedFiles}
                                    onFileChange={handleFileChange}
                                    onRemove={removeFile}
                                />
                                {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images}</p>}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Creating...' : 'Create Task'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaskForm;
