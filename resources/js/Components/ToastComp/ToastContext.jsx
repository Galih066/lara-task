// resources/js/Contexts/ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import ToastContainer from './ToastContainer';

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'blue') => {
        const id = new Date().getTime();
        setToasts((prev) => [...prev, { id, message, type, visible: true }]);

        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts((prev) => {
            return prev.map((toast) =>
                toast.id === id ? { ...toast, visible: false } : toast
            );
        });

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 300);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};
