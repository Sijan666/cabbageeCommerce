import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

const Receipt = () => {
    {/* scroll top on load */}
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    {/* download pdf handler */}
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <>
            {/* bulletproof print isolation css */}
            <style type="text/css">
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #printable-receipt, #printable-receipt * {
                            visibility: visible;
                        }
                        #printable-receipt {
                            position: fixed;
                            left: 0;
                            top: 0;
                            width: 100%;
                            margin: 0;
                            padding: 20px;
                        }
                        html, body {
                            height: 100vh;
                            overflow: hidden;
                            margin: 0;
                            padding: 0;
                        }
                        @page {
                            size: auto;
                            margin: 0mm;
                        }
                    }
                `}
            </style>

            {/* main container */}
            <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
                <div className="max-w-175 mx-auto px-5">
                    {/* back button */}
                    <div className="mb-6 print:hidden">
                        <Link to="/success" className="inline-flex items-center gap-2 text-[13px] font-bold font-nuni text-[#546375] hover:text-[#80B500] transition-colors">
                            <FiArrowLeft className="text-[16px]" /> Back to Success
                        </Link>
                    </div>
                    {/* receipt wrapper */}
                    <div id="printable-receipt" className="bg-white rounded-2xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] border border-[#ececec] overflow-hidden">
                        {/* receipt header */}
                        <div className="bg-[#80B500] p-8 text-center sm:text-left sm:flex sm:justify-between sm:items-center">
                            <div>
                                <h1 className="text-2xl font-black font-int text-white tracking-wide">RECEIPT</h1>
                                <p className="text-[13px] font-nuni text-white/80 mt-1">Transaction Details</p>
                            </div>
                            <div className="mt-4 sm:mt-0 text-center sm:text-right">
                                <p className="text-[13px] font-nuni text-white/80">Order No.</p>
                                <p className="text-[16px] font-bold font-int text-white">#ORD-871372</p>
                            </div>
                        </div>
                        {/* receipt body */}
                        <div className="p-8">
                            {/* customer & date info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 pb-8 border-b border-dashed border-[#ececec]">
                                <div>
                                    <span className="block text-[11px] font-bold font-nuni text-[#546375] uppercase tracking-widest mb-1.5">Billed To</span>
                                    <span className="block text-[15px] font-bold font-int text-[#232323]">Majharul Islam</span>
                                    <span className="block text-[13px] font-nuni text-[#546375] mt-1">123 Street Address, City<br/>Dhaka, 1200</span>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold font-nuni text-[#546375] uppercase tracking-widest mb-1.5">Date & Time</span>
                                    <span className="block text-[14px] font-bold font-int text-[#232323]">August 12, 2026</span>
                                    <span className="block text-[13px] font-nuni text-[#546375] mt-1">Standard Delivery</span>
                                </div>
                            </div>
                            {/* items header */}
                            <div className="flex justify-between items-center mb-4 px-2">
                                <span className="text-[11px] font-bold font-nuni text-[#546375] uppercase tracking-widest">Item Description</span>
                                <span className="text-[11px] font-bold font-nuni text-[#546375] uppercase tracking-widest">Amount</span>
                            </div>
                            {/* item 1 */}
                            <div className="flex justify-between items-center bg-[#f4f6f8] p-4 rounded-xl mb-3">
                                <div>
                                    <h4 className="text-[14px] font-bold font-int text-[#232323]">Premium UI Kit</h4>
                                    <p className="text-[12px] font-nuni text-[#546375] mt-0.5">Qty: 1</p>
                                </div>
                                <span className="text-[14.5px] font-black font-int text-[#232323]">$49.00</span>
                            </div>
                            {/* item 2 */}
                            <div className="flex justify-between items-center bg-[#f4f6f8] p-4 rounded-xl mb-8">
                                <div>
                                    <h4 className="text-[14px] font-bold font-int text-[#232323]">React Dashboard Template</h4>
                                    <p className="text-[12px] font-nuni text-[#546375] mt-0.5">Qty: 1</p>
                                </div>
                                <span className="text-[14.5px] font-black font-int text-[#232323]">$69.00</span>
                            </div>
                            {/* calculations */}
                            <div className="w-full sm:w-1/2 ml-auto space-y-3">
                                <div className="flex justify-between items-center text-[14px]">
                                    <span className="font-bold font-nuni text-[#546375]">Subtotal</span>
                                    <span className="font-black font-int text-[#232323]">$118.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[14px] pb-4 border-b border-[#ececec]">
                                    <span className="font-bold font-nuni text-[#546375]">Shipping</span>
                                    <span className="font-black font-int text-[#80B500]">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-[16px] font-black font-int text-[#232323]">Total</span>
                                    <span className="text-[22px] font-black font-int text-[#80B500]">$118.00</span>
                                </div>
                            </div>
                        </div>
                        {/* receipt footer */}
                        <div className="bg-[#80B500]/5 border-t border-[#80B500]/15 p-6 text-center">
                            <p className="text-[13px] font-nuni text-[#546375]">
                                If you have any questions about this receipt, please contact <br className="hidden sm:block" /> 
                                <span className="font-bold text-[#80B500]">support@creativeweb.com</span>
                            </p>
                        </div>
                    </div>
                    {/* action button */}
                    <div className="flex justify-center mt-8 print:hidden">
                        <button onClick={handleDownloadPDF} className="bg-[#80B500] hover:bg-[#73a300] text-white font-bold font-int uppercase tracking-widest text-[12px] py-3.5 px-8 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#80B500]/25 cursor-pointer">
                            <FiDownload className="text-[16px]" /> Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Receipt;