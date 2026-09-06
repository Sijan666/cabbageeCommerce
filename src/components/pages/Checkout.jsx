import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
    FiCheck, FiChevronRight, FiShield, FiTruck, 
    FiCreditCard, FiPackage, FiZap, FiLock 
} from 'react-icons/fi';
import { showToast } from '../Toast'; 

{/* data constants */}
const DELIVERY_OPTIONS = [
    { id: 'standard', title: 'Standard Delivery', eta: '3-4 Business Days', price: 0, icon: <FiPackage size={22} /> },
    { id: 'express', title: 'Express Priority', eta: '1-2 Business Days', price: 9.99, icon: <FiZap size={22} /> },
];

const COURIERS = [
    { id: 'pathao', title: 'Pathao', desc: 'Best for City', color: '#E2136E' },
    { id: 'redx', title: 'RedX', desc: 'Nationwide', color: '#E4292D' },
    { id: 'steadfast', title: 'Steadfast', desc: 'Fastest Rural', color: '#F5A623' },
];

{/* reusable components */}
const ModernInput = ({ label, type = "text", name, half, value, onChange }) => (
    <div className={half ? 'col-span-1' : 'col-span-1 sm:col-span-2'}>
        <label className="block text-[12px] sm:text-[13px] font-bold font-nuni text-[#546375] mb-1.5 ml-1">{label}</label>
        <input 
            required 
            type={type} 
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3.5 bg-white border border-[#ececec] rounded-xl outline-none focus:border-[#80B500] focus:ring-4 focus:ring-[#80B500]/15 transition-all text-[13px] sm:text-[14px] font-nuni text-[#232323] placeholder-gray-300"
            placeholder={`Enter your ${label.toLowerCase()}`}
        />
    </div>
);

const ToggleCard = ({ checked, onChange, icon, title, subtitle, rightElement }) => (
    <label className={`relative flex items-center justify-between p-3.5 sm:p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${checked ? 'border-[#80B500] bg-[#80B500]/4 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/50'}`}>
        <input type="radio" checked={checked} onChange={onChange} className="hidden" />
        <div className="flex items-center gap-3 sm:gap-4">
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors shrink-0 ${checked ? 'bg-[#80B500] text-white shadow-md shadow-[#80B500]/20' : 'bg-[#f4f6f8] text-[#546375]'}`}>
                {icon}
            </div>
            <div>
                <span className="block text-[14px] sm:text-[15px] font-bold font-int text-[#232323]">{title}</span>
                {subtitle && <span className="block text-[12px] sm:text-[13px] font-nuni text-[#546375] mt-0.5">{subtitle}</span>}
            </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
            {rightElement}
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'border-[#80B500] bg-[#80B500]' : 'border-gray-200'}`}>
                {checked && <FiCheck className="text-white text-[10px] sm:text-[12px]" />}
            </div>
        </div>
    </label>
);

{/* main checkout component */}
const Checkout = () => {
    // bring all necessary states from store
    const { cart, clearCart, user, addresses, appliedCoupon, currency, exchangeRates } = useStore();
    const navigate = useNavigate();
    
    const [isPlacing, setIsPlacing] = useState(false);
    const [delivery, setDelivery] = useState('standard');
    const [courier, setCourier] = useState('pathao');
    const [payment, setPayment] = useState('card');
    const [selectedAddressId, setSelectedAddressId] = useState('new');

    // form state for controlled inputs
    const [formValues, setFormValues] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ').slice(1).join(' ') || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    });

    const cartItems = Array.isArray(cart) ? cart : [];
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
    const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === delivery);
    const shippingPrice = selectedDelivery ? selectedDelivery.price : 0;
    const total = subtotal - discountAmount + shippingPrice;

    // dynamic price formatter
    const formatPrice = (price) => {
        const converted = price * exchangeRates[currency];
        if (currency === 'BDT') return `৳${converted.toFixed(0)}`;
        if (currency === 'EUR') return `€${converted.toFixed(2)}`;
        if (currency === 'INR') return `₹${converted.toFixed(0)}`;
        return `$${converted.toFixed(2)}`;
    };

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/shop');
        }
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    // handle input changes
    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    // handle address selection from profile book
    const handleAddressChange = (e) => {
        const val = e.target.value;
        setSelectedAddressId(val);
        if (val === 'new') {
            setFormValues({
                firstName: user?.name?.split(' ')[0] || '',
                lastName: user?.name?.split(' ').slice(1).join(' ') || '',
                email: user?.email || '',
                phone: '',
                address: '',
                city: '',
                zip: ''
            });
        } else {
            const addr = addresses.find(a => a.id.toString() === val);
            if (addr) {
                setFormValues(prev => ({
                    ...prev,
                    phone: addr.phone || '',
                    address: addr.address || ''
                }));
            }
        }
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault(); 
        setIsPlacing(true);
        {/* construct premium order payload */}
        // eslint-disable-next-line react-hooks/purity
        const newOrderNum = `ORD-${Math.floor(Math.random() * 900000) + 100000}`;
        const orderData = {
            orderNum: newOrderNum,
            items: cartItems,
            subtotal: subtotal - discountAmount, // save discounted subtotal
            shipping: shippingPrice,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            buyerDetails: {
                name: `${formValues.firstName} ${formValues.lastName}`,
                email: formValues.email,
                phone: formValues.phone,
                address: formValues.address,
                city: formValues.city,
                zip: formValues.zip
            },
            paymentMethod: payment,
            courier: COURIERS.find(c => c.id === courier)?.title || 'N/A'
        };
        {/* save order to localstorage for profile history */}
        const existingOrders = JSON.parse(localStorage.getItem("cabbage_orders")) || [];
        localStorage.setItem("cabbage_orders", JSON.stringify([...existingOrders, orderData]));
        
        setTimeout(() => {
            setIsPlacing(false);
            showToast({ message: 'Order Placed Successfully!', type: 'success' });
            setTimeout(() => {
                navigate('/success', { state: orderData });
                if (clearCart) clearCart();
            }, 1000);
        }, 1500);
    };

    if (!cartItems.length) return null;

    return (
        <div className="bg-[#FDFCF8] min-h-screen py-8 sm:py-10 lg:py-16">
            <div className="max-w-287.5 mx-auto px-4 sm:px-5 lg:px-8">
                {/* header */}
                <div className="flex flex-col items-center mb-8 sm:mb-12 text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-int text-[#232323] tracking-tight mb-3 sm:mb-4">Secure Checkout</h1>
                    <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-bold font-nuni text-[#546375] uppercase tracking-widest">
                        <Link to="/cart" className="hover:text-[#80B500] transition-colors cursor-pointer">Cart</Link>
                        <FiChevronRight className="text-[10px]" /> 
                        <span className="text-[#80B500]">Checkout</span>
                        <FiChevronRight className="text-[10px]" /> 
                        <span>Payment</span>
                    </div>
                </div>
                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* left : main inputs */}
                    <div className="w-full lg:w-[60%] space-y-6 sm:space-y-7">
                        {/* contact & address */}
                        <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] border border-[#ececec]">
                            <div className="flex items-center gap-3 sm:gap-3.5 mb-6 sm:mb-7">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-[#80B500]/15 text-[#80B500] text-[13px] sm:text-[14px] font-black font-int rounded-full flex items-center justify-center shrink-0">1</span>
                                <h2 className="text-[17px] sm:text-[19px] font-black font-int text-[#232323]">Shipping Details</h2>
                            </div>
                            {/* address book selection */}
                            {addresses && addresses.length > 0 && (
                                <div className="mb-5 sm:mb-6 p-4 bg-[#F4F7F0] border border-[#ececec] rounded-xl">
                                    <label className="block text-[12px] sm:text-[13px] font-bold font-nuni text-[#80B500] uppercase tracking-widest mb-2">Saved Addresses</label>
                                    <select 
                                        value={selectedAddressId} 
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2.5 bg-white border border-[#ececec] rounded-lg outline-none focus:border-[#80B500] transition-all text-[13px] font-nuni font-bold text-[#232323] cursor-pointer"
                                    >
                                        <option value="new">Enter a new address</option>
                                        {addresses.map(addr => (
                                            <option key={addr.id} value={addr.id}>{addr.type} - {addr.address.substring(0, 30)}...</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-5">
                                <ModernInput label="First Name" name="firstName" half value={formValues.firstName} onChange={handleInputChange} />
                                <ModernInput label="Last Name" name="lastName" half value={formValues.lastName} onChange={handleInputChange} />
                                <ModernInput label="Email Address" name="email" type="email" value={formValues.email} onChange={handleInputChange} />
                                <ModernInput label="Phone Number" name="phone" type="tel" value={formValues.phone} onChange={handleInputChange} />
                                <ModernInput label="Street Address" name="address" value={formValues.address} onChange={handleInputChange} />
                                <ModernInput label="City" name="city" half value={formValues.city} onChange={handleInputChange} />
                                <ModernInput label="Zip Code" name="zip" half value={formValues.zip} onChange={handleInputChange} />
                            </div>
                        </div>
                        {/* delivery & courier */}
                        <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] border border-[#ececec]">
                            <div className="flex items-center gap-3 sm:gap-3.5 mb-6 sm:mb-7">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-[#80B500]/15 text-[#80B500] text-[13px] sm:text-[14px] font-black font-int rounded-full flex items-center justify-center shrink-0">2</span>
                                <h2 className="text-[17px] sm:text-[19px] font-black font-int text-[#232323]">Delivery Options</h2>
                            </div>
                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                {DELIVERY_OPTIONS.map(opt => (
                                    <ToggleCard 
                                        key={opt.id} checked={delivery === opt.id} onChange={() => setDelivery(opt.id)}
                                        icon={opt.icon} title={opt.title} subtitle={opt.eta}
                                        rightElement={<span className="text-[13px] sm:text-[14px] font-black font-int text-[#232323]">{opt.price ? formatPrice(opt.price) : 'Free'}</span>}
                                    />
                                ))}
                            </div>
                            <h3 className="text-[12px] sm:text-[13px] font-bold font-nuni text-[#546375] mb-3 sm:mb-4 uppercase tracking-widest ml-1">Select Courier</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {COURIERS.map(c => (
                                    <label key={c.id} className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl sm:rounded-2xl cursor-pointer transition-all ${courier === c.id ? 'border-[#80B500] bg-[#80B500]/4' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                                        <input type="radio" checked={courier === c.id} onChange={() => setCourier(c.id)} className="hidden" />
                                        <span className="w-3.5 h-3.5 rounded-full mb-2 sm:mb-2.5 shadow-sm" style={{ background: c.color }}/>
                                        <span className="text-[13px] sm:text-[14px] font-bold font-int text-[#232323] text-center">{c.title}</span>
                                        <span className="text-[11px] sm:text-[11.5px] font-nuni text-[#546375] text-center mt-0.5 sm:mt-1">{c.desc}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* payment */}
                        <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] border border-[#ececec]">
                            <div className="flex items-center gap-3 sm:gap-3.5 mb-6 sm:mb-7">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-[#80B500]/15 text-[#80B500] text-[13px] sm:text-[14px] font-black font-int rounded-full flex items-center justify-center shrink-0">3</span>
                                <h2 className="text-[17px] sm:text-[19px] font-black font-int text-[#232323]">Payment Method</h2>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                <ToggleCard 
                                    checked={payment === 'card'} onChange={() => setPayment('card')}
                                    icon={<FiCreditCard size={18} className="sm:text-[20px]" />} title="Credit / Debit Card" subtitle="Processed securely by Stripe"
                                />
                                {payment === 'card' && (
                                    <div className="pl-3 sm:pl-4 pr-3 sm:pr-4 pb-3 sm:pb-4 pt-2 ml-3 sm:ml-4 border-l-2 border-[#ececec] grid grid-cols-2 gap-3 sm:gap-4 animate-fade-in">
                                        <div className="col-span-2">
                                            <input required type="text" placeholder="Card Number" className="w-full px-4 py-3 sm:py-3.5 bg-white border border-[#ececec] rounded-xl outline-none focus:border-[#80B500] focus:ring-4 focus:ring-[#80B500]/15 text-[13px] sm:text-[14px] font-nuni transition-all" />
                                        </div>
                                        <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 sm:py-3.5 bg-white border border-[#ececec] rounded-xl outline-none focus:border-[#80B500] focus:ring-4 focus:ring-[#80B500]/15 text-[13px] sm:text-[14px] font-nuni transition-all" />
                                        <input required type="text" placeholder="CVC" className="w-full px-4 py-3 sm:py-3.5 bg-white border border-[#ececec] rounded-xl outline-none focus:border-[#80B500] focus:ring-4 focus:ring-[#80B500]/15 text-[13px] sm:text-[14px] font-nuni transition-all" />
                                    </div>
                                )}
                                <ToggleCard 
                                    checked={payment === 'cod'} onChange={() => setPayment('cod')}
                                    icon={<FiTruck size={18} className="sm:text-[20px]" />} title="Cash on Delivery" subtitle="Pay via cash upon arrival"
                                />
                            </div>
                        </div>
                        
                    </div>
                    {/* right : order summary */}
                    <div className="w-full lg:w-[40%]">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#ececec] p-5 sm:p-6 lg:p-8 sticky top-24">
                            <h2 className="text-[17px] sm:text-[19px] font-black font-int text-[#232323] mb-5 sm:mb-7">Order Summary</h2>
                            {/* product list */}
                            <div className="space-y-4 sm:space-y-5 mb-5 sm:mb-7 max-h-87.5 overflow-y-auto pr-3 sm:pr-4 pt-2 sm:pt-3 -mt-2 sm:-mt-3 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-3 sm:gap-4 items-center group">
                                        <div className="w-15 h-15 sm:w-18 sm:h-18 bg-[#f4f6f8] border border-gray-100 rounded-xl sm:rounded-2xl relative shrink-0 flex items-center justify-center p-2 transition-all">
                                            <img src={item.image || item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                            <span className="absolute -top-2 -right-2 sm:-top-2.5 sm:-right-2.5 bg-[#80B500] text-white text-[10px] sm:text-[11px] font-black font-nuni w-5 h-5 sm:w-6.5 sm:h-6.5 flex items-center justify-center rounded-full border-2 sm:border-[2.5px] border-white shadow-sm z-10">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <div className="pr-2 sm:pr-3">
                                                <h5 className="text-[13px] sm:text-[14px] font-bold font-int text-[#232323] line-clamp-2 leading-snug">{item.title}</h5>
                                                <p className="text-[11px] sm:text-[12.5px] text-[#546375] font-nuni mt-0.5 sm:mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-[14px] sm:text-[15px] font-black font-int text-[#232323]">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-px w-full bg-[#ececec] my-5 sm:my-6"></div>
                            {/* calculation */}
                            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-7">
                                <div className="flex justify-between items-center text-[13px] sm:text-[14.5px]">
                                    <span className="text-[#546375] font-nuni font-bold">Subtotal</span> 
                                    <span className="font-black font-int text-[#232323]">{formatPrice(subtotal)}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between items-center text-[13px] sm:text-[14.5px]">
                                        <span className="text-[#80B500] font-nuni font-bold">Discount ({appliedCoupon.discountPercentage}%)</span> 
                                        <span className="font-black font-int text-[#80B500]">- {formatPrice(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-[13px] sm:text-[14.5px]">
                                    <span className="text-[#546375] font-nuni font-bold">Shipping ({selectedDelivery?.title})</span> 
                                    <span className="font-black font-int text-[#232323]">
                                        {shippingPrice > 0 ? formatPrice(shippingPrice) : <span className="text-[#80B500] uppercase tracking-widest text-[11px] sm:text-[12px]">Free</span>}
                                    </span>
                                </div>
                            </div>
                            {/* total container */}
                            <div className="bg-[#80B500]/6 border border-[#80B500]/15 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex justify-between items-center">
                                <div>
                                    <span className="text-[12px] sm:text-[13px] font-bold font-nuni text-[#80B500] uppercase tracking-widest block mb-0.5">Total Amount</span>
                                    <span className="text-[10px] sm:text-[11px] font-nuni text-[#546375]">VAT & Taxes Included</span>
                                </div>
                                <span className="text-2xl sm:text-3xl font-black font-int text-[#80B500]">{formatPrice(total)}</span>
                            </div>
                            {/* button */}
                            <button type="submit" disabled={isPlacing} className="w-full mt-5 sm:mt-7 bg-[#80B500] hover:bg-[#73a300] text-white font-bold font-int uppercase tracking-widest text-[12px] sm:text-[13px] py-3.5 sm:py-4 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#80B500]/25 cursor-pointer disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed">
                                {isPlacing ? (
                                    <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiLock size={15} className="text-white/80" />
                                        Pay {formatPrice(total)}
                                    </>
                                )}
                            </button>
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] text-[#546375] font-nuni mt-5 sm:mt-6">
                                <FiShield className="text-[#80B500] text-[13px] sm:text-[15px]" /> 
                                <span>Secured by 256-bit AES Encryption</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default Checkout;