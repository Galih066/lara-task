import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import Navigation from "@/Layouts/Navigation";
import { useState } from "react";
import {
    ChartBarSquareIcon,
    UsersIcon,
    DocumentCheckIcon,
    ArrowTrendingUpIcon,
    CalendarIcon,
    BellIcon
} from '@heroicons/react/24/solid';

const DashboardPage = ({ user }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        {
            title: "Active Projects",
            value: "12",
            change: "+2.5%",
            trend: "up",
            icon: ChartBarSquareIcon,
            description: "Projects currently in progress"
        },
        {
            title: "Total Tasks",
            value: "64",
            change: "+12.5%",
            trend: "up",
            icon: DocumentCheckIcon,
            description: "Tasks across all projects"
        },
        {
            title: "Team Members",
            value: "8",
            change: "0%",
            trend: "neutral",
            icon: UsersIcon,
            description: "Active team members"
        },
    ];

    const recentActivities = [
        { id: 1, type: 'task', title: 'Project X Documentation', time: '2 hours ago', status: 'completed' },
        { id: 2, type: 'comment', title: 'New comment on Task Y', time: '4 hours ago', status: 'pending' },
        { id: 3, type: 'project', title: 'New project created', time: '1 day ago', status: 'active' },
    ];

    const upcomingDeadlines = [
        { id: 1, title: 'UI Design Review', date: '2024-02-15', priority: 'high' },
        { id: 2, title: 'Backend API Integration', date: '2024-02-20', priority: 'medium' },
        { id: 3, title: 'User Testing', date: '2024-02-25', priority: 'low' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />

                <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between"
                    >
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
                                Welcome back, {user.name}
                            </h1>
                            <p className="mt-2 text-gray-500">
                                Here's what's happening with your projects today.
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="hidden sm:flex items-center space-x-4"
                        >
                            <button className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200">
                                <BellIcon className="h-6 w-6 text-gray-500" />
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                New Project
                            </button>
                        </motion.div>
                    </motion.div>

                    <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="relative backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <stat.icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <h2 className="text-sm font-medium text-gray-600">{stat.title}</h2>
                                    </div>
                                    <span className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-green-500' :
                                        stat.trend === 'down' ? 'text-red-500' :
                                            'text-gray-500'
                                        }`}>
                                        <ArrowTrendingUpIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">{stat.change}</span>
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                                    <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {['overview', 'activity', 'deadlines'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-6">
                        {activeTab === 'activity' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {recentActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className={`inline-block w-2 h-2 rounded-full ${activity.status === 'completed' ? 'bg-green-400' :
                                                    activity.status === 'pending' ? 'bg-yellow-400' :
                                                        'bg-blue-400'
                                                    }`} />
                                                <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'deadlines' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {upcomingDeadlines.map((deadline) => (
                                    <div
                                        key={deadline.id}
                                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-900">{deadline.title}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-2 py-1 text-xs rounded-full ${deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                    deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                    {deadline.priority}
                                                </span>
                                                <span className="text-sm text-gray-500">{deadline.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'overview' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        {['Create Task', 'Add Member', 'Schedule Meeting', 'Generate Report'].map((action) => (
                                            <button
                                                key={action}
                                                className="p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="text-lg font-medium text-gray-900">Recent Updates</h3>
                                    <div className="mt-4 space-y-4">
                                        {recentActivities.slice(0, 2).map((activity) => (
                                            <div key={activity.id} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{activity.title}</span>
                                                <span className="text-xs text-gray-500">{activity.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardPage;