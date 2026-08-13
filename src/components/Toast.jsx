import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';


// eslint-disable-next-line react-refresh/only-export-components
export const showToast = ({ message, type = 'success', duration = 3500 }) => {
    const event = new CustomEvent('custom-toast', { detail: { message, type, duration } });
    document.dispatchEvent(event);
};

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    {/* listen for toast events */}
    useEffect(() => {
        const handleShowToast = (e) => {
            const id = Date.now();
            const newToast = { id, ...e.detail, isLeaving: false };
            setToasts((prev) => [...prev, newToast]);
            {/* auto remove with exit animation */}
            setTimeout(() => {
                // eslint-disable-next-line react-hooks/immutability
                triggerExitAnimation(id);
            }, newToast.duration);
        };

        document.addEventListener('custom-toast', handleShowToast);
        return () => document.removeEventListener('custom-toast', handleShowToast);
    }, []);

    const triggerExitAnimation = (id) => {
        setToasts((prev) => prev.map(t => t.id === id ? { ...t, isLeaving: true } : t));
        setTimeout(() => {
            setToasts((prev) => prev.filter(t => t.id !== id));
        }, 300);
    };

    if (toasts.length === 0) return null;

    return (
        <>
            {/* responsive toast container */}
            <div className="fixed top-5 left-4 right-4 sm:top-8 sm:left-auto sm:right-8 z-99999 flex flex-col gap-3 pointer-events-none sm:w-full sm:max-w-95 items-center sm:items-end">
                {toasts.map((toast) => (
                    <div 
                        key={toast.id} 
                        className="pointer-events-auto flex items-center justify-between w-full max-w-full p-3.5 bg-[#121212]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform transition-all"
                        style={{ 
                            animation: toast.isLeaving 
                                ? 'slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
                                : 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
                        }}
                    >
                        <div className="flex items-center gap-3 md:gap-3.5 pl-1 w-[85%]">
                            {/* icon section */}
                            <div className={`flex items-center justify-center shrink-0 min-w-8 w-8 h-8 rounded-full ${toast.type === 'danger' ? 'bg-red-500/15 text-red-400' : toast.type === 'info' ? 'bg-blue-500/15 text-blue-400' : 'bg-[#80B500]/15 text-[#80B500]'}`}>
                                {toast.type === 'danger' && <FiAlertCircle className="text-[16px]" />}
                                {toast.type === 'info' && <FiInfo className="text-[16px]" />}
                                {(toast.type === 'success' || !toast.type) && <FiCheckCircle className="text-[16px]" />}
                            </div>
                            {/* text message */}
                            <p className="text-[12.5px] sm:text-[13.5px] font-nuni font-bold text-white tracking-wide leading-snug wrap-break-word pr-2">
                                {toast.message}
                            </p>
                        </div>
                        {/* close button */}
                        <button onClick={() => triggerExitAnimation(toast.id)} className="text-gray-400 hover:text-white transition-colors cursor-pointer p-2 rounded-full hover:bg-white/5 shrink-0">
                            <FiX className="text-[15px]" />
                        </button>
                    </div>
                ))}
            </div>
            {/* custom entrance and exit animations */}
            <style>{`
                @keyframes slideInRight {
                    from { 
                        opacity: 0; 
                        transform: translateX(20px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0) scale(1); 
                    }
                }
                @keyframes slideOutRight {
                    from { 
                        opacity: 1; 
                        transform: translateX(0) scale(1); 
                    }
                    to { 
                        opacity: 0; 
                        transform: translateX(20px) scale(0.95); 
                    }
                }
            `}</style>
        </>
    );
};

export default ToastContainer;