// resources/js/Components/Toast.js
import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose, visible }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`bg-${type}-500 text-white p-4 rounded shadow-md transition-opacity duration-300 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
            role="alert"
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-lg">
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Toast;
