import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import moment from "moment";
import SuccessAlert from "@/Components/AlertComp/SuccessAlert";
import {
    UsersIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    TrashIcon,
    EnvelopeIcon,
    PhoneIcon
} from '@heroicons/react/24/solid';
import Navigation from "@/Layouts/Navigation";

const MemberPage = ({ user, members }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, reset } = useForm({
        username: '',
        email: '',
        role: 'member',
        department: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        post('member/add-member', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
                setShowSuccess(true);
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            }
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
        requestAnimationFrame(() => {
            setIsEntering(true);
        });
    };

    const closeModal = () => {
        setIsClosing(true);
        setIsEntering(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === 'all' || member.role.toLowerCase() === selectedRole.toLowerCase();
        return matchesSearch && matchesRole;
    });

    return (
        <>
            <Head title="Members" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />
                {showSuccess && (
                    <SuccessAlert
                        title="Member Added"
                        message="New member has been successfully added."
                        onClose={() => setShowSuccess(false)}
                    />
                )}
                <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 flex items-center gap-3">
                                <UsersIcon className="h-8 w-8 text-blue-600" />
                                Organization Members
                            </h1>
                            <p className="mt-2 text-gray-500">Manage your organization members and their roles</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-4 sm:mt-0"
                        >
                            <button
                                onClick={openModal}
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Add Member
                            </button>
                        </motion.div>
                    </div>

                    {/* Filters Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {/* Search */}
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {/* Role Filter */}
                        <div>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Members List */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-6"
                    >
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredMembers.map((member) => (
                                            <tr key={member.profileId} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <span className="text-blue-600 font-medium text-sm">
                                                                {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                            <div className="text-sm text-gray-500">Joined {moment(member.joinDate).format('DD MMMM YYYY')}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col space-y-1">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <EnvelopeIcon className="h-4 w-4 mr-1" />
                                                            {member.email}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <PhoneIcon className="h-4 w-4 mr-1" />
                                                            {member.phone}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {member.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.isActive === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {member.isActive}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-3">
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            <PencilSquareIcon className="h-5 w-5" />
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>

            {/* Add Member Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div
                            className={`fixed inset-0 bg-gray-500 transition-opacity duration-300 ease-out
                                ${isEntering ? 'opacity-75' : 'opacity-0'}`}
                            onClick={closeModal}
                        />

                        {/* Modal panel */}
                        <div className={`relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
                            ${isEntering
                                ? 'opacity-100 translate-y-0 sm:scale-100'
                                : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}`}>
                            <style jsx>{`
                                @keyframes modal-enter {
                                    from {
                                        opacity: 0;
                                        transform: translateY(1rem) scale(0.95);
                                    }
                                    to {
                                        opacity: 1;
                                        transform: translateY(0) scale(1);
                                    }
                                }
                            `}</style>
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Member</h3>
                                <div className="mt-4">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-5">
                                            {/* Username Field */}
                                            <div>
                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                    Username <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <UsersIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="username"
                                                        value={data.username}
                                                        onChange={e => setData('username', e.target.value)}
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border text-sm shadow-sm pl-10 
                                                            ${errors.username 
                                                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                            } rounded-md`}
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.username && (
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.username && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                                                )}
                                            </div>

                                            {/* Email Field */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border text-sm shadow-sm pl-10 
                                                            ${errors.email 
                                                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                            } rounded-md`}
                                                        placeholder="john@example.com"
                                                    />
                                                    {errors.email && (
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.email && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Role Field */}
                                            <div>
                                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                    Role <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        value={data.role}
                                                        onChange={e => setData('role', e.target.value)}
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border text-sm shadow-sm
                                                            ${errors.role 
                                                                ? 'border-red-300 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                            } rounded-md`}
                                                    >
                                                        <option value="member">Member</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    {errors.role && (
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.role && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                                                )}
                                            </div>

                                            {/* Department Field */}
                                            <div>
                                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                                    Department <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="department"
                                                        id="department"
                                                        value={data.department}
                                                        onChange={e => setData('department', e.target.value)}
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border text-sm shadow-sm
                                                            ${errors.department 
                                                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                            } rounded-md`}
                                                        placeholder="Engineering"
                                                    />
                                                    {errors.department && (
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.department && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.department}</p>
                                                )}
                                            </div>

                                            {/* Phone Field */}
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        id="phone"
                                                        value={data.phone}
                                                        onChange={e => setData('phone', e.target.value)}
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border text-sm shadow-sm pl-10 
                                                            ${errors.phone 
                                                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                            } rounded-md`}
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                    {errors.phone && (
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.phone && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Adding Member...
                                                    </>
                                                ) : (
                                                    'Add Member'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MemberPage;