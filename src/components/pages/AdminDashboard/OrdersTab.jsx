import React from 'react';

const OrdersTab = ({ orders, formatPrice, setSelectedOrder }) => {
    return (
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm overflow-hidden">
            {orders.length > 0 ? (
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-150">
                        <thead className="bg-[#F4F7F0] text-[#546375] text-[10px] lg:text-[11px] uppercase tracking-widest">
                            <tr>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Order ID</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Customer</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Date</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Total</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <tr key={i} className="border-t border-[#ececec] hover:bg-gray-50 transition-colors">
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-[#232323] text-xs lg:text-sm">{order.orderNum}</td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                                        <p className="font-bold text-[#232323] text-xs lg:text-sm">{order.buyerDetails.name}</p>
                                        <p className="text-[10px] lg:text-xs text-gray-500">{order.buyerDetails.email}</p>
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-[#546375]">{order.date}</td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-[#80B500] text-xs lg:text-sm">{formatPrice(order.subtotal + order.shipping)}</td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                                        <button onClick={() => setSelectedOrder(order)} className="bg-[#232323] hover:bg-[#80B500] transition-colors text-white text-[10px] lg:text-xs px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg font-bold cursor-pointer whitespace-nowrap shadow-md">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-10 text-center text-gray-500 font-bold text-sm">No orders found.</div>
            )}
        </div>
    );
};

export default OrdersTab;