import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container";
import { SlUser } from "react-icons/sl";
import { FiLogOut, FiShoppingBag, FiSettings } from "react-icons/fi";
import { useStore } from "../../store/useStore"; 

const Profile = () => {
    const navigate = useNavigate();
    
    // Zustand থেকে লগ-ইন ইউজার এবং লগ-আউট ফাংশন আনা হলো
    const { user, logoutUser } = useStore();

    // Private Route Logic: লগ-ইন না থাকলে লগ-ইন পেজে রিডাইরেক্ট হবে
    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="bg-[#F7F9F2] min-h-screen py-16 md:py-24 font-nuni">
            <Container className="px-4 lg:px-0 w-full max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-linear-to-tr from-[#80B500] to-[#99d600] text-white rounded-full flex items-center justify-center text-5xl shadow-lg shrink-0">
                        <SlUser />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-3xl md:text-4xl font-black font-int text-[#232323] mb-2">
                            {user.name}
                        </h2>
                        <p className="text-[#546375] text-lg mb-4">{user.email}</p>
                        <div className="inline-block bg-[#80B500]/10 text-[#80B500] font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider border border-[#80B500]/20">
                            Active Member
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer shrink-0 border border-red-100 hover:border-red-500"
                    >
                        <FiLogOut className="text-lg" />
                        Log Out
                    </button>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Order History */}
                    <div className="bg-white p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <FiShoppingBag className="text-2xl text-[#80B500]" />
                            <h3 className="text-xl font-bold font-int text-[#232323]">Order History</h3>
                        </div>
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-16 h-16 bg-[#F4F7F0] rounded-full flex items-center justify-center mb-4">
                                <FiShoppingBag className="text-2xl text-gray-400" />
                            </div>
                            <p className="text-[#546375] font-medium mb-4">You haven't placed any orders yet.</p>
                            <Link to="/shop" className="text-[#80B500] font-bold hover:underline">
                                Start Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="bg-white p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <FiSettings className="text-2xl text-[#80B500]" />
                            <h3 className="text-xl font-bold font-int text-[#232323]">Account Details</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                <p className="font-bold text-[#232323] bg-[#F4F7F0] p-3 rounded-xl border border-transparent">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                <p className="font-bold text-[#232323] bg-[#F4F7F0] p-3 rounded-xl border border-transparent">{user.email}</p>
                            </div>
                            <button className="mt-4 bg-[#80B500] text-white py-3 rounded-xl font-bold hover:bg-[#6c9a00] transition-colors cursor-pointer shadow-lg shadow-[#80B500]/30">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default Profile;