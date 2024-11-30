import { motion } from "framer-motion";

const EmptyState = ({ icon: Icon, title, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 px-4"
        >
            {Icon && (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gray-400" />
                </div>
            )}
            <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </motion.div>
    );
};

export default EmptyState;
