import React from 'react';
import { FiPieChart, FiBox, FiShoppingBag, FiTag, FiUsers, FiLogOut, FiX } from "react-icons/fi";

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, handleLogout }) => {
    
    // switch tab and close mobile menu
    const switchTab = (tab) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false); 
    };

    return (
        <div className={`w-64 bg-white border-r border-[#ececec] fixed h-full flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
            <div className="p-6 lg:p-7 border-b border-[#ececec] flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black font-int text-[#232323] tracking-tight">
                        Cabbage<span className="text-[#80B500]">.</span>
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#80B500] bg-[#80B500]/10 px-2 py-0.5 rounded-full mt-1 inline-block">Admin Panel</span>
                </div>
                <button className="lg:hidden text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                    <FiX size={24} />
                </button>
            </div>
            <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
                <button onClick={() => switchTab("overview")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "overview" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                    <FiPieChart size={18} /> Dashboard
                </button>
                <button onClick={() => switchTab("products")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "products" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                    <FiBox size={18} /> Manage Products
                </button>
                <button onClick={() => switchTab("orders")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "orders" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                    <FiShoppingBag size={18} /> Manage Orders
                </button>
                <button onClick={() => switchTab("coupons")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "coupons" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                    <FiTag size={18} /> Manage Coupons
                </button>
                <button onClick={() => switchTab("users")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "users" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                    <FiUsers size={18} /> Users List
                </button>
            </div>
            <div className="p-4 border-t border-[#ececec]">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-[14px] font-bold transition-all cursor-pointer">
                    <FiLogOut size={18} /> Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;