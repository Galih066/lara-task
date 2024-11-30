import { Link, useForm } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation({ user }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { post } = useForm();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Left side */}
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center"
                            >
                                <span className="text-white font-semibold">T</span>
                            </motion.div>
                            <span className="text-lg font-semibold text-gray-900">TaskFlow</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                href="/dashboard"
                                className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/tasks"
                                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-150"
                            >
                                Tasks
                            </Link>
                            {
                                (user.role === 'admin' || user.role === 'owner') && (
                                    <Link
                                        href="/member"
                                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-150"
                                    >
                                        Members
                                    </Link>
                                )
                            }
                            <Link
                                href="/profile"
                                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-150"
                            >
                                Profile
                            </Link>
                        </nav>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
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

                        {/* User Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleDropdown}
                                className="flex items-center gap-3 focus:outline-none"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">{user.name.charAt(0)}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    {user.name}
                                </span>
                                <svg
                                    className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100"
                                    >
                                        {/* User Info Section */}
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>

                                        {/* Main Menu Items */}
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profile Settings
                                            </Link>
                                        </div>

                                        {/* Logout Section */}
                                        <div className="py-1">
                                            <Link
                                                href="#"
                                                onClick={logoutAction}
                                                as="button"
                                                className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <svg className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
                                                </svg>
                                                Logout
                                            </Link>
                                        </div>
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
                        className="md:hidden border-t border-gray-100"
                    >
                        <nav className="px-4 py-3 space-y-1">
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/tasks"
                                className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                                Tasks
                            </Link>
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                                Profile
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}