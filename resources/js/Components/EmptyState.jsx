import { motion } from "framer-motion";

const EmptyState = ({ icon, title, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 px-4"
        >
            {icon && (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    {icon}
                </div>
            )}
            <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </motion.div>
    );
};

export default EmptyState;
