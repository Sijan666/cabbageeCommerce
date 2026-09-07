import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { showToast } from '../../Toast';

const CouponsTab = ({ coupons, setCoupons }) => {
    const [couponForm, setCouponForm] = useState({ code: "", discount: "" });

    const handleAddCoupon = (e) => {
        e.preventDefault();
        if (!couponForm.code || !couponForm.discount) return;
        const newCoupon = {
            id: Date.now(),
            code: couponForm.code.trim().toUpperCase(),
            discountPercentage: parseFloat(couponForm.discount)
        };
        const updatedCoupons = [...coupons, newCoupon];
        setCoupons(updatedCoupons);
        localStorage.setItem("cabbage_coupons", JSON.stringify(updatedCoupons));
        setCouponForm({ code: "", discount: "" });
        showToast({ message: "Coupon created successfully!", type: "success" });
    };

    const handleDeleteCoupon = (id) => {
        const updatedCoupons = coupons.filter(c => c.id !== id);
        setCoupons(updatedCoupons);
        localStorage.setItem("cabbage_coupons", JSON.stringify(updatedCoupons));
        showToast({ message: "Coupon deleted!", type: "danger" });
    };

    return (
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm overflow-hidden p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* create coupon form */}
                <div className="w-full lg:w-1/3 bg-[#F4F7F0] p-5 lg:p-6 rounded-2xl h-fit border border-[#ececec]">
                    <h3 className="text-base lg:text-lg font-black font-int text-[#232323] mb-4">Create Coupon</h3>
                    <form onSubmit={handleAddCoupon} className="flex flex-col gap-3 lg:gap-4">
                        <div>
                            <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Coupon Code</label>
                            <input required type="text" value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} className="w-full border border-gray-200 rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 outline-none focus:border-[#80B500] font-bold text-[#232323] text-xs lg:text-sm uppercase placeholder:normal-case placeholder:font-normal" placeholder="e.g. WINTER20" />
                        </div>
                        <div>
                            <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Discount (%)</label>
                            <input required type="number" min="1" max="100" value={couponForm.discount} onChange={e => setCouponForm({...couponForm, discount: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 outline-none focus:border-[#80B500] font-bold text-[#232323] text-xs lg:text-sm placeholder:font-normal" placeholder="e.g. 20" />
                        </div>
                        <button type="submit" className="w-full bg-[#232323] hover:bg-[#80B500] text-white font-bold py-3 lg:py-3.5 rounded-xl uppercase tracking-widest text-xs lg:text-sm transition-colors mt-2 cursor-pointer shadow-md">
                            Add Coupon
                        </button>
                    </form>
                </div>
                {/* active coupons */}
                <div className="w-full lg:w-2/3">
                    <h3 className="text-base lg:text-lg font-black font-int text-[#232323] mb-4">Active Coupons</h3>
                    {coupons.length > 0 ? (
                        <div className="overflow-x-auto custom-scrollbar border border-[#ececec] rounded-2xl">
                            <table className="w-full text-left min-w-100">
                                <thead className="bg-[#F4F7F0] text-[#546375] text-[10px] lg:text-[11px] uppercase tracking-widest">
                                    <tr>
                                        <th className="px-4 lg:px-6 py-3 lg:py-4">Code</th>
                                        <th className="px-4 lg:px-6 py-3 lg:py-4">Discount</th>
                                        <th className="px-4 lg:px-6 py-3 lg:py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coupons.map(c => (
                                        <tr key={c.id} className="border-t border-[#ececec] hover:bg-gray-50 transition-colors">
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 font-black font-int text-[#80B500] text-sm lg:text-base tracking-wider">{c.code}</td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-[#232323] text-xs lg:text-sm">{c.discountPercentage}% OFF</td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                                                <button onClick={() => handleDeleteCoupon(c.id)} className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white p-2 lg:p-2.5 rounded-lg lg:rounded-xl transition-colors cursor-pointer" title="Delete Coupon">
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-6 lg:p-10 text-center text-[#546375] font-bold text-sm font-nuni border-2 border-dashed border-[#ececec] rounded-2xl bg-[#F4F7F0]/50">
                            No active coupons available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CouponsTab;