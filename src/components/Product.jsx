import React, { useState } from 'react';
import Flex from './Flex';
import { IoCartOutline, IoCart, IoClose } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa'; 
import { GoZoomIn } from 'react-icons/go';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { showToast } from './Toast';

const Product = ({ 
    productId,
    imgString, 
    productImg, 
    isList, 
    productDesc, 
    productRatings, 
    badge, 
    productTitle, 
    productPrice, 
    productOffer 
}) => {
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const { addToCart, addToWishlist, wishlist, cart, removeFromWishlist, removeFromCart, currency, exchangeRates } = useStore();
    const currentId = productId || productTitle;
    const productSlug = productTitle 
        ? productTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
        : String(productId);
    // price formatter function
    const formatPrice = (priceStr) => {
        if (!priceStr) return "";
        const numericPrice = parseFloat(priceStr.toString().replace(/[^0-9.]/g, ''));
        const converted = numericPrice * exchangeRates[currency];
        if (currency === 'BDT') return `৳${converted.toFixed(0)}`;
        if (currency === 'EUR') return `€${converted.toFixed(2)}`;
        if (currency === 'INR') return `₹${converted.toFixed(0)}`;
        return `$${converted.toFixed(2)}`;
    };

    const productData = {
        id: currentId,
        title: productTitle,
        price: parseFloat(productPrice?.toString().replace(/[^0-9.]/g, '') || 0), 
        image: imgString || "", 
    };

    const isAlreadyInWishlist = wishlist.some(item => item.id === currentId);
    const isAlreadyInCart = cart.some(item => item.id === currentId);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (isAlreadyInWishlist) {
            removeFromWishlist(currentId);
            showToast({
                message: 'Removed from wishlist',
                subMessage: productTitle,
                type: 'danger',
            });
        } else {
            addToWishlist(productData);
            showToast({
                message: 'Added to wishlist',
                subMessage: productTitle,
                type: 'success',
            });
        }
    };

    const handleCartToggle = (e) => {
        e.preventDefault();
        if (isAlreadyInCart) {
            removeFromCart(currentId);
            showToast({
                message: 'Removed from cart',
                subMessage: productTitle,
                type: 'danger',
            });
        } else {
            addToCart(productData);
            showToast({
                message: 'Added to cart',
                subMessage: productTitle,
                type: 'success',
            });
        }
    };

    const handleZoomClick = (e) => {
        e.preventDefault();
        setIsZoomOpen(true);
    };

    const iconClass = "bg-white text-[#80B500] rounded-full p-2.5 hover:bg-[#80B500] hover:text-white duration-300 cursor-pointer opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 flex items-center justify-center";

    return (
        <>
            <div className={`w-full group duration-300 overflow-hidden bg-white shadow-customMade border border-[#e5e5e5] hover:border-[#80B500] rounded-md 
                ${isList ? 'flex flex-col sm:flex-row p-4 gap-6 items-center' : 'pt-2 px-2 pb-5 sm:pb-7'}
            `}>
                {/* image section */}
                <div className={`bg-[#f4f6f8] rounded-md group-hover:bg-[#e8ecef] duration-300 relative flex justify-center items-center overflow-hidden shrink-0 
                    ${isList ? 'w-full sm:w-70 h-55' : 'w-full h-50 sm:h-57.75'}
                `}>
                    <Link to={`/product/${productSlug}`} className="w-full h-full flex items-center justify-center">
                        {productImg}
                    </Link>
                    {!isList && (
                        <Flex className="gap-x-2.75 absolute bottom-10 sm:bottom-15 left-1/2 -translate-x-1/2 z-10">
                            {/* cart icon */}
                            <div onClick={handleCartToggle} className={iconClass}>
                                {isAlreadyInCart ? <IoCart className="text-[14px]" /> : <IoCartOutline className="text-[14px]" />}
                            </div>
                            {/* wishlist icon */}
                            <div onClick={handleWishlistToggle} className={`${iconClass} delay-100`}>
                                {isAlreadyInWishlist ? <FaHeart className="text-[14px]" /> : <GrFavorite className="text-[14px]" />}
                            </div>
                            {/* zoom icon */}
                            <div onClick={handleZoomClick} className={`${iconClass} delay-200`}>
                                <GoZoomIn className="text-[14px]" />
                            </div>
                        </Flex>
                    )}
                </div>
                {/* content section */}
                <div className={`w-full ${isList ? 'flex-1 flex flex-col justify-center' : ''}`}>
                    <div className="flex justify-between mt-3.75 sm:mt-5.25 items-center px-1 sm:px-2 gap-x-2">
                        <div className="flex items-center gap-x-1 sm:w-auto shrink-0">
                            {productRatings}
                        </div>
                        {badge && (
                            <p className={`text-white font-nuni bg-[#80B500] whitespace-nowrap 
                                ${isList ? 'text-[12px] px-3 py-1 rounded-sm' : 'text-[10px] sm:text-base px-2 sm:px-1.75 py-0.5 rounded-tl-xl sm:rounded-tl-2xl rounded-br-xl sm:rounded-br-2xl rounded-tr-md rounded-bl-md'}
                            `}>
                                {badge}
                            </p>
                        )}
                    </div>
                    <h4 className={`text-[#232323] font-bold font-int pt-1.25 px-1 sm:px-2 
                        ${isList ? 'text-[18px] sm:text-[22px] mt-2 mb-2 whitespace-normal' : 'text-[14px] sm:text-base truncate'}
                    `}>
                        <Link to={`/product/${productSlug}`} className="hover:text-[#80B500] transition-colors">
                            {productTitle}
                        </Link>
                    </h4>
                    <div className="flex pt-2 sm:pt-3.25 items-baseline gap-x-2 px-1 sm:px-2 flex-wrap">
                        {/* dynamic price */}
                        <p className={`font-bold text-[#283C54] font-nuni ${isList ? 'text-[18px] sm:text-[20px]' : 'text-[13px] sm:text-[15px]'}`}>
                            {formatPrice(productPrice)}
                        </p>
                        {/* dynamic offer price */}
                        {productOffer && (
                            <p className={`font-bold text-[#80B500] font-nuni line-through ${isList ? 'text-[14px] sm:text-[15px]' : 'text-[11px] sm:text-[12px]'}`}>
                                {formatPrice(productOffer)}
                            </p>
                        )}
                    </div>
                    {isList && (
                        <div className="px-1 sm:px-2 mt-4">
                            <p className="text-gray-500 font-nuni text-[14px] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-5 pr-0 sm:pr-10">
                                {productDesc || "Experience the best quality and natural freshness. A perfect choice for a healthy and vibrant lifestyle. Get it today and elevate your daily routine!"}
                            </p>
                            <Flex className="gap-3">
                                <button 
                                    onClick={handleCartToggle} 
                                    className={`text-white px-5 py-2.5 rounded-[3px] font-nuni font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer
                                        ${isAlreadyInCart ? 'bg-[#232323] hover:bg-[#111]' : 'bg-[#80B500] hover:bg-[#6a9600]'}
                                    `}
                                >
                                    {isAlreadyInCart ? <IoCart className="text-lg" /> : <IoCartOutline className="text-lg" />}
                                    {isAlreadyInCart ? "Remove Cart" : "Add to Cart"}
                                </button>
                                <button 
                                    onClick={handleWishlistToggle} 
                                    className="bg-[#f4f6f8] hover:bg-[#e8ecef] px-3.5 py-2.5 rounded-[3px] transition-colors duration-300 cursor-pointer flex items-center justify-center"
                                >
                                    {isAlreadyInWishlist ? <FaHeart className="text-lg text-[#80B500]" /> : <GrFavorite className="text-lg text-[#444]" />}
                                </button>
                            </Flex>
                        </div>
                    )}
                </div>
            </div>
            {/* image zoom modal */}
            {isZoomOpen && (
                <div 
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300"
                    onClick={() => setIsZoomOpen(false)}
                >
                    <div 
                        className="relative bg-white rounded-lg p-5 max-w-2xl w-full flex flex-col items-center shadow-2xl animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* close button */}
                        <button 
                            onClick={() => setIsZoomOpen(false)}
                            className="absolute top-3 right-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full transition-colors duration-300 cursor-pointer"
                        >
                            <IoClose className="text-xl" />
                        </button>
                        {/* product image */}
                        <img 
                            src={imgString} 
                            alt={productTitle} 
                            className="w-full h-auto max-h-[70vh] object-contain rounded-md" 
                        />
                        {/* product info inside modal */}
                        <h3 className="text-2xl font-bold text-[#232323] font-int mt-4 text-center">
                            {productTitle}
                        </h3>
                        <p className="text-[#80B500] font-bold text-xl font-nuni mt-1">
                            {formatPrice(productPrice)}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Product;