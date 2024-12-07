import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import { motion } from "framer-motion";

const OrganizationPage = ({ user }) => {
    const [organization] = useState({
        name: "TaskFlow Inc.",
        logo: "/dummy-logo.png",
        description: "Leading provider of task management solutions",
        industry: "Software Development",
        size: "50-100 employees",
        founded: "2020",
        location: "San Francisco, CA",
        website: "www.taskflow.com",
        contact: {
            email: "contact@taskflow.com",
            phone: "+1 (555) 123-4567",
            address: "123 Tech Street, San Francisco, CA 94105"
        },
        stats: {
            totalEmployees: 75,
            departments: 5,
            activeProjects: 12,
            completedProjects: 48
        }
    });

    return (
        <>
            <Head title="Organization Settings" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />

                <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-4 sm:mb-6">
                                <div className="h-20 w-20 sm:h-24 sm:w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-4 sm:mb-0">
                                    <span className="text-2xl sm:text-3xl font-bold text-white">{organization.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{organization.name}</h1>
                                    <p className="text-sm sm:text-base text-gray-500 mt-1">{organization.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">General Information</h2>
                                    <div className="space-y-3">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Industry</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1">{organization.industry}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Company Size</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1">{organization.size}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Founded</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1">{organization.founded}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Website</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1">{organization.website}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Contact Information</h2>
                                    <div className="space-y-3">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Email</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1 break-all">{organization.contact.email}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Phone</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1">{organization.contact.phone}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Address</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1">{organization.contact.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
                        >
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Organization Statistics</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                                    <label className="text-xs sm:text-sm font-medium text-blue-600">Total Employees</label>
                                    <p className="text-xl sm:text-2xl font-bold text-blue-700 mt-1">{organization.stats.totalEmployees}</p>
                                </div>
                                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                                    <label className="text-xs sm:text-sm font-medium text-purple-600">Departments</label>
                                    <p className="text-xl sm:text-2xl font-bold text-purple-700 mt-1">{organization.stats.departments}</p>
                                </div>
                                <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                                    <label className="text-xs sm:text-sm font-medium text-green-600">Active Projects</label>
                                    <p className="text-xl sm:text-2xl font-bold text-green-700 mt-1">{organization.stats.activeProjects}</p>
                                </div>
                                <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
                                    <label className="text-xs sm:text-sm font-medium text-orange-600">Completed Projects</label>
                                    <p className="text-xl sm:text-2xl font-bold text-orange-700 mt-1">{organization.stats.completedProjects}</p>
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