import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

const OrganizationPage = () => {
    const { user, organization: org } = usePage().props;
    const [organization] = useState({
        name: org?.org_name || "Not Set",
        email: org?.admin_email || "Not Set",
        description: org?.description || "No description available",
        industry: org?.industry || "Not Set",
        size: org?.size_category || "Not Set",
        location: org?.location || "Not Set",
        createdAt: org?.created_at ? new Date(org.created_at).toLocaleDateString() : "Not Set",
        stats: {
            totalMembers: org?.total_members || 0,
            totalTasks: org?.total_tasks || 0,
            completedTasks: org?.completed_tasks || 0
        }
    });

    return (
        <>
            <Head title="Organization Settings" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />

                <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Header Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="md:flex">
                                {/* Logo Section */}
                                <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-6 md:w-64 flex items-center justify-center">
                                    <div className="h-24 w-24 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">
                                            {organization.name.charAt(0)}
                                        </span>
                                    </div>
                                </div>

                                {/* Basic Info Section */}
                                <div className="p-6 md:flex-1">
                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                {organization.name}
                                            </h1>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {organization.email}
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    Member since {organization.createdAt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Members</p>
                                    <p className="text-2xl font-bold text-gray-900">{organization.stats.totalMembers}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                                    <p className="text-2xl font-bold text-gray-900">{organization.stats.totalTasks}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
                                    <p className="text-2xl font-bold text-gray-900">{organization.stats.completedTasks}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Details Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-xl shadow-sm p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Organization Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                        <p className="mt-2 text-gray-900">{organization.description}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                                        <p className="mt-2 text-gray-900">{organization.industry}</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Company Size</h3>
                                        <p className="mt-2 text-gray-900">{organization.size}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                        <p className="mt-2 text-gray-900">{organization.location}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default OrganizationPage;