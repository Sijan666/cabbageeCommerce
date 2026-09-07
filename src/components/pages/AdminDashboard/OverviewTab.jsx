import React from 'react';
import { FiShoppingBag, FiUsers } from 'react-icons/fi';

const OverviewTab = ({ orders, users, formatPrice, getCurrencySymbol }) => {
    // calculate overview metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.subtotal + order.shipping, 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-4 lg:gap-5">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#80B500]/10 text-[#80B500] rounded-full flex items-center justify-center text-xl lg:text-2xl font-black font-int shrink-0">
                    {getCurrencySymbol()}
                </div>
                <div>
                    <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
                    <h3 className="text-xl lg:text-2xl font-black font-int text-[#232323]">{formatPrice(totalRevenue)}</h3>
                </div>
            </div>
            <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-4 lg:gap-5">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-xl lg:text-2xl shrink-0">
                    <FiShoppingBag />
                </div>
                <div>
                    <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                    <h3 className="text-xl lg:text-2xl font-black font-int text-[#232323]">{totalOrders}</h3>
                </div>
            </div>
            <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-4 lg:gap-5 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center text-xl lg:text-2xl shrink-0">
                    <FiUsers />
                </div>
                <div>
                    <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
                    <h3 className="text-xl lg:text-2xl font-black font-int text-[#232323]">{totalUsers}</h3>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;