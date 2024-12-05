import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CreateTaskForm = ({ onClose, users, isModalOpen, isEntering }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        assignees: [],
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
        formData.append('due_date', data.due_date);
        formData.append('priority', data.priority);
        formData.append('status', data.status);
        selectedFiles.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        post(route('tasks.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setSelectedFiles([]);
                onClose();
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
            onFinish: () => {
                if (Object.keys(errors).length === 0) {
                    reset();
                    setSelectedFiles([]);
                    onClose();
                }
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
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-out ${
                        isEntering ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={onClose}
                />

                <div className={`relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle ${
                    isEntering ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95'
                }`}>
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                        <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                    Create New Task
                                </h3>
                                <div className="mt-6">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                Title <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <input
                                                    type="text"
                                                    id="title"
                                                    value={data.title}
                                                    onChange={e => setData('title', e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    placeholder="Enter task title"
                                                    required
                                                />
                                            </div>
                                            {errors.title && (
                                                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                Description <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <textarea
                                                    id="description"
                                                    value={data.description}
                                                    onChange={e => setData('description', e.target.value)}
                                                    rows={4}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    placeholder="Enter task description"
                                                    required
                                                />
                                            </div>
                                            {errors.description && (
                                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="assignees" className="block text-sm font-medium leading-6 text-gray-900">
                                                Assignees <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <select
                                                    id="assignees"
                                                    multiple
                                                    value={data.assignees}
                                                    onChange={e => setData('assignees', Array.from(e.target.selectedOptions, option => option.value))}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    required
                                                >
                                                    {users.map(user => (
                                                        <option key={user.id} value={user.id} className="py-1">
                                                            {user.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple assignees</p>
                                            </div>
                                            {errors.assignees && (
                                                <p className="mt-2 text-sm text-red-600">{errors.assignees}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="due_date" className="block text-sm font-medium leading-6 text-gray-900">
                                                Due Date <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <input
                                                    type="date"
                                                    id="due_date"
                                                    value={data.due_date}
                                                    onChange={e => setData('due_date', e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    required
                                                />
                                            </div>
                                            {errors.due_date && (
                                                <p className="mt-2 text-sm text-red-600">{errors.due_date}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">
                                                Priority <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <select
                                                    id="priority"
                                                    value={data.priority}
                                                    onChange={e => setData('priority', e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    required
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                            </div>
                                            {errors.priority && (
                                                <p className="mt-2 text-sm text-red-600">{errors.priority}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                                                Images
                                            </label>
                                            <div className="relative mt-2">
                                                <input
                                                    type="file"
                                                    id="images"
                                                    onChange={handleFileChange}
                                                    multiple
                                                    accept="image/*"
                                                    className="block w-full text-sm text-gray-500 
                                                        file:mr-4 file:py-2 file:px-4 
                                                        file:rounded-md file:border-0 
                                                        file:text-sm file:font-semibold 
                                                        file:bg-blue-50 file:text-blue-700 
                                                        hover:file:bg-blue-100 
                                                        focus-within:outline-none focus-within:ring-2 
                                                        focus-within:ring-blue-600 focus-within:ring-offset-2"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">You can select multiple images</p>
                                            </div>
                                            {errors.images && (
                                                <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                                            )}

                                            {selectedFiles.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    {selectedFiles.map((file, index) => (
                                                        <div key={index} className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 group hover:bg-gray-100">
                                                            <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                                                                {file.name}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(index)}
                                                                className="shrink-0 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md p-1 transition-colors duration-200"
                                                            >
                                                                <XMarkIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Creating...' : 'Create Task'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskForm;
