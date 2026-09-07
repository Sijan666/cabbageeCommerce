import React, { useState, useEffect } from 'react';
import { FiX, FiImage } from 'react-icons/fi';
import { useStore } from '../../../store/useStore';
import { showToast } from '../../Toast';

const ProductModal = ({ editId, setIsProductModalOpen }) => {
    const { customProducts, addCustomProduct, updateCustomProduct } = useStore();
    const [productForm, setProductForm] = useState({ 
        title: "", price: "", image: "", desc: "", discountPercentage: "", rating: "", reviewCount: "", brand: "", category: "", stock: "" 
    });

    // populate form
    useEffect(() => {
        if (editId) {
            const prod = customProducts.find(p => p.id === editId);
            if (prod) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setProductForm({ 
                    title: prod.title || "", 
                    price: prod.price || "", 
                    image: prod.image || "", 
                    desc: prod.desc || "",
                    discountPercentage: prod.discountPercentage || "",
                    rating: prod.rating || "",
                    reviewCount: prod.reviewCount || "",
                    brand: prod.brand || "",
                    category: prod.category || "",
                    stock: prod.stock || ""
                });
            }
        }
    }, [editId, customProducts]);

    const closeProductModal = () => {
        setIsProductModalOpen(false);
    };

    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const handleProductImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 400;
                    const MAX_HEIGHT = 400;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = Math.round((height *= MAX_WIDTH / width));
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = Math.round((width *= MAX_HEIGHT / height));
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                    setProductForm({ ...productForm, image: compressedBase64 });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (!productForm.title || !productForm.price || !productForm.image) {
            showToast({ message: "Please fill all required fields!", type: "danger" });
            return;
        }
        const payload = {
            ...productForm,
            price: parseFloat(productForm.price) || 0,
            discountPercentage: parseFloat(productForm.discountPercentage) || 0,
            rating: parseFloat(productForm.rating) || 0,
            reviewCount: parseInt(productForm.reviewCount) || 0,
            stock: parseInt(productForm.stock) || 50
        };
        
        if (editId) {
            updateCustomProduct(editId, payload);
            showToast({ message: "Product updated successfully!", type: "success" });
        } else {
            addCustomProduct({
                id: Date.now(),
                ...payload,
                isDeleted: false
            });
            showToast({ message: "Product added successfully!", type: "success" });
        }
        closeProductModal();
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-4 bg-[#051117]/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-full max-w-lg overflow-hidden transform transition-all max-h-[90vh] flex flex-col" style={{ animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-[#F4F7F0] shrink-0">
                    <h3 className="text-lg lg:text-xl font-black font-int text-[#232323]">{editId ? "Edit Product" : "Add Product"}</h3>
                    <button onClick={closeProductModal} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"><FiX size={22} /></button>
                </div>
                <form onSubmit={handleProductSubmit} className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 overflow-y-auto custom-scrollbar">
                    <div>
                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Product Image</label>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                {productForm.image ? <img src={productForm.image} alt="preview" className="w-full h-full object-contain" /> : <FiImage className="text-gray-300 text-xl sm:text-2xl" />}
                            </div>
                            <input type="file" accept="image/*" onChange={handleProductImage} className="text-[11px] sm:text-sm font-nuni text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] sm:file:text-xs file:font-bold file:bg-[#80B500]/10 file:text-[#80B500] hover:file:bg-[#80B500]/20 cursor-pointer w-full" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Product Title</label>
                        <input type="text" name="title" value={productForm.title} onChange={handleProductChange} required className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-xs sm:text-sm" placeholder="e.g. Amazon Echo Plus" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Base Price (USD)</label>
                            <input type="number" step="0.01" name="price" value={productForm.price} onChange={handleProductChange} required className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-xs sm:text-sm" placeholder="e.g. 99.99" />
                        </div>
                        <div>
                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Discount (%)</label>
                            <input type="number" name="discountPercentage" value={productForm.discountPercentage} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-xs sm:text-sm" placeholder="e.g. 12" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Brand Name</label>
                            <input type="text" name="brand" value={productForm.brand} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-xs sm:text-sm" placeholder="e.g. Apple" />
                        </div>
                        <div>
                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Category</label>
                            <input type="text" name="category" value={productForm.category} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-xs sm:text-sm" placeholder="e.g. electronics" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Stock Quantity</label>
                            <input type="number" name="stock" value={productForm.stock} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-xs sm:text-sm" placeholder="e.g. 50" />
                        </div>
                        <div>
                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Rating (0-5)</label>
                            <input type="number" step="0.1" max="5" min="0" name="rating" value={productForm.rating} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-xs sm:text-sm" placeholder="e.g. 4.5" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Short Description</label>
                        <textarea name="desc" value={productForm.desc} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#80B500] transition-colors text-xs sm:text-sm resize-none h-16 sm:h-20" placeholder="Product description..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold py-3 sm:py-3.5 rounded-xl uppercase tracking-widest text-xs sm:text-sm transition-colors mt-1 sm:mt-2 cursor-pointer shadow-md shrink-0">
                        {editId ? "Save Changes" : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;