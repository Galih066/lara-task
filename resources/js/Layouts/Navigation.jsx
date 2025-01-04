import { Link, useForm, usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation({ user }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { post } = useForm();
    const { url } = usePage();

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

                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                href="/dashboard"
                                className={`relative px-3 py-2 text-sm font-medium ${
                                    url === '/dashboard' 
                                    ? 'text-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                                } transition-all duration-200 ease-in-out group`}
                            >
                                {url === '/dashboard' && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 bg-blue-50 rounded-md -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                Dashboard
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                            </Link>
                            <Link
                                href="/task"
                                className={`relative px-3 py-2 text-sm font-medium ${
                                    url.startsWith('/task') 
                                    ? 'text-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                                } transition-all duration-200 ease-in-out group`}
                            >
                                {url.startsWith('/task') && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 bg-blue-50 rounded-md -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                Tasks
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                            </Link>
                            {(user.role === 'admin' || user.role === 'owner') && (
                                <Link
                                    href="/member"
                                    className={`relative px-3 py-2 text-sm font-medium ${
                                        url.startsWith('/member') 
                                        ? 'text-blue-600' 
                                        : 'text-gray-600 hover:text-blue-600'
                                    } transition-all duration-200 ease-in-out group`}
                                >
                                    {url.startsWith('/member') && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute inset-0 bg-blue-50 rounded-md -z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                    Members
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                                </Link>
                            )}
                            <Link
                                href="/profile"
                                className={`relative px-3 py-2 text-sm font-medium ${
                                    url === '/profile' 
                                    ? 'text-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                                } transition-all duration-200 ease-in-out group`}
                            >
                                {url === '/profile' && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 bg-blue-50 rounded-md -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                Profile
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
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

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100"
                                    >
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>

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

                                        {(user.role === 'admin' || user.role === 'owner') && (
                                            <div className="py-1">
                                                <Link
                                                    href="/organization"
                                                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    Organization Settings
                                                </Link>
                                            </div>
                                        )}

                                        <div className="py-1">
                                            <Link
                                                href="#"
                                                onClick={logoutAction}
                                                as="button"
                                                className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <svg className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/dashboard"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    url === '/dashboard' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/task"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    url.startsWith('/task') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                Tasks
                            </Link>
                            {(user.role === 'admin' || user.role === 'owner') && (
                                <Link
                                    href="/member"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        url.startsWith('/member') 
                                        ? 'text-blue-600 bg-blue-50' 
                                        : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    Members
                                </Link>
                            )}
                            <Link
                                href="/profile"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    url === '/profile' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                Profile
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}