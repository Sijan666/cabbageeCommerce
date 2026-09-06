import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiShoppingBag, FiLogOut, FiPieChart, FiX, FiMapPin, FiPhone, FiMail, FiBox, FiEdit, FiTrash2, FiRefreshCw, FiPlus, FiImage, FiTag } from "react-icons/fi";
import { useStore } from "../../store/useStore"; 
import { showToast } from "../Toast";

const AdminDashboard = () => {
    const navigate = useNavigate();
    // bring store actions and states including currency
    const { user, logoutUser, customProducts, addCustomProduct, updateCustomProduct, softDeleteProduct, restoreProduct, permanentDeleteProduct, currency, exchangeRates, setCurrency } = useStore();
    const [activeTab, setActiveTab] = useState("overview");
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // product management states
    const [productTab, setProductTab] = useState("active");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [productForm, setProductForm] = useState({ title: "", price: "", image: "", desc: "", discountPercentage: "", rating: "", reviewCount: "", brand: "", category: "", stock: "" });
    // coupon management states
    const [coupons, setCoupons] = useState([]);
    const [couponForm, setCouponForm] = useState({ code: "", discount: "" });
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
    const totalRevenue = orders.reduce((sum, order) => sum + order.subtotal + order.shipping, 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    // dynamic price and symbol formatter
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
    // handle product form change
    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };
    // handle compressed image upload for product
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
    // handle product submit create or update
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
                // eslint-disable-next-line react-hooks/purity
                id: Date.now(),
                ...payload,
                isDeleted: false
            });
            showToast({ message: "Product added successfully!", type: "success" });
        }
        closeProductModal();
    };
    // open modal for edit
    const openEditModal = (prod) => {
        setProductForm({ 
            title: prod.title, 
            price: prod.price, 
            image: prod.image, 
            desc: prod.desc || "",
            discountPercentage: prod.discountPercentage || "",
            rating: prod.rating || "",
            reviewCount: prod.reviewCount || "",
            brand: prod.brand || "",
            category: prod.category || "",
            stock: prod.stock || ""
        });
        setEditId(prod.id);
        setIsProductModalOpen(true);
    };
    // close modal and reset
    const closeProductModal = () => {
        setProductForm({ title: "", price: "", image: "", desc: "", discountPercentage: "", rating: "", reviewCount: "", brand: "", category: "", stock: "" });
        setEditId(null);
        setIsProductModalOpen(false);
    };
    // separate active and trashed products
    const activeProducts = customProducts.filter(p => !p.isDeleted);
    const trashedProducts = customProducts.filter(p => p.isDeleted);
    
    // coupon handlers
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
        <div className="bg-[#F4F7F0] min-h-screen flex font-nuni relative">
            {/* sidebar */}
            <div className="w-64 bg-white border-r border-[#ececec] fixed h-full flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
                <div className="p-7 border-b border-[#ececec]">
                    <h2 className="text-2xl font-black font-int text-[#232323] tracking-tight">
                        Cabbage<span className="text-[#80B500]">.</span>
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#80B500] bg-[#80B500]/10 px-2 py-0.5 rounded-full mt-1 inline-block">Admin Panel</span>
                </div>
                <div className="flex-1 py-6 px-4 flex flex-col gap-2">
                    <button onClick={() => setActiveTab("overview")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "overview" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiPieChart size={18} /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab("products")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "products" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiBox size={18} /> Manage Products
                    </button>
                    <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "orders" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiShoppingBag size={18} /> Manage Orders
                    </button>
                    <button onClick={() => setActiveTab("coupons")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "coupons" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiTag size={18} /> Manage Coupons
                    </button>
                    <button onClick={() => setActiveTab("users")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${activeTab === "users" ? "bg-[#80B500] text-white shadow-md" : "text-[#546375] hover:bg-[#F4F7F0]"}`}>
                        <FiUsers size={18} /> Users List
                    </button>
                </div>
                <div className="p-4 border-t border-[#ececec]">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-[14px] font-bold transition-all cursor-pointer">
                        <FiLogOut size={18} /> Log Out
                    </button>
                </div>
            </div>
            {/* main content area */}
            <div className="flex-1 ml-64 p-10">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black font-int text-[#232323] capitalize">{activeTab}</h1>
                        <p className="text-[#546375] text-sm mt-1">Manage your store data and performance.</p>
                    </div>
                    {/* dynamic header actions */}
                    <div className="flex items-center gap-4">
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)}
                            className="bg-white border border-[#ececec] text-[#546375] text-[13px] font-bold font-nuni rounded-lg px-3 py-2.5 outline-none focus:border-[#80B500] cursor-pointer shadow-sm"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="BDT">BDT (৳)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="INR">INR (₹)</option>
                        </select>
                        {activeTab === "products" && (
                            <button onClick={() => setIsProductModalOpen(true)} className="bg-[#232323] hover:bg-[#80B500] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md">
                                <FiPlus /> Add New Product
                            </button>
                        )}
                    </div>
                </div>
                {/* overview tab */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-5">
                            <div className="w-14 h-14 bg-[#80B500]/10 text-[#80B500] rounded-full flex items-center justify-center text-2xl font-black font-int">{getCurrencySymbol()}</div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
                                <h3 className="text-2xl font-black font-int text-[#232323]">{formatPrice(totalRevenue)}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-5">
                            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-2xl"><FiShoppingBag /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                                <h3 className="text-2xl font-black font-int text-[#232323]">{totalOrders}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-[#ececec] shadow-sm flex items-center gap-5">
                            <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center text-2xl"><FiUsers /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
                                <h3 className="text-2xl font-black font-int text-[#232323]">{totalUsers}</h3>
                            </div>
                        </div>
                    </div>
                )}
                {/* products tab crud */}
                {activeTab === "products" && (
                    <div className="bg-white rounded-3xl border border-[#ececec] shadow-sm overflow-hidden p-6">
                        <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
                            <button onClick={() => setProductTab("active")} className={`text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${productTab === "active" ? "border-[#80B500] text-[#80B500]" : "border-transparent text-gray-500 hover:text-[#232323]"}`}>
                                Active Products ({activeProducts.length})
                            </button>
                            <button onClick={() => setProductTab("trash")} className={`text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${productTab === "trash" ? "border-red-500 text-red-500" : "border-transparent text-gray-500 hover:text-[#232323]"}`}>
                                Trash ({trashedProducts.length})
                            </button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-[#F4F7F0] text-[#546375] text-[11px] uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-lg rounded-bl-lg">Product</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 rounded-tr-lg rounded-br-lg text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(productTab === "active" ? activeProducts : trashedProducts).map((prod) => (
                                    <tr key={prod.id} className="border-b border-[#ececec] hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#F4F7F0] rounded-lg overflow-hidden shrink-0">
                                                <img src={prod.image} alt={prod.title} className="w-full h-full object-contain" />
                                            </div>
                                            <p className="font-bold text-[#232323] text-sm line-clamp-1">{prod.title}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-[#80B500]">{formatPrice(prod.price)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${prod.isDeleted ? 'bg-red-50 text-red-500' : 'bg-[#80B500]/10 text-[#80B500]'}`}>
                                                {prod.isDeleted ? "Trashed" : "Active"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            {!prod.isDeleted ? (
                                                <>
                                                    <button onClick={() => openEditModal(prod)} className="bg-gray-100 hover:bg-blue-100 text-blue-500 p-2 rounded-lg transition-colors cursor-pointer" title="Edit">
                                                        <FiEdit />
                                                    </button>
                                                    <button onClick={() => softDeleteProduct(prod.id)} className="bg-gray-100 hover:bg-red-100 text-red-500 p-2 rounded-lg transition-colors cursor-pointer" title="Move to Trash">
                                                        <FiTrash2 />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => restoreProduct(prod.id)} className="bg-gray-100 hover:bg-[#80B500]/20 text-[#80B500] p-2 rounded-lg transition-colors cursor-pointer" title="Restore">
                                                        <FiRefreshCw />
                                                    </button>
                                                    <button onClick={() => permanentDeleteProduct(prod.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors cursor-pointer" title="Delete Permanently">
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
                            <div className="p-10 text-center text-gray-400 font-bold">No products found in this section.</div>
                        )}
                    </div>
                )}
                {/* orders tab */}
                {activeTab === "orders" && (
                    <div className="bg-white rounded-3xl border border-[#ececec] shadow-sm overflow-hidden">
                        {orders.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-[#F4F7F0] text-[#546375] text-[11px] uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Total</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, i) => (
                                        <tr key={i} className="border-t border-[#ececec] hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-[#232323]">{order.orderNum}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-[#232323] text-sm">{order.buyerDetails.name}</p>
                                                <p className="text-xs text-gray-500">{order.buyerDetails.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#546375]">{order.date}</td>
                                            <td className="px-6 py-4 font-bold text-[#80B500]">{formatPrice(order.subtotal + order.shipping)}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => setSelectedOrder(order)} className="bg-[#232323] hover:bg-[#80B500] transition-colors text-white text-xs px-4 py-2 rounded-lg font-bold cursor-pointer">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-10 text-center text-gray-500 font-bold">No orders found.</div>
                        )}
                    </div>
                )}
                {/* coupons tab */}
                {activeTab === "coupons" && (
                    <div className="bg-white rounded-3xl border border-[#ececec] shadow-sm overflow-hidden p-6">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-1/3 bg-[#F4F7F0] p-6 rounded-2xl h-fit border border-[#ececec]">
                                <h3 className="text-lg font-black font-int text-[#232323] mb-4">Create Coupon</h3>
                                <form onSubmit={handleAddCoupon} className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Coupon Code</label>
                                        <input required type="text" value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] font-bold text-[#232323] text-sm uppercase placeholder:normal-case placeholder:font-normal" placeholder="e.g. WINTER20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Discount (%)</label>
                                        <input required type="number" min="1" max="100" value={couponForm.discount} onChange={e => setCouponForm({...couponForm, discount: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] font-bold text-[#232323] text-sm placeholder:font-normal" placeholder="e.g. 20" />
                                    </div>
                                    <button type="submit" className="w-full bg-[#232323] hover:bg-[#80B500] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-sm transition-colors mt-2 cursor-pointer shadow-md">
                                        Add Coupon
                                    </button>
                                </form>
                            </div>
                            <div className="w-full lg:w-2/3">
                                <h3 className="text-lg font-black font-int text-[#232323] mb-4">Active Coupons</h3>
                                {coupons.length > 0 ? (
                                    <div className="overflow-hidden border border-[#ececec] rounded-2xl">
                                        <table className="w-full text-left">
                                            <thead className="bg-[#F4F7F0] text-[#546375] text-[11px] uppercase tracking-widest">
                                                <tr>
                                                    <th className="px-6 py-4">Code</th>
                                                    <th className="px-6 py-4">Discount</th>
                                                    <th className="px-6 py-4 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {coupons.map(c => (
                                                    <tr key={c.id} className="border-t border-[#ececec] hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 font-black font-int text-[#80B500] text-base tracking-wider">{c.code}</td>
                                                        <td className="px-6 py-4 font-bold text-[#232323]">{c.discountPercentage}% OFF</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button onClick={() => handleDeleteCoupon(c.id)} className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-colors cursor-pointer" title="Delete Coupon">
                                                                <FiTrash2 />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-10 text-center text-[#546375] font-bold font-nuni border-2 border-dashed border-[#ececec] rounded-2xl bg-[#F4F7F0]/50">
                                        No active coupons available.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* users tab */}
                {activeTab === "users" && (
                    <div className="bg-white rounded-3xl border border-[#ececec] shadow-sm overflow-hidden">
                        {users.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-[#F4F7F0] text-[#546375] text-[11px] uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u, i) => (
                                        <tr key={i} className="border-t border-[#ececec] hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-[#232323] capitalize">{u.name}</td>
                                            <td className="px-6 py-4 text-[#546375]">{u.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-10 text-center text-gray-500 font-bold">No registered users found.</div>
                        )}
                    </div>
                )}
            </div>
            {/* product form modal updated with new fields */}
            {isProductModalOpen && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-[#051117]/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-full max-w-lg overflow-hidden transform transition-all max-h-[90vh] flex flex-col" style={{ animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F4F7F0] shrink-0">
                            <h3 className="text-xl font-black font-int text-[#232323]">{editId ? "Edit Product" : "Add New Product"}</h3>
                            <button onClick={closeProductModal} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Product Image</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                        {productForm.image ? <img src={productForm.image} alt="preview" className="w-full h-full object-contain" /> : <FiImage className="text-gray-300 text-2xl" />}
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleProductImage} className="text-sm font-nuni text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#80B500]/10 file:text-[#80B500] hover:file:bg-[#80B500]/20 cursor-pointer" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Product Title</label>
                                <input type="text" name="title" value={productForm.title} onChange={handleProductChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-sm" placeholder="e.g. Amazon Echo Plus" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Base Price (USD)</label>
                                    <input type="number" step="0.01" name="price" value={productForm.price} onChange={handleProductChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-sm" placeholder="e.g. 99.99" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Discount (%)</label>
                                    <input type="number" name="discountPercentage" value={productForm.discountPercentage} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-sm" placeholder="e.g. 12" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Brand Name</label>
                                    <input type="text" name="brand" value={productForm.brand} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-sm" placeholder="e.g. Apple" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Category</label>
                                    <input type="text" name="category" value={productForm.category} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-sm" placeholder="e.g. electronics" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Stock Quantity</label>
                                    <input type="number" name="stock" value={productForm.stock} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-sm" placeholder="e.g. 50" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Rating (0-5)</label>
                                    <input type="number" step="0.1" max="5" min="0" name="rating" value={productForm.rating} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors font-bold text-[#232323] text-sm" placeholder="e.g. 4.5" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-[#546375] mb-1 block">Short Description</label>
                                <textarea name="desc" value={productForm.desc} onChange={handleProductChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#80B500] transition-colors text-sm resize-none h-20" placeholder="Product description..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-sm transition-colors mt-2 cursor-pointer shadow-md shrink-0">
                                {editId ? "Save Changes" : "Create Product"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* order details modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-[#051117]/60 backdrop-blur-sm">
                    <div className="bg-white rounded-4xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-full max-w-150 overflow-hidden transform transition-all flex flex-col max-h-[90vh]" style={{ animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                        <div className="bg-[#232323] p-6 text-white relative shrink-0">
                            <button onClick={() => setSelectedOrder(null)} className="absolute top-5 right-5 bg-white/10 p-2.5 rounded-full hover:bg-red-500 transition-colors cursor-pointer">
                                <FiX className="text-lg" />
                            </button>
                            <h3 className="text-[22px] font-black font-int mb-1">Order Details</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-[#80B500] font-nuni font-bold tracking-widest uppercase text-xs">{selectedOrder.orderNum}</span>
                                <span className="text-gray-400 text-xs">| {selectedOrder.date}</span>
                            </div>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="bg-[#F4F7F0] p-5 rounded-2xl mb-6">
                                <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Customer Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-bold text-[#232323] text-[15px]">{selectedOrder.buyerDetails.name}</p>
                                        <p className="flex items-center gap-1.5 text-xs text-[#546375] mt-1"><FiMail className="text-[#80B500]" /> {selectedOrder.buyerDetails.email}</p>
                                        <p className="flex items-center gap-1.5 text-xs text-[#546375] mt-1"><FiPhone className="text-[#80B500]" /> {selectedOrder.buyerDetails.phone}</p>
                                    </div>
                                    <div>
                                        <p className="flex items-start gap-1.5 text-xs text-[#546375]"><FiMapPin className="text-[#80B500] shrink-0 mt-0.5" /> 
                                            <span>{selectedOrder.buyerDetails.address}, <br/>{selectedOrder.buyerDetails.city} - {selectedOrder.buyerDetails.zip}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Ordered Items ({selectedOrder.items.length})</h4>
                            <div className="space-y-3 mb-6">
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-xl">
                                        <div className="w-14 h-14 bg-[#F4F7F0] rounded-lg p-1.5 shrink-0">
                                            <img src={item.image || item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-[13px] font-bold font-int text-[#232323] line-clamp-1">{item.title}</h5>
                                            <p className="text-[11px] text-[#546375] mt-0.5">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                                        </div>
                                        <span className="text-[14px] font-black font-int text-[#232323]">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Payment Method</p>
                                    <p className="text-sm font-bold text-[#232323] uppercase">{selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Courier: {selectedOrder.courier}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                                    <p className="text-2xl font-black font-int text-[#80B500]">{formatPrice(selectedOrder.subtotal + selectedOrder.shipping)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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

export default AdminDashboard;