import { Head, Link, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const DashboardPage = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { post } = useForm();

    const menuItems = ["Dashboard", "Team", "Projects", "Calendar", "Reports"];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logoutAction = (event) => {
        event.preventDefault();
        post('/logout', {
            preserveScroll: true,
        })
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 animate-gradient-x">
                {/* Header */}
                <header className="bg-white/60 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Left side */}
                            <div className="flex items-center gap-4 sm:gap-8">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 h-8 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-xl flex items-center justify-center"
                                >
                                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </motion.div>
                                {/* Desktop Navigation */}
                                <nav className="hidden md:flex space-x-6 lg:space-x-8">
                                    {menuItems.map((item) => (
                                        <motion.button
                                            key={item}
                                            onClick={() => setActiveTab(item)}
                                            whileHover={{ y: -2 }}
                                            className={`${activeTab === item
                                                ? "text-blue-600"
                                                : "text-gray-600"
                                                } hover:text-blue-500 transition-colors duration-200 font-medium`}
                                        >
                                            {item}
                                        </motion.button>
                                    ))}
                                </nav>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-4">
                                {/* Mobile menu button */}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleMobileMenu}
                                    className="p-2 rounded-lg text-gray-600 hover:bg-blue-50 md:hidden"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {isMobileMenuOpen ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        )}
                                    </svg>
                                </motion.button>

                                {/* Notification button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-lg text-gray-600 hover:bg-blue-50 hidden sm:block"
                                >
                                    <div className="relative">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                            3
                                        </span>
                                    </div>
                                </motion.button>

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleDropdown}
                                        className="flex items-center space-x-3 focus:outline-none"
                                    >
                                        {/* Avatar */}
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500/10 to-sky-500/10 flex items-center justify-center">
                                            <span className="text-sm font-medium text-blue-600">J</span>
                                        </div>
                                        {/* User Name */}
                                        <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                            John
                                        </span>
                                        {/* Dropdown Arrow */}
                                        <svg
                                            className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </motion.button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <Link
                                                    href="/profile"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    href="#"
                                                    onClick={logoutAction}
                                                    as="button"
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                                                >
                                                    Logout
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden border-t border-gray-200"
                            >
                                <nav className="px-4 py-3 space-y-1">
                                    {menuItems.map((item) => (
                                        <motion.button
                                            key={item}
                                            onClick={() => {
                                                setActiveTab(item);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`${activeTab === item
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-600"
                                                } w-full text-left px-4 py-2 rounded-lg transition-colors duration-200`}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {item}
                                        </motion.button>
                                    ))}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </header>

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