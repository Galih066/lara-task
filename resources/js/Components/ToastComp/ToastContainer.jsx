// resources/js/Components/ToastContainer.js
import React from 'react';
import Toast from './Toast';

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-5 right-5 space-y-2 z-50">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    visible={toast.visible}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
