import React from 'react';
import { FiX, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const OrderDetailsModal = ({ selectedOrder, setSelectedOrder, formatPrice }) => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-4 bg-[#051117]/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl lg:rounded-4xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-full max-w-150 overflow-hidden transform transition-all flex flex-col max-h-[90vh]" style={{ animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                {/* modal header */}
                <div className="bg-[#232323] p-5 sm:p-6 text-white relative shrink-0">
                    <button onClick={() => setSelectedOrder(null)} className="absolute top-4 sm:top-5 right-4 sm:right-5 bg-white/10 p-2 sm:p-2.5 rounded-full hover:bg-red-500 transition-colors cursor-pointer">
                        <FiX className="text-base sm:text-lg" />
                    </button>
                    <h3 className="text-lg sm:text-[22px] font-black font-int mb-1">Order Details</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-[#80B500] font-nuni font-bold tracking-widest uppercase text-[10px] sm:text-xs">{selectedOrder.orderNum}</span>
                        <span className="text-gray-400 text-[10px] sm:text-xs">| {selectedOrder.date}</span>
                    </div>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                    {/* customer info block */}
                    <div className="bg-[#F4F7F0] p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                        <h4 className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Customer Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <p className="font-bold text-[#232323] text-sm sm:text-[15px]">{selectedOrder.buyerDetails.name}</p>
                                <p className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#546375] mt-1"><FiMail className="text-[#80B500]" /> {selectedOrder.buyerDetails.email}</p>
                                <p className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#546375] mt-1"><FiPhone className="text-[#80B500]" /> {selectedOrder.buyerDetails.phone}</p>
                            </div>
                            <div>
                                <p className="flex items-start gap-1.5 text-[11px] sm:text-xs text-[#546375]"><FiMapPin className="text-[#80B500] shrink-0 mt-0.5" /> 
                                    <span>{selectedOrder.buyerDetails.address}, <br/>{selectedOrder.buyerDetails.city} - {selectedOrder.buyerDetails.zip}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* ordered items list */}
                    <h4 className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Ordered Items ({selectedOrder.items.length})</h4>
                    <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                        {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3 sm:gap-4 items-center bg-white border border-gray-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F4F7F0] rounded-lg p-1.5 shrink-0">
                                    <img src={item.image || item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-[11px] sm:text-[13px] font-bold font-int text-[#232323] line-clamp-1">{item.title}</h5>
                                    <p className="text-[10px] sm:text-[11px] text-[#546375] mt-0.5">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                                </div>
                                <span className="text-xs sm:text-[14px] font-black font-int text-[#232323] whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    {/* total amount block */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 border-t border-gray-100 pt-4">
                        <div>
                            <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Payment Method</p>
                            <p className="text-xs sm:text-sm font-bold text-[#232323] uppercase">{selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Courier: {selectedOrder.courier}</p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                            <p className="text-xl sm:text-2xl font-black font-int text-[#80B500]">{formatPrice(selectedOrder.subtotal + selectedOrder.shipping)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;