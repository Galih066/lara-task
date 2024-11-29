import { motion } from "framer-motion";
import { UsersIcon, PlusIcon } from '@heroicons/react/24/solid';

const MemberHeader = ({ onAddMember }) => {
    return (
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
                    onClick={onAddMember}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Member
                </button>
            </motion.div>
        </div>
    );
};

export default MemberHeader;
