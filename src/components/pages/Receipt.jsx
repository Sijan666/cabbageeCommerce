import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

const Receipt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state || {};
    
    {/* parsing dynamic values */}
    const items = orderData.items || [];
    // eslint-disable-next-line react-hooks/purity
    const orderNum = orderData.orderNum || `#ORD-${Math.floor(Math.random() * 900000) + 100000}`;
    const orderDate = orderData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const subtotal = orderData.subtotal || 0;
    const shipping = orderData.shipping || 0;
    const total = subtotal + shipping;
    
    const buyer = orderData.buyerDetails || {};
    const paymentMethod = orderData.paymentMethod || 'card';
    const courier = orderData.courier || 'Standard';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <>
            {/* 1 page print css system */}
            <style type="text/css" media="print">
                {`
                    @page { 
                        size: A4 portrait; 
                        margin: 10mm; 
                    }
                    html, body {
                        height: 100% !important;
                        min-height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        overflow: hidden !important;
                    }
                    body * { 
                        visibility: hidden; 
                    }
                    #printable-receipt, #printable-receipt * { 
                        visibility: visible; 
                    }
                    #printable-receipt {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 20px !important;
                        margin: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        box-sizing: border-box;
                    }
                    .no-print {
                        display: none !important;
                    }
                `}
            </style>

            <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 flex justify-center print:bg-white print:py-0 print:px-0">
                <div className="w-full max-w-212.5">
                    {/* top action bar */}
                    <div className="flex justify-between items-center mb-6 no-print">
                        <button 
                            onClick={() => navigate('/success')} 
                            className="cursor-pointer flex items-center gap-1.5 text-[13px] font-bold font-nuni text-[#546375] hover:text-[#80B500] transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-[#ececec]"
                        >
                            <FiArrowLeft className="text-[16px]" /> Back
                        </button>
                        <button 
                            onClick={handleDownloadPDF} 
                            className="cursor-pointer flex items-center gap-2 bg-[#80B500] text-white px-6 py-2.5 rounded-xl text-[12px] font-bold font-int uppercase tracking-widest hover:bg-[#73a300] transition-all shadow-lg shadow-[#80B500]/25 active:scale-95"
                        >
                            <FiDownload className="text-[16px]" /> Download PDF
                        </button>
                    </div>
                    <div id="printable-receipt" className="bg-white p-10 md:p-14 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-[#ececec] rounded-2xl print:rounded-none">
                        {/* header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-8 border-b-2 border-[#232323] mb-10">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black font-int tracking-[0.15em] text-[#80B500] uppercase mb-1">
                                    CABBAGE
                                </h1>
                                <p className="text-[10px] font-nuni text-[#546375] font-bold uppercase tracking-widest">
                                    Official Purchase Receipt
                                </p>
                            </div>
                            <div className="mt-6 sm:mt-0 text-left sm:text-right">
                                <p className="text-3xl font-light font-int text-gray-300 uppercase tracking-widest mb-1">
                                    Invoice
                                </p>
                                <p className="text-[12.5px] font-bold font-int text-[#232323] uppercase tracking-widest">
                                    {orderNum}
                                </p>
                            </div>
                        </div>
                        {/* customer & meta info */}
                        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12 border-b border-gray-100 pb-10">
                            {/* billed to */}
                            <div className="flex-1">
                                <p className="text-[10px] font-nuni text-[#546375] font-bold uppercase tracking-widest mb-3 border-l-2 border-[#80B500] pl-3">
                                    Billed To
                                </p>
                                <div className="pl-3.5">
                                    <p className="text-[14px] font-bold font-int text-[#232323] uppercase mb-1">{buyer.name || "Valued Customer"}</p>
                                    <p className="text-[12.5px] font-nuni text-[#546375] mb-0.5">{buyer.address || "N/A"}</p>
                                    <p className="text-[12.5px] font-nuni text-[#546375] mb-0.5">{buyer.city || "City"}{buyer.zip ? `, ${buyer.zip}` : ''}</p>
                                    <p className="text-[12.5px] font-nuni text-[#546375] mt-2">{buyer.email || "No Email"}</p>
                                    <p className="text-[12.5px] font-nuni text-[#546375]">{buyer.phone || "No Phone"}</p>
                                </div>
                            </div>
                            {/* order details */}
                            <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-4">
                                <div>
                                    <p className="text-[9.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest mb-1">Date Issued</p>
                                    <p className="text-[12.5px] font-bold font-int text-[#232323]">{orderDate}</p>
                                </div>
                                <div>
                                    <p className="text-[9.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest mb-1">Courier</p>
                                    <p className="text-[12.5px] font-bold font-int text-[#232323]">{courier}</p>
                                </div>
                                <div>
                                    <p className="text-[9.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest mb-1">Payment Method</p>
                                    <p className="text-[12.5px] font-bold font-int text-[#232323] uppercase">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card'}</p>
                                </div>
                                <div>
                                    <p className="text-[9.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest mb-1">Destination</p>
                                    <p className="text-[12.5px] font-bold font-int text-[#232323] capitalize">{buyer.city || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                        {/* items table */}
                        <div className="mb-12">
                            {/* head */}
                            <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-4">
                                <p className="text-[10.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest w-[60%]">Description</p>
                                <p className="text-[10.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest w-[20%] text-center">Qty</p>
                                <p className="text-[10.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest w-[20%] text-right">Amount</p>
                            </div>
                            {/* body */}
                            <div className="space-y-4">
                                {items.length > 0 ? (
                                    items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-start pb-4 border-b border-[#ececec] border-dashed">
                                            <div className="w-[60%] pr-4">
                                                <p className="text-[13.5px] font-bold font-int text-[#232323]">{item.title}</p>
                                                <p className="text-[10.5px] font-nuni text-[#546375] mt-1 uppercase tracking-widest">Rate: ${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="w-[20%] text-center">
                                                <p className="text-[13.5px] font-int font-medium text-[#232323]">{item.quantity}</p>
                                            </div>
                                            <div className="w-[20%] text-right">
                                                <p className="text-[13.5px] font-bold font-int text-[#232323]">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-[12.5px] font-nuni text-[#546375] italic py-2">No items data available.</p>
                                )}
                            </div>
                        </div>
                        {/* calculation summary */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-1/2">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[11.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest">Subtotal</p>
                                    <p className="text-[14px] font-bold font-int text-[#232323]">${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center mb-5">
                                    <p className="text-[11.5px] font-nuni text-[#546375] font-bold uppercase tracking-widest">Shipping & Handling</p>
                                    <p className="text-[14px] font-bold font-int text-[#232323]">{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</p>
                                </div>
                                <div className="flex justify-between items-center border-t-2 border-[#232323] pt-4">
                                    <p className="text-[14px] font-int text-[#232323] font-black uppercase tracking-widest">Total Paid</p>
                                    <p className="text-3xl font-black font-int text-[#80B500]">${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        {/* footer note */}
                        <div className="mt-20 border-t border-[#ececec] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                            <div>
                                <p className="text-[11.5px] font-bold font-int text-[#232323] uppercase tracking-widest mb-1">Thank You For Shopping</p>
                                <p className="text-[10px] font-nuni text-[#546375] uppercase tracking-widest">Cabbage E-Commerce Ltd. • Dhaka, Bangladesh</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-nuni text-[#546375] uppercase tracking-widest">Support: support@cabbage.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Receipt;