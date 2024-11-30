import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/solid';

const MemberFilters = ({ searchQuery, setSearchQuery, selectedRole, setSelectedRole }) => {
    const roles = [
        { value: 'all', label: 'All Roles' },
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search members..."
                            className="block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg 
                                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                     placeholder-gray-400 transition-colors duration-200
                                     hover:border-gray-300"
                        />
                    </div>
                </div>

                <div className="sm:w-48">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FunnelIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </div>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="block w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg
                                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                     appearance-none bg-white transition-colors duration-200
                                     hover:border-gray-300 cursor-pointer"
                        >
                            {roles.map((role) => (
                                <option key={role.value} value={role.value}>
                                    {role.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Quick Filters:</span>
                    <button
                        onClick={() => setSelectedRole('admin')}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                  ${selectedRole === 'admin'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            } transition-colors duration-200`}
                    >
                        Admins
                    </button>
                    <button
                        onClick={() => setSelectedRole('user')}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                  ${selectedRole === 'user'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            } transition-colors duration-200`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setSelectedRole('all')}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                  ${selectedRole === 'all'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            } transition-colors duration-200`}
                    >
                        All
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MemberFilters;
