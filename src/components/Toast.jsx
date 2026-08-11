import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { IoCart, IoHeart, IoClose } from 'react-icons/io5';

let listeners = [];
let toastId = 0;

// eslint-disable-next-line react-refresh/only-export-components
export const showToast = ({ message, subMessage, icon, type = 'success' }) => {
    const id = ++toastId;
    listeners.forEach((listener) => listener.add({ id, message, subMessage, icon, type }));
    return id;
};

const typeConfig = {
    success: {
        accent: '#9BE15D',
        accentDim: '#5C8A2E',
        defaultIcon: <IoCart />,
    },
    danger: {
        accent: '#FF6B9D',
        accentDim: '#B2436A',
        defaultIcon: <IoHeart />,
    },
};

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const listener = {
            add: (toast) => {
                setToasts((prev) => [...prev, { ...toast, leaving: false }]);
                setTimeout(() => {
                    setToasts((prev) =>
                        prev.map((t) => (t.id === toast.id ? { ...t, leaving: true } : t))
                    );
                    setTimeout(() => {
                        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                    }, 350);
                }, 3200);
            },
        };
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    }, []);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 350);
    }, []);

    return createPortal(
        <div className="fixed top-5 right-5 z-9999 flex flex-col gap-3 items-end pointer-events-none px-4 sm:px-0">
            {toasts.map((toast) => {
                const cfg = typeConfig[toast.type] || typeConfig.success;
                return (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto group relative w-full sm:min-w-[320px] sm:max-w-95 rounded-2xl overflow-hidden ${
                            toast.leaving ? 'animate-toastOut' : 'animate-toastIn'
                        }`}
                        style={{
                            background: '#111214',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: `0 20px 45px -14px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.4), 0 0 30px -10px ${cfg.accent}55`,
                        }}
                    >
                        <div className="relative flex items-center gap-3.5 pl-4 pr-4 py-4">
                            {/* icon with glowing ring */}
                            <div className="relative shrink-0 w-10 h-10 flex items-center justify-center">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-[16px]"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: `1px solid ${cfg.accent}70`,
                                        color: cfg.accent,
                                        boxShadow: `0 0 14px -2px ${cfg.accent}90`,
                                    }}
                                >
                                    {toast.icon || cfg.defaultIcon}
                                </div>
                            </div>
                            {/* text */}
                            <div className="flex-1 min-w-0">
                                <p className="font-int font-bold text-[14.5px] text-white/95 truncate tracking-tight">
                                    {toast.message}
                                </p>
                                {toast.subMessage && (
                                    <p className="font-nuni text-[12px] text-white/40 truncate mt-0.5">
                                        {toast.subMessage}
                                    </p>
                                )}
                            </div>
                            {/* close - shows on hover */}
                            <button
                                onClick={() => dismiss(toast.id)}
                                className="shrink-0 text-white/30 hover:text-white transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
                            >
                                <IoClose className="text-base" />
                            </button>
                        </div>
                        {/* progress track */}
                        <div className="relative h-0.5 mx-4 mb-3.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            <div
                                className="h-full rounded-full animate-toastProgress"
                                style={{ background: `linear-gradient(90deg, ${cfg.accentDim}, ${cfg.accent})` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>,
        document.body
    );
};

export default ToastContainer;