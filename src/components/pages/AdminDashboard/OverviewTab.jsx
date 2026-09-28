import React, { useMemo } from 'react';
import { FiShoppingBag, FiUsers, FiShield, FiAlertCircle, FiRefreshCcw, FiXCircle } from 'react-icons/fi';
import { 
    ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// eslint-disable-next-line no-unused-vars
const OverviewTab = ({ orders = [], users = [], formatPrice, getCurrencySymbol }) => {
    // General Metrics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.subtotal || 0) + (order.shipping || 0), 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

    // Risk Metrics & Calculations
    const highRiskOrders = orders.filter(order => order.riskLevel === 'high').length;
    const refundRequests = orders.filter(order => order.status === 'refund_requested' || order.status === 'refunded').length;
    const failedPayments = orders.filter(order => order.status === 'failed').length;
    const safeOrders = totalOrders - (highRiskOrders + refundRequests + failedPayments);

    const getPercent = (value) => totalOrders > 0 ? Math.round((value / totalOrders) * 100) : 0;

    // Chart Data
    const chartData = useMemo(() => {
        const groupedData = orders.reduce((acc, order) => {
            const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : 'Unknown';
            if (!acc[date]) acc[date] = { date, revenue: 0, orders: 0 };
            
            acc[date].revenue += (order.subtotal || 0) + (order.shipping || 0);
            acc[date].orders += 1;
            return acc;
        }, {});
        return Object.values(groupedData).slice(-7);
    }, [orders]);

    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Card */}
                <div className="lg:col-span-2 bg-[#121621] rounded-3xl p-8 text-white flex flex-col justify-between shadow-sm min-h-60">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Gross Revenue</p>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight flex items-center">
                            <span className="mr-1">{getCurrencySymbol()}</span>
                            {totalRevenue.toLocaleString('en-US')}
                        </h2>
                    </div>
                    <div className="flex gap-10 mt-10 border-t border-gray-800/80 pt-5">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Avg. Order Value</p>
                            <p className="font-bold text-lg flex items-center">
                                <span className="mr-0.5">{getCurrencySymbol()}</span>
                                {Math.round(avgOrderValue).toLocaleString('en-US')}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Growth</p>
                            <p className="font-bold text-lg text-emerald-400">+12.5%</p>
                        </div>
                    </div>
                </div>
                {/* Stacked Stat Cards */}
                <div className="flex flex-col gap-6 h-full">
                    <div className="flex-1 bg-white rounded-3xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                            <h3 className="text-3xl font-black text-gray-900">{totalOrders}</h3>
                        </div>
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                            <FiShoppingBag />
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-3xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                            <h3 className="text-3xl font-black text-gray-900">{totalUsers}</h3>
                        </div>
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                            <FiUsers />
                        </div>
                    </div>
                </div>
            </div>
            {/* bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900">Performance Metrics</h3>
                        <p className="text-sm text-gray-500 mt-1">Revenue & Order volume over the last 7 days</p>
                    </div>
                    <div className="w-full h-[320px]">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} dy={10} />
                                    <YAxis 
                                        yAxisId="left" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fontSize: 11, fill: '#9CA3AF' }} 
                                        tickFormatter={(val) => Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(val)}
                                        width={60}
                                    />
                                    <YAxis 
                                        yAxisId="right" 
                                        orientation="right" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fontSize: 11, fill: '#9CA3AF' }} 
                                        width={30} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                                        cursor={{ fill: '#F9FAFB' }}
                                    />
                                    <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#E5E7EB" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                    <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No performance data</div>
                        )}
                    </div>
                </div>
                {/* Risk Profile Card */}
                <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col">
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Risk Profile</h3>
                            <p className="text-sm text-gray-500 mt-1">Order safety distribution</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                            <FiShield size={18} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        {/* Safe Orders */}
                        <div>
                            <div className="flex justify-between text-sm mb-2.5">
                                <span className="font-medium text-gray-700 flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Safe Orders
                                </span>
                                <span className="font-bold text-gray-900">{getPercent(safeOrders)}%</span>
                            </div>
                            <div className="w-full bg-gray-100/80 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${getPercent(safeOrders)}%` }}></div>
                            </div>
                        </div>
                        {/* High Risk */}
                        <div>
                            <div className="flex justify-between text-sm mb-2.5">
                                <span className="font-medium text-gray-700 flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-rose-500"></div> High Risk 
                                    <FiAlertCircle className="text-rose-500 opacity-80" size={14}/>
                                </span>
                                <span className="font-bold text-gray-900">{getPercent(highRiskOrders)}%</span>
                            </div>
                            <div className="w-full bg-gray-100/80 rounded-full h-2">
                                <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${getPercent(highRiskOrders)}%` }}></div>
                            </div>
                        </div>
                        {/* Refunds */}
                        <div>
                            <div className="flex justify-between text-sm mb-2.5">
                                <span className="font-medium text-gray-700 flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div> Refunds 
                                    <FiRefreshCcw className="text-amber-500 opacity-80" size={14}/>
                                </span>
                                <span className="font-bold text-gray-900">{getPercent(refundRequests)}%</span>
                            </div>
                            <div className="w-full bg-gray-100/80 rounded-full h-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${getPercent(refundRequests)}%` }}></div>
                            </div>
                        </div>
                        {/* Failed */}
                        <div>
                            <div className="flex justify-between text-sm mb-2.5">
                                <span className="font-medium text-gray-700 flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-gray-800"></div> Failed 
                                    <FiXCircle className="text-gray-800 opacity-80" size={14}/>
                                </span>
                                <span className="font-bold text-gray-900">{getPercent(failedPayments)}%</span>
                            </div>
                            <div className="w-full bg-gray-100/80 rounded-full h-2">
                                <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${getPercent(failedPayments)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;