import React, { useMemo } from 'react';
import { FiShoppingBag, FiUsers, FiAlertTriangle, FiShield, FiRefreshCcw } from 'react-icons/fi';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const OverviewTab = ({ orders = [], users = [], formatPrice, getCurrencySymbol }) => {
    // Calculate General Overview Metrics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.subtotal || 0) + (order.shipping || 0), 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;

    // Calculate Risk Management Metrics
    // Assuming your order objects have properties like 'status', 'riskLevel', etc.
    const highRiskOrders = orders.filter(order => order.riskLevel === 'high').length;
    const refundRequests = orders.filter(order => order.status === 'refund_requested' || order.status === 'refunded').length;
    const failedPayments = orders.filter(order => order.status === 'failed').length;

    // Prepare Data for Recharts
    const chartData = useMemo(() => {
        const groupedData = orders.reduce((acc, order) => {
            // Assuming order.createdAt exists
            const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown';
            if (!acc[date]) {
                acc[date] = { date, revenue: 0, orders: 0 };
            }
            acc[date].revenue += (order.subtotal || 0) + (order.shipping || 0);
            acc[date].orders += 1;
            return acc;
        }, {});

        // Convert object to array and sort by date
        return Object.values(groupedData).slice(-10);
    }, [orders]);

    return (
        <div className="space-y-8">
            {/* general overview */}
            <div>
                <h2 className="text-lg font-bold text-[#232323] mb-4">General Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-4 lg:gap-5">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#80B500]/10 text-[#80B500] rounded-full flex items-center justify-center text-xl lg:text-2xl font-black font-int shrink-0" aria-hidden="true">
                            {getCurrencySymbol()}
                        </div>
                        <div>
                            <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
                            <h3 className="text-xl lg:text-2xl font-black font-int text-[#232323]">{formatPrice(totalRevenue)}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-4 lg:gap-5">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-xl lg:text-2xl shrink-0">
                            <FiShoppingBag aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                            <h3 className="text-xl lg:text-2xl font-black font-int text-[#232323]">{totalOrders}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-4 lg:gap-5 sm:col-span-2 lg:col-span-1">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center text-xl lg:text-2xl shrink-0">
                            <FiUsers aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
                            <h3 className="text-xl lg:text-2xl font-black font-int text-[#232323]">{totalUsers}</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* risk management */}
            <div>
                <h2 className="text-lg font-bold text-[#232323] mb-4">Risk Management</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-xl shrink-0">
                            <FiAlertTriangle />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">High Risk Orders</p>
                            <h3 className="text-xl font-black text-red-600">{highRiskOrders}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center text-xl shrink-0">
                            <FiRefreshCcw />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Refunds / Returns</p>
                            <h3 className="text-xl font-black text-orange-600">{refundRequests}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-yellow-100 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                        <div className="w-12 h-12 bg-yellow-500/10 text-yellow-600 rounded-full flex items-center justify-center text-xl shrink-0">
                            <FiShield />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Failed Payments</p>
                            <h3 className="text-xl font-black text-yellow-600">{failedPayments}</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* recharts */}
            <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm">
                <h2 className="text-lg font-bold text-[#232323] mb-6">Revenue & Order Trend</h2>
                <div className="w-full h-[300px] lg:h-[400px]">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: '#888' }} 
                                    dy={10}
                                />
                                <YAxis 
                                    yAxisId="left"
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: '#888' }}
                                    tickFormatter={(value) => `${getCurrencySymbol()}${value}`}
                                />
                                <YAxis 
                                    yAxisId="right" 
                                    orientation="right" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: '#888' }}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                                <Line 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="revenue" 
                                    name="Revenue" 
                                    stroke="#80B500" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, strokeWidth: 2 }} 
                                    activeDot={{ r: 6 }} 
                                />
                                <Line 
                                    yAxisId="right"
                                    type="monotone" 
                                    dataKey="orders" 
                                    name="Orders" 
                                    stroke="#3b82f6" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, strokeWidth: 2 }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No chart data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;