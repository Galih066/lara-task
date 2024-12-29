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
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-4 sm:mb-6">
                                <div className="h-20 w-20 sm:h-24 sm:w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-4 sm:mb-0">
                                    <span className="text-2xl sm:text-3xl font-bold text-white">{organization.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{organization.name}</h1>
                                    <p className="text-gray-500 mt-1">Admin Email: {organization.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="bg-blue-50 rounded-lg p-4"
                                >
                                    <h3 className="text-sm font-medium text-blue-600">Total Members</h3>
                                    <p className="text-2xl font-bold text-blue-700 mt-1">{organization.stats.totalMembers}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="bg-green-50 rounded-lg p-4"
                                >
                                    <h3 className="text-sm font-medium text-green-600">Total Tasks</h3>
                                    <p className="text-2xl font-bold text-green-700 mt-1">{organization.stats.totalTasks}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="bg-purple-50 rounded-lg p-4"
                                >
                                    <h3 className="text-sm font-medium text-purple-600">Completed Tasks</h3>
                                    <p className="text-2xl font-bold text-purple-700 mt-1">{organization.stats.completedTasks}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default OrganizationPage;