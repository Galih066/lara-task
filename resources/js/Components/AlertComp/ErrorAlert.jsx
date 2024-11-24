import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorAlert = ({ title, description, duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration && duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration]);

    if (!isVisible && onClose) {
        onClose();
    }

    const alert = (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: 50 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{
                        position: 'fixed',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 9999,
                        maxWidth: '24rem',
                        width: '100%'
                    }}
                >
                    <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                {/* Error Icon */}
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-6 w-6 text-red-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="ml-3 w-0 flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        {title}
                                    </h3>
                                    {description && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            {description}
                                        </p>
                                    )}
                                </div>

                                {/* Close Button */}
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md"
                                        onClick={() => setIsVisible(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(alert, document.body);
};

export default ErrorAlert;