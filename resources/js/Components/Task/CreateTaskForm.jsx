import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AssigneeSelect from './Form/AssigneeSelect';
import ImageUpload from './Form/ImageUpload';
import FormField from './Form/FormField';

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

                <div className={`relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-5xl sm:align-middle ${
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
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <FormField label="Title" required error={errors.title}>
                                                <input
                                                    type="text"
                                                    value={data.title}
                                                    onChange={e => setData('title', e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    placeholder="Enter task title"
                                                    required
                                                />
                                            </FormField>

                                            <AssigneeSelect
                                                value={data.assignees}
                                                onChange={(newValue) => setData('assignees', newValue)}
                                                users={users}
                                                error={errors.assignees}
                                            />

                                            <div className="md:col-span-2">
                                                <FormField label="Description" required error={errors.description}>
                                                    <textarea
                                                        value={data.description}
                                                        onChange={e => setData('description', e.target.value)}
                                                        rows={4}
                                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter task description"
                                                        required
                                                    />
                                                </FormField>
                                            </div>

                                            <FormField label="Due Date" required error={errors.due_date}>
                                                <input
                                                    type="date"
                                                    value={data.due_date}
                                                    onChange={e => setData('due_date', e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    required
                                                />
                                            </FormField>

                                            <FormField label="Priority" required error={errors.priority}>
                                                <select
                                                    value={data.priority}
                                                    onChange={e => setData('priority', e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    required
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                            </FormField>

                                            <div className="md:col-span-2">
                                                <ImageUpload
                                                    files={selectedFiles}
                                                    onFileChange={handleFileChange}
                                                    onRemoveFile={removeFile}
                                                    error={errors.images}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Create Task
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskForm;
