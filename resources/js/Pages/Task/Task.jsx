import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import { PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Task = ({ user }) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <Head title="Tasks" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage and track your team's tasks efficiently
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-gray-400" />
                                Filters
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                New Task
                            </button>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <motion.div
                        initial={false}
                        animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Status Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                        <option value="all">All Status</option>
                                        <option value="todo">To Do</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>

                                {/* Priority Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Priority
                                    </label>
                                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                        <option value="all">All Priorities</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                {/* Assignee Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Assignee
                                    </label>
                                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                        <option value="all">All Assignees</option>
                                        <option value="me">Assigned to Me</option>
                                        <option value="unassigned">Unassigned</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Task Board */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* To Do Column */}
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">To Do</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    3
                                </span>
                            </div>
                            <div className="space-y-3">
                                {/* Task Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-blue-500 transition-colors duration-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <h4 className="text-sm font-medium text-gray-900">Design new landing page</h4>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            High
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Create a modern and responsive landing page design...</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                                                    JD
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">Due in 3 days</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* In Progress Column */}
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    2
                                </span>
                            </div>
                            <div className="space-y-3">
                                {/* Task Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-blue-500 transition-colors duration-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <h4 className="text-sm font-medium text-gray-900">Implement authentication</h4>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Medium
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Set up user authentication system with Laravel Breeze...</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                                                    AS
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">Due tomorrow</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Done Column */}
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Done</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    1
                                </span>
                            </div>
                            <div className="space-y-3">
                                {/* Task Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-blue-500 transition-colors duration-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <h4 className="text-sm font-medium text-gray-900">Setup project structure</h4>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Low
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Initialize project and set up basic folder structure...</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                                                    RK
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">Completed</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Task;
