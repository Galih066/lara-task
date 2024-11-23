import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import Navigation from "@/Layouts/Navigation";

const DashboardPage = () => {
    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 animate-gradient-x">
                {/* Header */}
                <Navigation />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center sm:text-left"
                    >
                        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">Welcome back, John!</h1>
                        <p className="mt-2 text-gray-500">Here's what's happening with your projects today.</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { title: "Active Projects", value: "12", change: "+2.5%", color: "blue" },
                            { title: "Total Tasks", value: "64", change: "+12.5%", color: "sky" },
                            { title: "Team Members", value: "8", change: "0%", color: "blue" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-600">{stat.title}</h2>
                                    <span className={`text-${stat.color}-500 text-sm font-medium`}>{stat.change}</span>
                                </div>
                                <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 sm:mt-8 backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-3 sm:space-y-4">
                            {[
                                "New project 'E-commerce Platform' created",
                                "Task 'Design Homepage' completed",
                                "John Doe joined the team",
                                "Project meeting scheduled for tomorrow",
                            ].map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-blue-50/50 transition-colors duration-200"
                                >
                                    <div className={`w-2 h-2 rounded-full bg-${["blue", "sky", "blue"][index % 2]}-500`} />
                                    <p className="text-sm sm:text-base text-gray-600">{activity}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
};

export default DashboardPage;