import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { useStore } from '../../../store/useStore';
import BulkUpload from './BulkUpload';

const ProductsTab = ({ formatPrice, setEditId, setIsProductModalOpen }) => {
    const { customProducts, softDeleteProduct, restoreProduct, permanentDeleteProduct } = useStore();
    const [productTab, setProductTab] = useState("active");

    // separate active and trashed products
    const activeProducts = customProducts.filter(p => !p.isDeleted);
    const trashedProducts = customProducts.filter(p => p.isDeleted);

    return (
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm overflow-hidden p-4 lg:p-6">
            <div className="flex flex-wrap gap-3 lg:gap-4 mb-4 lg:mb-6 border-b border-gray-100 pb-3 lg:pb-4">
                <button onClick={() => setProductTab("active")} className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${productTab === "active" ? "border-[#80B500] text-[#80B500]" : "border-transparent text-gray-500 hover:text-[#232323]"}`}>
                    Active ({activeProducts.length})
                </button>
                <button onClick={() => setProductTab("trash")} className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${productTab === "trash" ? "border-red-500 text-red-500" : "border-transparent text-gray-500 hover:text-[#232323]"}`}>
                    Trash ({trashedProducts.length})
                </button>
                <button onClick={() => setProductTab("bulk")} className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${productTab === "bulk" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:text-[#232323]"}`}>
                    Bulk Upload
                </button>
            </div>
            
            {productTab === "bulk" ? (
                <div className="flex justify-center py-2 lg:py-4 overflow-x-hidden">
                    <BulkUpload />
                </div>
            ) : (
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-125">
                        <thead className="bg-[#F4F7F0] text-[#546375] text-[10px] lg:text-[11px] uppercase tracking-widest">
                            <tr>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 rounded-tl-lg rounded-bl-lg">Product</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Price</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Status</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 rounded-tr-lg rounded-br-lg text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(productTab === "active" ? activeProducts : trashedProducts).map((prod) => (
                                <tr key={prod.id} className="border-b border-[#ececec] hover:bg-gray-50 transition-colors">
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 lg:gap-4">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#F4F7F0] rounded-lg overflow-hidden shrink-0">
                                            <img src={prod.image} alt={prod.title} className="w-full h-full object-contain" />
                                        </div>
                                        <p className="font-bold text-[#232323] text-xs lg:text-sm line-clamp-1 max-w-37.5 sm:max-w-50">{prod.title}</p>
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-[#80B500] text-xs lg:text-sm">{formatPrice(prod.price)}</td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                                        <span className={`text-[9px] lg:text-[10px] font-bold uppercase px-2 py-1 rounded-md ${prod.isDeleted ? 'bg-red-50 text-red-500' : 'bg-[#80B500]/10 text-[#80B500]'}`}>
                                            {prod.isDeleted ? "Trashed" : "Active"}
                                        </span>
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-right flex justify-end gap-1.5 lg:gap-2">
                                        {!prod.isDeleted ? (
                                            <>
                                                <button onClick={() => { setEditId(prod.id); setIsProductModalOpen(true); }} className="bg-gray-100 hover:bg-blue-100 text-blue-500 p-1.5 lg:p-2 rounded-lg transition-colors cursor-pointer" title="Edit">
                                                    <FiEdit />
                                                </button>
                                                <button onClick={() => softDeleteProduct(prod.id)} className="bg-gray-100 hover:bg-red-100 text-red-500 p-1.5 lg:p-2 rounded-lg transition-colors cursor-pointer" title="Move to Trash">
                                                    <FiTrash2 />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => restoreProduct(prod.id)} className="bg-gray-100 hover:bg-[#80B500]/20 text-[#80B500] p-1.5 lg:p-2 rounded-lg transition-colors cursor-pointer" title="Restore">
                                                    <FiRefreshCw />
                                                </button>
                                                <button onClick={() => permanentDeleteProduct(prod.id)} className="bg-red-500 hover:bg-red-600 text-white p-1.5 lg:p-2 rounded-lg transition-colors cursor-pointer" title="Delete Permanently">
                                                    <FiTrash2 />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(productTab === "active" ? activeProducts : trashedProducts).length === 0 && (
                        <div className="p-10 text-center text-gray-400 font-bold text-sm">No products found in this section.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductsTab;