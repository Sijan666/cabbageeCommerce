import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import { BsCartX } from "react-icons/bs"; 
import { FaTrash } from "react-icons/fa";
import { useStore } from "../../store/useStore";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Empty Cart State
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
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black font-int text-[#232323] mb-2">
                        Shopping Cart
                    </h2>
                    <p className="text-[#546375] font-nuni text-sm">
                        Review your items and proceed to checkout
                    </p>
                </div>
                <Flex className="flex-col lg:flex-row gap-8 items-start">
                    {/* Cart Items List */}
                    <div className="w-full lg:w-2/3 bg-white border border-[#e5e5e5] rounded-xl p-6">
                        <div className="hidden md:flex justify-between text-gray-400 font-nuni text-sm font-bold border-b border-gray-100 pb-4 mb-4 uppercase tracking-wider">
                            <div className="w-1/2">Product</div>
                            <div className="w-1/6 text-center">Price</div>
                            <div className="w-1/6 text-center">Qty</div>
                            <div className="w-1/6 text-right">Total</div>
                        </div>
                        <div className="flex flex-col gap-y-6">
                            {cart.map((item) => (
                                <Flex key={item.id} className="flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-6 last:border-0 last:pb-0 gap-y-4 md:gap-y-0">
                                    {/* Product Info */}
                                    <Flex className="w-full md:w-1/2 items-center gap-4">
                                        <div className="w-20 h-20 bg-[#f4f6f8] rounded-lg p-2 flex items-center justify-center shrink-0">
                                            <Images imgSrc={item.image} className="max-w-full max-h-full object-contain" />
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
                                    {/* Price */}
                                    <div className="w-full md:w-1/6 text-left md:text-center text-[#546375] font-nuni">
                                        ${item.price.toFixed(2)}
                                    </div>
                                    {/* Quantity Control */}
                                    <div className="w-full md:w-1/6 flex justify-start md:justify-center">
                                        <div className="flex items-center bg-[#f4f6f8] rounded-md border border-gray-200">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-gray-500 hover:text-[#232323] cursor-pointer font-bold">-</button>
                                            <span className="px-3 py-1 text-[#232323] font-bold font-nuni bg-white">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-gray-500 hover:text-[#232323] cursor-pointer font-bold">+</button>
                                        </div>
                                    </div>
                                    {/* Total */}
                                    <div className="w-full md:w-1/6 text-left md:text-right text-[#80B500] font-bold font-nuni text-lg">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </Flex>
                            ))}
                        </div>
                    </div>
                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3 bg-white border border-[#e5e5e5] rounded-xl p-6 lg:p-8 sticky top-32">
                        <h3 className="text-xl font-bold font-int text-[#232323] border-b border-gray-100 pb-4 mb-6">
                            Order Summary
                        </h3>
                        <Flex className="justify-between items-center mb-4 text-[#546375] font-nuni">
                            <span>Subtotal</span>
                            <span className="font-bold text-[#232323]">${subtotal.toFixed(2)}</span>
                        </Flex>
                        <Flex className="justify-between items-center mb-6 text-[#546375] font-nuni border-b border-gray-100 pb-6">
                            <span>Shipping</span>
                            <span className="text-[#80B500] font-bold">Free</span>
                        </Flex>
                        <Flex className="justify-between items-center mb-8">
                            <span className="text-[#232323] font-bold text-lg font-int">Total</span>
                            <span className="text-[#80B500] font-black text-2xl font-nuni">${subtotal.toFixed(2)}</span>
                        </Flex>
                        <button className="cursor-pointer w-full bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold font-nuni uppercase tracking-widest py-4 rounded-md transition-all duration-300">
                            Proceed to Checkout
                        </button>
                    </div>
                </Flex>
            </Container>
        </div>
    );
};

export default Cart;