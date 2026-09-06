import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import { BsCartX } from "react-icons/bs"; 
import { FaTrash } from "react-icons/fa";
import { useStore } from "../../store/useStore";
import { showToast } from "../Toast"; 

const Cart = () => {
    const { 
        cart, 
        removeFromCart, 
        updateQuantity, 
        user, 
        currency, 
        exchangeRates, 
        appliedCoupon, 
        applyCoupon, 
        removeCoupon 
    } = useStore();
    const navigate = useNavigate();
    const [couponInput, setCouponInput] = useState("");

    // format price based on selected currency
    const formatPrice = (price) => {
        const converted = price * exchangeRates[currency];
        if (currency === 'BDT') return `৳${converted.toFixed(0)}`;
        if (currency === 'EUR') return `€${converted.toFixed(2)}`;
        if (currency === 'INR') return `₹${converted.toFixed(0)}`;
        return `$${converted.toFixed(2)}`;
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    // calculate discount if coupon is applied
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
    const finalTotal = subtotal - discountAmount;

    // handle coupon apply directly from admin's localstorage
    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (!couponInput.trim()) {
            showToast({ message: 'Please enter a coupon code', type: 'danger' });
            return;
        }

        // fetch dynamic coupons created in Admin Panel
        const savedCoupons = JSON.parse(localStorage.getItem("cabbage_coupons")) || [];
        const foundCoupon = savedCoupons.find(c => c.code.toLowerCase() === couponInput.toLowerCase());

        if (foundCoupon) {
            applyCoupon(foundCoupon);
            setCouponInput("");
            showToast({ message: `Coupon applied! You got ${foundCoupon.discountPercentage}% off.`, type: 'success' });
        } else {
            showToast({ message: 'Invalid or expired coupon code', type: 'danger' });
        }
    };

    // handle coupon remove
    const handleRemoveCoupon = () => {
        removeCoupon();
        showToast({ message: 'Coupon removed', type: 'danger' });
    };

    // checkout validation handler
    const handleCheckout = () => {
        if (user) {
            navigate('/checkout');
        } else {
            showToast({ message: 'Please login to proceed to checkout!', type: 'danger' });
            navigate('/login');
        }
    };

    // empty cart state
    if (cart.length === 0) {
        return (
            <div className="bg-[#F9FBF5] min-h-[70vh] py-24 flex items-center justify-center">
                <Container className="px-4 lg:px-0">
                    <Flex className="flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-gray-300 border border-gray-100">
                            <BsCartX className="text-5xl" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black font-int text-[#232323] mb-3">
                            Your Cart is Empty
                        </h2>
                        <p className="text-[#546375] font-nuni text-base mb-8 max-w-md">
                            Looks like you haven't added anything to your cart yet. Browse our products and find something you love!
                        </p>
                        <Link to="/shop">
                            <button className="cursor-pointer bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold font-nuni uppercase tracking-widest py-3.5 px-8 rounded-full transition-all duration-300">
                                Return to Shop
                            </button>
                        </Link>
                    </Flex>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-[#F9FBF5] min-h-[70vh] py-20 pb-24">
            <Container className="px-4 lg:px-0">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black font-int text-[#232323] mb-2">
                        Shopping Cart
                    </h2>
                    <p className="text-[#546375] font-nuni text-sm">
                        Review your items and proceed to checkout
                    </p>
                </div>
                <Flex className="flex-col lg:flex-row gap-8 items-start">
                    {/* cart items list */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        <div className="bg-white border border-[#e5e5e5] rounded-xl p-6">
                            <div className="hidden md:flex justify-between text-gray-400 font-nuni text-sm font-bold border-b border-gray-100 pb-4 mb-4 uppercase tracking-wider">
                                <div className="w-1/2">Product</div>
                                <div className="w-1/6 text-center">Price</div>
                                <div className="w-1/6 text-center">Qty</div>
                                <div className="w-1/6 text-right">Total</div>
                            </div>
                            <div className="flex flex-col gap-y-6">
                                {cart.map((item) => (
                                    <Flex key={item.id} className="flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-6 last:border-0 last:pb-0 gap-y-4 md:gap-y-0">
                                        {/* product info */}
                                        <Flex className="w-full md:w-1/2 items-center gap-4">
                                            <div className="w-20 h-20 bg-[#f4f6f8] rounded-lg p-2 flex items-center justify-center shrink-0">
                                                <Images imgSrc={item.image || item.thumbnail} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div>
                                                <h4 className="text-[#232323] font-bold font-int text-base hover:text-[#80B500] transition-colors cursor-pointer line-clamp-2">
                                                    {item.title}
                                                </h4>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-400 hover:text-red-500 text-sm flex items-center gap-2 mt-2 transition-colors cursor-pointer"
                                                >
                                                    <FaTrash className="text-xs" /> Remove
                                                </button>
                                            </div>
                                        </Flex>
                                        {/* price */}
                                        <div className="w-full md:w-1/6 text-left md:text-center text-[#546375] font-nuni">
                                            {formatPrice(item.price)}
                                        </div>
                                        {/* quantity control */}
                                        <div className="w-full md:w-1/6 flex justify-start md:justify-center">
                                            <div className="flex items-center bg-[#f4f6f8] rounded-md border border-gray-200">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-gray-500 hover:text-[#232323] cursor-pointer font-bold">-</button>
                                                <span className="px-3 py-1 text-[#232323] font-bold font-nuni bg-white">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-gray-500 hover:text-[#232323] cursor-pointer font-bold">+</button>
                                            </div>
                                        </div>
                                        {/* total */}
                                        <div className="w-full md:w-1/6 text-left md:text-right text-[#80B500] font-bold font-nuni text-lg">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </Flex>
                                ))}
                            </div>
                        </div>
                        {/* coupon section */}
                        <div className="bg-white border border-[#e5e5e5] rounded-xl p-6">
                            <h3 className="text-lg font-bold font-int text-[#232323] mb-4">Have a Coupon?</h3>
                            {appliedCoupon ? (
                                <Flex className="justify-between items-center bg-[#f0f8eb] border border-[#80B500]/30 p-4 rounded-md">
                                    <div className="flex flex-col">
                                        <span className="text-[#80B500] font-bold font-nuni">Code '{appliedCoupon.code}' Applied!</span>
                                        <span className="text-sm text-[#546375] font-nuni">You got {appliedCoupon.discountPercentage}% discount.</span>
                                    </div>
                                    <button 
                                        onClick={handleRemoveCoupon}
                                        className="text-red-500 hover:text-red-600 font-bold text-sm cursor-pointer underline"
                                    >
                                        Remove
                                    </button>
                                </Flex>
                            ) : (
                                <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-3">
                                    <input 
                                        type="text" 
                                        placeholder="Enter coupon code (e.g. EID50)" 
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        className="flex-1 border border-gray-200 rounded-md px-4 py-3 outline-none focus:border-[#80B500] font-nuni transition-colors uppercase placeholder:normal-case"
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-[#232323] hover:bg-[#80B500] text-white font-bold font-nuni uppercase tracking-widest px-8 py-3 rounded-md transition-colors cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                    {/* order summary */}
                    <div className="w-full lg:w-1/3 bg-white border border-[#e5e5e5] rounded-xl p-6 lg:p-8 sticky top-32">
                        <h3 className="text-xl font-bold font-int text-[#232323] border-b border-gray-100 pb-4 mb-6">
                            Order Summary
                        </h3>
                        <Flex className="justify-between items-center mb-4 text-[#546375] font-nuni">
                            <span>Subtotal</span>
                            <span className="font-bold text-[#232323]">{formatPrice(subtotal)}</span>
                        </Flex>
                        {appliedCoupon && (
                            <Flex className="justify-between items-center mb-4 text-[#80B500] font-nuni">
                                <span>Discount ({appliedCoupon.discountPercentage}%)</span>
                                <span className="font-bold">- {formatPrice(discountAmount)}</span>
                            </Flex>
                        )}
                        <Flex className="justify-between items-center mb-6 text-[#546375] font-nuni border-b border-gray-100 pb-6">
                            <span>Shipping</span>
                            <span className="text-[#80B500] font-bold">Free</span>
                        </Flex>
                        <Flex className="justify-between items-center mb-8">
                            <span className="text-[#232323] font-bold text-lg font-int">Total</span>
                            <span className="text-[#80B500] font-black text-2xl font-nuni">{formatPrice(finalTotal)}</span>
                        </Flex>
                        {/* checkout button */}
                        <button 
                            onClick={handleCheckout} 
                            className="cursor-pointer w-full bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold font-nuni uppercase tracking-widest py-4 rounded-md transition-all duration-300 shadow-md"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </Flex>
            </Container>
        </div>
    );
};

export default Cart;