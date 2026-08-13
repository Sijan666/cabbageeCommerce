import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container";
import { SlUser } from "react-icons/sl";
import { FiLogOut, FiShoppingBag, FiSettings, FiSearch, FiEdit2, FiCheck, FiX, FiBox, FiPackage, FiTruck, FiMapPin } from "react-icons/fi";
import { useStore } from "../../store/useStore"; 
import { showToast } from "../Toast";

const Profile = () => {
    const navigate = useNavigate();
    const { user, loginUser, logoutUser } = useStore();

    {/* states */}
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [trackToken, setTrackToken] = useState("");
    const [orders, setOrders] = useState([]);
    
    {/* new state for high-end tracking modal */}
    const [trackedOrderData, setTrackedOrderData] = useState(null);

    {/* private route logic & load data */}
    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNewName(user.name);
            {/* fetch orders from localstorage */}
            const allOrders = JSON.parse(localStorage.getItem("cabbage_orders")) || [];
            const myOrders = allOrders.filter(o => o.buyerDetails?.email === user.email);
            setOrders(myOrders);
        }
    }, [user, navigate]);

    if (!user) return null;

    {/* logout handler */}
    const handleLogout = () => {
        logoutUser();
        showToast({ message: "Logged out successfully!" });
        navigate("/login");
    };

    {/* save profile handler */}
    const handleSaveProfile = () => {
        if (!newName.trim()) {
            showToast({ message: "Name cannot be empty!", type: "danger" });
            return;
        }

        {/* update localstorage */}
        const existingUsers = JSON.parse(localStorage.getItem("cabbage_users")) || [];
        const updatedUsers = existingUsers.map(u => 
            u.email === user.email ? { ...u, name: newName } : u
        );
        localStorage.setItem("cabbage_users", JSON.stringify(updatedUsers));

        {/* update zustand store */}
        loginUser({ ...user, name: newName });
        setIsEditing(false);
        showToast({ message: "Profile updated successfully!" });
    };

    {/* track order handler */}
    const handleTrackOrder = (e) => {
        e.preventDefault();
        if (!trackToken.trim()) return;

        const allOrders = JSON.parse(localStorage.getItem("cabbage_orders")) || [];
        const foundOrder = allOrders.find(o => o.orderNum === trackToken.trim().toUpperCase());

        if (foundOrder) {
            setTrackedOrderData(foundOrder);
            setTrackToken("");
        } else {
            showToast({ message: "Invalid token! Order not found.", type: "danger" });
        }
    };

    return (
        <div className="bg-[#F7F9F2] min-h-screen py-10 sm:py-16 md:py-24 font-nuni relative">
            <Container className="px-4 lg:px-0 w-full max-w-275 mx-auto">
                {/* header section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 flex flex-col md:flex-row items-center gap-5 sm:gap-8 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#80B500]/5 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-linear-to-tr from-[#80B500] to-[#99d600] text-white rounded-full flex items-center justify-center text-4xl sm:text-5xl shadow-lg shrink-0 border-4 border-white">
                        <SlUser />
                    </div>
                    <div className="text-center md:text-left flex-1 z-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-int text-[#232323] mb-1 sm:mb-1.5 capitalize">
                            {user.name}
                        </h2>
                        <p className="text-[13px] sm:text-[15px] md:text-base text-[#546375] font-medium mb-3 sm:mb-4">{user.email}</p>
                        <div className="inline-block bg-[#80B500]/10 text-[#80B500] font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-widest border border-[#80B500]/20">
                            Active Member
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full md:w-auto bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 cursor-pointer shrink-0 z-10 mt-2 md:mt-0"
                    >
                        <FiLogOut className="text-[15px] sm:text-[16px]" />
                        Log Out
                    </button>
                </div>
                {/* dashboard grid */}
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                    {/* left column: settings & tracker */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6 sm:gap-8">
                        {/* account settings */}
                        <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-gray-100">
                            <div className="flex items-center justify-between mb-5 sm:mb-6 border-b border-gray-100 pb-3 sm:pb-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <FiSettings className="text-lg sm:text-xl text-[#80B500]" />
                                    <h3 className="text-[15px] sm:text-[17px] font-bold font-int text-[#232323]">Profile Details</h3>
                                </div>
                                {!isEditing && (
                                    <button onClick={() => setIsEditing(true)} className="text-[#546375] hover:text-[#80B500] transition-colors cursor-pointer p-1">
                                        <FiEdit2 size={16} />
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col gap-4 sm:gap-5">
                                <div>
                                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#546375] mb-1.5 pl-1">Full Name</p>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            value={newName} 
                                            onChange={(e) => setNewName(e.target.value)} 
                                            className="w-full bg-white border-2 border-[#80B500] focus:ring-4 focus:ring-[#80B500]/15 rounded-xl p-3 outline-none font-bold text-[#232323] transition-all text-sm sm:text-base"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="font-bold text-[#232323] bg-[#F4F7F0] p-3 sm:p-3.5 rounded-xl capitalize text-sm sm:text-base">{user.name}</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#546375] mb-1.5 pl-1">Email Address</p>
                                    <p className="font-bold text-gray-400 bg-gray-50 p-3 sm:p-3.5 rounded-xl cursor-not-allowed select-none text-sm sm:text-base flex flex-col sm:flex-row sm:items-center">
                                        <span className="truncate">{user.email}</span> 
                                        <span className="text-[10px] text-red-400 sm:ml-2 font-normal mt-0.5 sm:mt-0">(Cannot be changed)</span>
                                    </p>
                                </div>
                                {isEditing && (
                                    <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2">
                                        <button onClick={handleSaveProfile} className="flex-1 bg-[#80B500] hover:bg-[#6c9a00] text-white py-2.5 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md text-sm sm:text-base">
                                            <FiCheck /> Save
                                        </button>
                                        <button onClick={() => { setIsEditing(false); setNewName(user.name); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#546375] py-2.5 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm sm:text-base">
                                            <FiX /> Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* order tracker form */}
                        <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-gray-100 bg-linear-to-b from-white to-[#F4F7F0]/50">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-100 pb-3 sm:pb-4">
                                <FiBox className="text-lg sm:text-xl text-[#80B500]" />
                                <h3 className="text-[15px] sm:text-[17px] font-bold font-int text-[#232323]">Track Order</h3>
                            </div>
                            <p className="text-[13px] sm:text-sm text-[#546375] mb-4">Enter your order token (e.g., ORD-123456) to check the delivery status.</p>
                            <form onSubmit={handleTrackOrder} className="flex flex-col gap-3">
                                <input 
                                    type="text" 
                                    value={trackToken}
                                    onChange={(e) => setTrackToken(e.target.value)}
                                    placeholder="ORD-XXXXXX" 
                                    required
                                    className="w-full bg-white border border-[#ececec] focus:border-[#80B500] rounded-xl p-3 sm:p-3.5 outline-none font-bold text-[#232323] transition-colors uppercase text-sm sm:text-base"
                                />
                                <button type="submit" className="w-full bg-[#232323] hover:bg-black text-white py-3 sm:py-3.5 rounded-xl font-bold font-int tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md text-sm sm:text-base">
                                    <FiSearch /> Track Now
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* right column: order history */}
                    <div className="w-full lg:w-2/3 bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-gray-100">
                        <div className="flex items-center justify-between mb-5 sm:mb-6 border-b border-gray-100 pb-3 sm:pb-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <FiShoppingBag className="text-lg sm:text-xl text-[#80B500]" />
                                <h3 className="text-[15px] sm:text-[17px] font-bold font-int text-[#232323]">Order History</h3>
                            </div>
                            <span className="bg-[#F4F7F0] text-[#546375] font-bold font-nuni px-2.5 py-1 sm:px-3 rounded-lg text-xs sm:text-sm">
                                {orders.length} Orders
                            </span>
                        </div>
                        {orders.length > 0 ? (
                            <div className="flex flex-col gap-4 max-h-112.5 sm:max-h-137.5 overflow-y-auto pr-2 custom-scrollbar">
                                {orders.slice().reverse().map((order, i) => (
                                    <div key={i} className="bg-white border border-[#ececec] rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-[#80B500]/50 transition-colors group">
                                        <div className="flex flex-wrap justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                            <div>
                                                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#546375] mb-1">Order Token</p>
                                                <h4 className="text-[14px] sm:text-[16px] font-black font-int text-[#232323]">{order.orderNum}</h4>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#546375] mb-1">Date</p>
                                                <p className="text-[12px] sm:text-[14px] font-bold font-nuni text-[#232323]">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className="bg-[#F4F7F0] rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-2">
                                                    {order.items.slice(0, 3).map((item, idx) => (
                                                        <div key={idx} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-[#F4F7F0] flex items-center justify-center overflow-hidden shrink-0 shadow-sm p-1">
                                                            <img src={item.image || item.thumbnail} alt="product" className="w-full h-full object-contain" />
                                                        </div>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#232323] border-2 border-[#F4F7F0] flex items-center justify-center text-white text-[10px] sm:text-[11px] font-bold shrink-0 z-10">
                                                            +{order.items.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs sm:text-sm font-bold text-[#546375] ml-1">{order.items.length} Items</p>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-5 border-t sm:border-t-0 border-[#ececec] pt-3 sm:pt-0">
                                                <p className="text-[16px] sm:text-[18px] font-black font-int text-[#80B500]">${(order.subtotal + order.shipping).toFixed(2)}</p>
                                                <Link to="/receipt" state={order} className="text-[#232323] hover:text-[#80B500] bg-white border border-[#ececec] hover:border-[#80B500] px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-sm">
                                                    Receipt
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F4F7F0] rounded-full flex items-center justify-center mb-4 sm:mb-5">
                                    <FiShoppingBag className="text-2xl sm:text-3xl text-[#546375]/40" />
                                </div>
                                <h4 className="text-base sm:text-lg font-black font-int text-[#232323] mb-2">No Orders Yet</h4>
                                <p className="text-sm sm:text-base text-[#546375] font-medium mb-5 sm:mb-6 max-w-62.5">Looks like you haven't placed any orders from Cabbage yet.</p>
                                <Link to="/shop" className="bg-[#232323] hover:bg-[#80B500] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold font-nuni uppercase tracking-widest transition-colors shadow-md">
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
            {/* high-end tracking modal overlay */}
            {trackedOrderData && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-[#051117]/60 backdrop-blur-md">
                    <div 
                        className="bg-white rounded-4xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-full max-w-105 overflow-hidden transform transition-all"
                        style={{ animation: 'slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                    >
                        {/* modal header */}
                        <div className="bg-[#80B500] p-6 sm:p-7 text-white relative">
                            <button onClick={() => setTrackedOrderData(null)} className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/20 p-2 sm:p-2.5 rounded-full hover:bg-white/30 transition-colors cursor-pointer">
                                <FiX className="text-base sm:text-lg" />
                            </button>
                            <h3 className="text-[22px] sm:text-[26px] font-black font-int mb-1">Order Status</h3>
                            <p className="text-white/90 font-nuni font-bold tracking-widest uppercase text-[10px] sm:text-xs">{trackedOrderData.orderNum}</p>
                        </div>
                        {/* modal body: stepper */}
                        <div className="p-6 sm:p-8 pb-8 sm:pb-10">
                            <div className="relative border-l-[3px] border-[#f4f6f8] ml-4 space-y-7 sm:space-y-9">
                                {/* step 1 */}
                                <div className="relative pl-6 sm:pl-7">
                                    <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#80B500] rounded-full flex items-center justify-center text-white text-[12px] ring-[6px] ring-white">
                                        <FiCheck />
                                    </div>
                                    <h4 className="font-black font-int text-[#232323] text-[14px] sm:text-[15px]">Order Placed</h4>
                                    <p className="text-[12px] sm:text-[13px] font-nuni text-[#546375] font-bold mt-0.5">{trackedOrderData.date}</p>
                                </div>
                                {/* active */}
                                <div className="relative pl-6 sm:pl-7">
                                    <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#80B500] rounded-full flex items-center justify-center text-white text-[12px] ring-[6px] ring-white shadow-[0_0_15px_rgba(128,181,0,0.4)]">
                                        <FiPackage />
                                    </div>
                                    <h4 className="font-black font-int text-[#80B500] text-[14px] sm:text-[15px]">Processing</h4>
                                    <p className="text-[12px] sm:text-[13px] font-nuni text-[#546375] font-bold mt-0.5">We are preparing your items.</p>
                                </div>
                                {/* pending */}
                                <div className="relative pl-6 sm:pl-7">
                                    <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#f4f6f8] rounded-full flex items-center justify-center text-gray-400 text-[12px] ring-[6px] ring-white">
                                        <FiTruck />
                                    </div>
                                    <h4 className="font-black font-int text-gray-400 text-[14px] sm:text-[15px]">Shipped</h4>
                                    <p className="text-[12px] sm:text-[13px] font-nuni text-gray-400 font-bold mt-0.5">Pending courier pickup.</p>
                                </div>
                                {/* pending */}
                                <div className="relative pl-6 sm:pl-7">
                                    <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#f4f6f8] rounded-full flex items-center justify-center text-gray-400 text-[12px] ring-[6px] ring-white">
                                        <FiMapPin />
                                    </div>
                                    <h4 className="font-black font-int text-gray-400 text-[14px] sm:text-[15px]">Delivered</h4>
                                    <p className="text-[12px] sm:text-[13px] font-nuni text-gray-400 font-bold mt-0.5">Pending delivery.</p>
                                </div>
                                
                            </div>
                        </div>
                        {/* modal footer */}
                        <div className="bg-[#F4F7F0] p-5 sm:p-6 px-6 sm:px-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] font-bold text-[#546375] uppercase tracking-widest mb-1">Total Paid</p>
                                <p className="text-[20px] sm:text-[22px] font-black font-int text-[#232323]">${(trackedOrderData.subtotal + trackedOrderData.shipping).toFixed(2)}</p>
                            </div>
                            <Link to="/receipt" state={trackedOrderData} className="w-full sm:w-auto flex justify-center items-center bg-[#232323] hover:bg-[#80B500] text-white px-6 sm:px-7 py-3 rounded-xl text-xs font-bold font-int uppercase tracking-widest transition-colors shadow-lg cursor-pointer">
                                View Receipt
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {/* styling */}
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

export default Profile;