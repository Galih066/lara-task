import { motion } from "framer-motion";
import moment from "moment";
import { useState, useMemo, useEffect } from "react";
import { PencilSquareIcon, TrashIcon, EnvelopeIcon, UsersIcon } from '@heroicons/react/24/solid';
import TablePagination from "./TablePagination";
import EmptyState from "@/Components/EmptyState";

const MemberTable = ({ members }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRow, setSelectedRow] = useState(null);
    const itemsPerPage = 5;

    const paginatedMembers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return members.slice(startIndex, endIndex);
    }, [members, currentPage]);

    const totalPages = Math.ceil(members.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSelectedRow(null);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT') return;

            const currentIndex = selectedRow !== null ? selectedRow : -1;
            const maxIndex = paginatedMembers.length - 1;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        setSelectedRow(currentIndex - 1);
                    } else if (currentIndex === 0 && currentPage > 1) {
                        setCurrentPage(prev => prev - 1);
                        setSelectedRow(itemsPerPage - 1);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < maxIndex) {
                        setSelectedRow(currentIndex + 1);
                    } else if (currentIndex === maxIndex && currentPage < totalPages) {
                        setCurrentPage(prev => prev + 1);
                        setSelectedRow(0);
                    }
                    break;
                case 'Enter':
                    if (selectedRow !== null) {
                        console.log('Selected member:', paginatedMembers[selectedRow]);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedRow, currentPage, paginatedMembers.length, totalPages]);

    useEffect(() => {
        if (selectedRow !== null) {
            const element = document.getElementById(`member-row-${selectedRow}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [selectedRow]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
        >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan="6">
                                        <EmptyState
                                            icon={UsersIcon}
                                            title="No members found"
                                            description="Try adjusting your search or filter to find what you're looking for"
                                        />
                                    </td>
                                </tr>
                            ) : (
                                paginatedMembers.map((member, index) => (
                                    <tr
                                        key={member.profileId}
                                        id={`member-row-${index}`}
                                        className={`hover:bg-gray-50 ${selectedRow === index ? 'bg-blue-50' : ''}`}
                                        onClick={() => setSelectedRow(index)}
                                        tabIndex={0}
                                        role="row"
                                        aria-selected={selectedRow === index}
                                    >
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
                                                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                                                    {member.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default MemberTable;
