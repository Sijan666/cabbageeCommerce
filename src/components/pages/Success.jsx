/* eslint-disable react-hooks/purity */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiCopy, FiFileText, FiShoppingBag, FiMapPin } from 'react-icons/fi';
import { showToast } from '../Toast';

const Success = () => {
    // generate random order number
    const [orderNum] = useState(`ORD-${Math.floor(Math.random() * 900000) + 100000}`);
    // scroll top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCopy = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(orderNum)
                .then(() => showToast({ message: 'Order Number Copied!' }))
                .catch(() => showToast({ message: 'Failed to copy!', type: 'danger' }));
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = orderNum;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showToast({ message: 'Order Number Copied!' });
            } catch (error) {
                showToast({ message: 'Failed to copy!', type: 'danger' },error);
            }
            textArea.remove();
        }
    };

    return (
        <>
            {/* main container */}
            <div className="bg-[#FDFCF8] min-h-screen flex items-center justify-center py-12 px-5 lg:px-8">
                {/* success card wrapper */}
                <div className="max-w-130 w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#ececec] border-t-[6px] border-t-[#80B500] p-8 lg:p-10 text-center">
                    {/* success icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-17.5 h-17.5 bg-[#80B500] rounded-full flex items-center justify-center shadow-lg shadow-[#80B500]/25">
                            <FiCheck className="text-white text-[32px]" />
                        </div>
                    </div>
                    {/* text contents */}
                    <h1 className="text-[26px] lg:text-3xl font-black font-int text-[#232323] mb-3 tracking-tight">
                        Order Confirmed!
                    </h1>
                    <p className="text-[14px] font-nuni text-[#546375] mb-8 leading-relaxed px-2">
                        Thank you for your purchase. We've received your order. <br className="hidden sm:block" />
                        Please keep the cash ready upon delivery.
                    </p>
                    {/* order info box */}
                    <div className="bg-[#f4f6f8] rounded-2xl p-7 mb-8 border border-gray-100 flex flex-col items-center">
                        <span className="text-[11.5px] font-bold font-int text-[#546375] uppercase tracking-widest mb-3">
                            Your Order Number
                        </span>
                        {/* copy order number block */}
                        <div 
                            onClick={handleCopy}
                            className="bg-white border border-[#ececec] rounded-xl py-3.5 px-6 flex items-center gap-4 cursor-pointer hover:border-[#80B500] transition-all shadow-sm group"
                        >
                            <span className="text-[19px] font-black font-int text-[#232323] tracking-wide">
                                {orderNum}
                            </span>
                            <FiCopy className="text-gray-400 text-[18px] group-hover:text-[#80B500] transition-colors" />
                        </div>
                        
                        <span className="text-[11.5px] font-nuni text-[#546375] mt-4">
                            * Save this token to track your delivery status later.
                        </span>
                    </div>
                    {/* view receipt button connected to receipt page */}
                    <div className="mb-10">
                        <Link to="/receipt" className="inline-flex items-center gap-2 text-[12.5px] font-bold font-int text-[#232323] uppercase tracking-widest border-b-2 border-[#232323] pb-1 hover:text-[#80B500] hover:border-[#80B500] transition-all cursor-pointer">
                            <FiFileText className="text-[16px]" />
                            View Full Receipt & Details
                        </Link>
                    </div>
                    {/* divider */}
                    <div className="h-px w-full bg-[#ececec] mb-8"></div>
                    {/* action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/shop" 
                            className="flex-1 bg-white hover:bg-gray-50 text-[#232323] font-bold font-int text-[13.5px] py-4 rounded-xl transition-all border border-[#ececec] flex justify-center items-center gap-2.5 cursor-pointer"
                        >
                            <FiShoppingBag className="text-[16px] text-[#546375]" />
                            Continue Shopping
                        </Link>
                        
                        <Link 
                            to="/profile" 
                            className="flex-1 bg-[#80B500] hover:bg-[#73a300] text-white font-bold font-int text-[13.5px] py-4 rounded-xl transition-all flex justify-center items-center gap-2.5 shadow-lg shadow-[#80B500]/25 cursor-pointer"
                        >
                            <FiMapPin className="text-[16px] text-white/80" />
                            Track Order
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Success;