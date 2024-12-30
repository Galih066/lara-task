import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TaskListModal = ({ isOpen, onClose, date, tasks }) => {
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20';
            case 'medium':
                return 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20';
            case 'low':
                return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';
            default:
                return 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10';
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'todo':
                return 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10';
            case 'in_progress':
                return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20';
            case 'review':
                return 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20';
            case 'done':
                return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';
            default:
                return 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'todo':
                return '';
            case 'in_progress':
                return '';
            case 'review':
                return '';
            case 'done':
                return '';
            default:
                return '';
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-md bg-white shadow-xl transition-all">
                                <div className="px-6 py-4 border-b bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                                            Tasks for {formatDate(date)}
                                            <span className="ml-2 text-sm font-normal text-gray-500">
                                                ({tasks.length} {tasks.length === 1 ? 'task' : 'tasks'})
                                            </span>
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                                            onClick={onClose}
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                                    {tasks.length === 0 ? (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500 text-lg">No tasks scheduled for this date</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {tasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="group bg-white border rounded-md p-4 hover:shadow-md transition-all duration-200"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center">
                                                                <span className="text-lg">{getStatusIcon(task.status)}</span>
                                                                <h4 className="text-base m-0 font-medium text-gray-900">
                                                                    {task.title}
                                                                </h4>
                                                            </div>
                                                            {task.description && (
                                                                <div className="mt-2 mb-3">
                                                                    <p className="text-sm text-gray-600 text-left">
                                                                        {task.description}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span
                                                                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityBadgeColor(
                                                                        task.priority
                                                                    )}`}
                                                                >
                                                                    Priority: {task.priority}
                                                                </span>
                                                                <span
                                                                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
                                                                        task.status
                                                                    )}`}
                                                                >
                                                                    Status: {task.status}
                                                                </span>
                                                                {task.assignee && (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                        {task.assignee}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TaskListModal;
