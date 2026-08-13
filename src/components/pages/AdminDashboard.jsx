import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiShoppingBag, FiDollarSign, FiLogOut, FiPieChart, FiX, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useStore } from "../../store/useStore"; 
import { showToast } from "../Toast";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useStore();
    const [activeTab, setActiveTab] = useState("overview");

    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Check if user is Admin
    useEffect(() => {
        if (!user || user.email !== "666majharulislam@gmail.com") {
            showToast({ message: "Access Denied! Admins only.", type: "danger" });
            navigate("/", { replace: true });
        } else {
            const savedOrders = JSON.parse(localStorage.getItem("cabbage_orders")) || [];
            const savedUsers = JSON.parse(localStorage.getItem("cabbage_users")) || [];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOrders(savedOrders.reverse()); 
            setUsers(savedUsers);
        }
    }, [user, navigate]);

    if (!user || user.email !== "666majharulislam@gmail.com") return null;

    const totalRevenue = orders.reduce((sum, order) => sum + order.subtotal + order.shipping, 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <div className="bg-[#F4F7F0] min-h-screen flex font-nuni relative">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-[#ececec] fixed h-full flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
                <div className="p-7 border-b border-[#ececec]">
                    <h2 className="text-2xl font-black font-int text-[#232323] tracking-tight">
                        Cabbage<span className="text-[#80B500]">.</span>
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#80B500] bg-[#80B500]/10 px-2 py-0.5 rounded-full mt-1 inline-block">Admin Panel</span>
                </div>
                <div className="flex-1 py-6 px-4 flex flex-col gap-2">
                    <button onClick={() => setActiveTab("overview")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "overview" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiPieChart size={18} /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "orders" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiShoppingBag size={18} /> Manage Orders
                    </button>
                    <button onClick={() => setActiveTab("users")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "users" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiUsers size={18} /> Users List
                    </button>
                </div>
                <div className="p-4 border-t border-[#ececec]">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-[14px] font-bold transition-all cursor-pointer">
                        <FiLogOut size={18} /> Log Out
                    </button>
                </div>
            </div>
            {/* Main Content Area */}
            <div className="flex-1 ml-64 p-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-black font-int text-[#232323] capitalize">{activeTab}</h1>
                    <p className="text-[#546375] text-sm mt-1">Manage your store data and performance.</p>
                </div>
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-5">
                            <div className="w-14 h-14 bg-[#80B500]/10 text-[#80B500] rounded-full flex items-center justify-center text-2xl"><FiDollarSign /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
                                <h3 className="text-2xl font-black font-int text-[#232323]">${totalRevenue.toFixed(2)}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-5">
                            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-2xl"><FiShoppingBag /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                                <h3 className="text-2xl font-black font-int text-[#232323]">{totalOrders}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-5">
                            <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center text-2xl"><FiUsers /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
                                <h3 className="text-2xl font-black font-int text-[#232323]">{totalUsers}</h3>
                            </div>
                        </div>
                    </div>
                )}
                {/* ORDERS TAB */}
                {activeTab === "orders" && (
                    <div className="bg-white rounded-3xl border border-[#ececec] shadow-sm overflow-hidden">
                        {orders.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-[#F4F7F0] text-[#546375] text-[11px] uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Total</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, i) => (
                                        <tr key={i} className="border-t border-[#ececec] hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-[#232323]">{order.orderNum}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-[#232323] text-sm">{order.buyerDetails.name}</p>
                                                <p className="text-xs text-gray-500">{order.buyerDetails.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#546375]">{order.date}</td>
                                            <td className="px-6 py-4 font-bold text-[#80B500]">${(order.subtotal + order.shipping).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => setSelectedOrder(order)} className="bg-[#232323] hover:bg-[#80B500] transition-colors text-white text-xs px-4 py-2 rounded-lg font-bold cursor-pointer">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-10 text-center text-gray-500 font-bold">No orders found.</div>
                        )}
                    </div>
                )}
                {/* USERS TAB */}
                {activeTab === "users" && (
                    <div className="bg-white rounded-3xl border border-[#ececec] shadow-sm overflow-hidden">
                        {users.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-[#F4F7F0] text-[#546375] text-[11px] uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u, i) => (
                                        <tr key={i} className="border-t border-[#ececec] hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-[#232323] capitalize">{u.name}</td>
                                            <td className="px-6 py-4 text-[#546375]">{u.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-10 text-center text-gray-500 font-bold">No registered users found.</div>
                        )}
                    </div>
                )}
            </div>
            {/* ORDER DETAILS MODAL */}
            {selectedOrder && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-[#051117]/60 backdrop-blur-sm">
                    <div className="bg-white rounded-4xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-full max-w-150 overflow-hidden transform transition-all flex flex-col max-h-[90vh]" style={{ animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                        <div className="bg-[#232323] p-6 text-white relative shrink-0">
                            <button onClick={() => setSelectedOrder(null)} className="absolute top-5 right-5 bg-white/10 p-2.5 rounded-full hover:bg-red-500 transition-colors cursor-pointer">
                                <FiX className="text-lg" />
                            </button>
                            <h3 className="text-[22px] font-black font-int mb-1">Order Details</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-[#80B500] font-nuni font-bold tracking-widest uppercase text-xs">{selectedOrder.orderNum}</span>
                                <span className="text-gray-400 text-xs">| {selectedOrder.date}</span>
                            </div>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="bg-[#F4F7F0] p-5 rounded-2xl mb-6">
                                <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Customer Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-bold text-[#232323] text-[15px]">{selectedOrder.buyerDetails.name}</p>
                                        <p className="flex items-center gap-1.5 text-xs text-[#546375] mt-1"><FiMail className="text-[#80B500]" /> {selectedOrder.buyerDetails.email}</p>
                                        <p className="flex items-center gap-1.5 text-xs text-[#546375] mt-1"><FiPhone className="text-[#80B500]" /> {selectedOrder.buyerDetails.phone}</p>
                                    </div>
                                    <div>
                                        <p className="flex items-start gap-1.5 text-xs text-[#546375]"><FiMapPin className="text-[#80B500] shrink-0 mt-0.5" /> 
                                            <span>{selectedOrder.buyerDetails.address}, <br/>{selectedOrder.buyerDetails.city} - {selectedOrder.buyerDetails.zip}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Ordered Items ({selectedOrder.items.length})</h4>
                            <div className="space-y-3 mb-6">
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-xl">
                                        <div className="w-14 h-14 bg-[#F4F7F0] rounded-lg p-1.5 shrink-0">
                                            <img src={item.image || item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-[13px] font-bold font-int text-[#232323] line-clamp-1">{item.title}</h5>
                                            <p className="text-[11px] text-[#546375] mt-0.5">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                        </div>
                                        <span className="text-[14px] font-black font-int text-[#232323]">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Payment Method</p>
                                    <p className="text-sm font-bold text-[#232323] uppercase">{selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Courier: {selectedOrder.courier}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                                    <p className="text-2xl font-black font-int text-[#80B500]">${(selectedOrder.subtotal + selectedOrder.shipping).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes slideUpModal {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;