import { Fragment, useRef, useEffect, useState } from 'react';
import { XMarkIcon, ChevronUpDownIcon, UserIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import { getInitials } from '../../../utils/stringUtils';

const AssigneeSelect = ({ value, onChange, users, error }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const assigneeRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (assigneeRef.current && !assigneeRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredUsers = query === ''
        ? users
        : users.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            getInitials(user.name).toLowerCase().includes(query.toLowerCase())
        );

    const toggleAssignee = (userId) => {
        const newAssignees = value.includes(userId)
            ? value.filter(id => id !== userId)
            : [...value, userId];
        onChange(newAssignees);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            setIsOpen(true);
            setQuery('');
        }
    };

    // Get frequently collaborated users (mock implementation - you can implement your own logic)
    const getFrequentCollaborators = () => {
        return users.slice(0, 3); // Just returning first 3 users as an example
    };

    return (
        <div ref={assigneeRef}>
            <label htmlFor="assignees" className="block text-sm font-medium leading-6 text-gray-900">
                Assignees <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-2">
                <div className="relative">
                    <div 
                        className="min-h-[42px] relative w-full cursor-text rounded-md bg-white text-left border-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
                        onClick={() => setIsOpen(true)}
                    >
                        <div className="flex flex-wrap gap-1 p-1">
                            {value.length > 0 ? (
                                value.map((userId) => {
                                    const user = users.find(u => u.id === userId);
                                    if (!user) return null;
                                    return (
                                        <span
                                            key={user.id}
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                                        >
                                            <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                                                {getInitials(user.name)}
                                            </span>
                                            {user.name}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleAssignee(user.id);
                                                }}
                                                className="text-blue-400 hover:text-blue-500 focus:outline-none"
                                            >
                                                <XMarkIcon className="h-4 w-4" />
                                            </button>
                                        </span>
                                    );
                                })
                            ) : (
                                <div className="flex items-center gap-2 px-2 py-1.5 text-gray-500">
                                    <UserIcon className="h-5 w-5" />
                                    <span>No assignees</span>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }}
                        >
                            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <Transition
                        show={isOpen}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <div className="px-3 py-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 pl-8 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        placeholder="Search users..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <UserIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            {query === '' && (
                                <div className="px-3 py-2 border-b border-gray-100">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Frequent Collaborators
                                    </h3>
                                    <div className="mt-2 space-y-1">
                                        {getFrequentCollaborators().map((user) => (
                                            <button
                                                key={user.id}
                                                className={`flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
                                                    value.includes(user.id)
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                                onClick={() => toggleAssignee(user.id)}
                                            >
                                                <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                                                    {getInitials(user.name)}
                                                </span>
                                                {user.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="max-h-52 overflow-auto">
                                {filteredUsers.length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-gray-500">
                                        No users found
                                    </div>
                                ) : (
                                    <div className="py-2">
                                        {filteredUsers.map((user) => (
                                            <button
                                                key={user.id}
                                                className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${
                                                    value.includes(user.id)
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                                onClick={() => toggleAssignee(user.id)}
                                            >
                                                <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                                                    {getInitials(user.name)}
                                                </span>
                                                <span className="flex-1 text-left">
                                                    {user.name}
                                                </span>
                                                {value.includes(user.id) && (
                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="px-3 py-2 border-t border-gray-100">
                                <div className="text-xs text-gray-500">
                                    <span className="font-medium">Pro tips:</span>
                                    <ul className="mt-1 space-y-1">
                                        <li>Press @ or Ctrl+A to quickly assign</li>
                                        <li>Use arrow keys to navigate</li>
                                        <li>Press Esc to close</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default AssigneeSelect;
