import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMenu } from "react-icons/fi";
import { useStore } from "../../../store/useStore"; 
import { showToast } from "../../Toast";
import Sidebar from "./Sidebar";
import OverviewTab from "./OverviewTab";
import ProductsTab from "./ProductsTab";
import OrdersTab from "./OrdersTab";
import CouponsTab from "./CouponsTab";
import UsersTab from "./UsersTab";
import ProductModal from "./ProductModal";
import OrderDetailsModal from "./OrderDetailsModal";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, currency, exchangeRates, setCurrency, logoutUser } = useStore();
    
    // local states
    const [activeTab, setActiveTab] = useState("overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // data states
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    // check admin access
    useEffect(() => {
        if (!user || user.email !== "666majharulislam@gmail.com") {
            showToast({ message: "Access Denied! Admins only.", type: "danger" });
            navigate("/", { replace: true });
        } else {
            const savedOrders = JSON.parse(localStorage.getItem("cabbage_orders")) || [];
            const savedUsers = JSON.parse(localStorage.getItem("cabbage_users")) || [];
            const savedCoupons = JSON.parse(localStorage.getItem("cabbage_coupons")) || [];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOrders(savedOrders.reverse()); 
            setUsers(savedUsers);
            setCoupons(savedCoupons);
        }
    }, [user, navigate]);

    if (!user || user.email !== "666majharulislam@gmail.com") return null;

    // dynamic price formatter
    const formatPrice = (price) => {
        const converted = price * exchangeRates[currency];
        if (currency === 'BDT') return `৳${converted.toFixed(0)}`;
        if (currency === 'EUR') return `€${converted.toFixed(2)}`;
        if (currency === 'INR') return `₹${converted.toFixed(0)}`;
        return `$${converted.toFixed(2)}`;
    };

    const getCurrencySymbol = () => {
        if (currency === 'BDT') return '৳';
        if (currency === 'EUR') return '€';
        if (currency === 'INR') return '₹';
        return '$';
    };

    // logout
    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <div className="bg-[#F4F7F0] min-h-screen flex font-nuni relative overflow-x-hidden">
            {/* mobile sidebar overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                />
            )}
            {/* sidebar component */}
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isMobileMenuOpen={isMobileMenuOpen} 
                setIsMobileMenuOpen={setIsMobileMenuOpen} 
                handleLogout={handleLogout} 
            />
            {/* main content area */}
            <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-10 w-full overflow-hidden">
                {/* header */}
                <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div className="flex items-center gap-3 sm:gap-0">
                        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700" onClick={() => setIsMobileMenuOpen(true)}>
                            <FiMenu size={22} />
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black font-int text-[#232323] capitalize">{activeTab}</h1>
                            <p className="text-[#546375] text-xs sm:text-sm mt-1">Manage your store data and performance.</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)}
                            className="bg-white border border-[#ececec] text-[#546375] text-[13px] font-bold font-nuni rounded-lg px-3 py-2 sm:py-2.5 outline-none focus:border-[#80B500] cursor-pointer shadow-sm w-full sm:w-auto"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="BDT">BDT (৳)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="INR">INR (₹)</option>
                        </select>
                        {activeTab === "products" && (
                            <button onClick={() => { setEditId(null); setIsProductModalOpen(true); }} className="bg-[#232323] hover:bg-[#80B500] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-[13px] sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md w-full sm:w-auto">
                                <FiPlus /> Add Product
                            </button>
                        )}
                    </div>
                </div>
                {/* dynamic tab rendering */}
                {activeTab === "overview" && <OverviewTab orders={orders} users={users} formatPrice={formatPrice} getCurrencySymbol={getCurrencySymbol} />}
                {activeTab === "products" && <ProductsTab formatPrice={formatPrice} setEditId={setEditId} setIsProductModalOpen={setIsProductModalOpen} />}
                {activeTab === "orders" && <OrdersTab orders={orders} formatPrice={formatPrice} setSelectedOrder={setSelectedOrder} />}
                {activeTab === "coupons" && <CouponsTab coupons={coupons} setCoupons={setCoupons} />}
                {activeTab === "users" && <UsersTab users={users} />}
            </div>
            {/* modals */}
            {isProductModalOpen && <ProductModal editId={editId} setIsProductModalOpen={setIsProductModalOpen} />}
            {selectedOrder && <OrderDetailsModal selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} formatPrice={formatPrice} />}
            <style>{`
                @keyframes slideUpModal {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;