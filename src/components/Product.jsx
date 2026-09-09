import React, { useState } from 'react';
import Flex from './Flex';
import Images from './Images';
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

    const iconClass = "bg-white text-[#80B500] rounded-full p-1.5 sm:p-2.5 hover:bg-[#80B500] hover:text-white duration-300 cursor-pointer opacity-0 translate-y-5 sm:translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 flex items-center justify-center shadow-md";

    return (
        <>
            <div className={`w-full group duration-300 overflow-hidden bg-white shadow-customMade border border-[#e5e5e5] hover:border-[#80B500] rounded-md ${isList ? 'flex flex-col sm:flex-row p-3 sm:p-4 gap-4 sm:gap-6 items-center' : 'pt-2 px-1 sm:px-2 pb-3 sm:pb-7 flex flex-col h-full'}`}>
                {/* image section */}
                <div className={`bg-[#f4f6f8] rounded-md group-hover:bg-[#e8ecef] duration-300 relative flex justify-center items-center overflow-hidden shrink-0 ${isList ? 'w-full sm:w-70 h-48 sm:h-55' : 'w-full h-35 xs:h-[160px] sm:h-50 md:h-57.75'}`}>
                    <Link to={`/product/${productSlug}`} className="w-full h-full flex items-center justify-center p-2 sm:p-0">
                        {productImg}
                    </Link>
                    {!isList && (
                        <Flex className="gap-x-1.5 sm:gap-x-2.75 absolute bottom-3 sm:bottom-10 md:bottom-15 left-1/2 -translate-x-1/2 z-10 w-full justify-center">
                            {/* cart icon */}
                            <div onClick={handleCartToggle} className={iconClass}>
                                {isAlreadyInCart ? <IoCart className="text-[12px] sm:text-[14px]" /> : <IoCartOutline className="text-[12px] sm:text-[14px]" />}
                            </div>
                            {/* wishlist icon */}
                            <div onClick={handleWishlistToggle} className={`${iconClass} delay-100`}>
                                {isAlreadyInWishlist ? <FaHeart className="text-[12px] sm:text-[14px]" /> : <GrFavorite className="text-[12px] sm:text-[14px]" />}
                            </div>
                            {/* zoom icon */}
                            <div onClick={handleZoomClick} className={`${iconClass} delay-200 hidden sm:flex`}>
                                <GoZoomIn className="text-[12px] sm:text-[14px]" />
                            </div>
                        </Flex>
                    )}
                </div>
                {/* content */}
                <div className={`w-full flex flex-col flex-1 ${isList ? 'justify-center' : 'mt-1.5 sm:mt-0'}`}>
                    <div className="flex justify-between mt-2 sm:mt-5.25 items-center px-1 sm:px-2 gap-x-1 sm:gap-x-2 w-full">
                        <div className="flex items-center gap-x-0.5 sm:gap-x-1 shrink text-[#ffc107] text-[10px] sm:text-[14px] [&_span]:hidden sm:[&_span]:inline-block whitespace-nowrap min-w-0">
                            {productRatings}
                        </div>
                        {badge && (
                            <p className={`text-white font-nuni bg-[#80B500] whitespace-nowrap shrink-0 font-bold ${isList ? 'text-[9px] sm:text-[12px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm' : 'text-[8px] sm:text-[11px] px-1.5 sm:px-1.75 py-0.5 rounded-sm sm:rounded-tl-2xl sm:rounded-br-2xl sm:rounded-tr-md sm:rounded-bl-md'}`}>
                                {badge}
                            </p>
                        )}
                    </div>
                    <h4 className={`text-[#232323] font-bold font-int pt-1 sm:pt-1.25 px-1 sm:px-2 ${isList ? 'text-[16px] sm:text-[22px] mt-1 sm:mt-2 mb-1 sm:mb-2 whitespace-normal' : 'text-[11px] xs:text-[13px] sm:text-base line-clamp-2 sm:truncate leading-tight'}`}>
                        <Link to={`/product/${productSlug}`} className="hover:text-[#80B500] transition-colors">
                            {productTitle}
                        </Link>
                    </h4>
                    <div className={`flex pt-1.5 sm:pt-3.25 gap-x-1.5 sm:gap-x-2 px-1 sm:px-2 flex-wrap items-center ${isList ? '' : 'mt-auto pb-1 sm:pb-0'}`}>
                        {/* dynamic price */}
                        <p className={`font-black text-[#283C54] font-nuni ${isList ? 'text-[16px] sm:text-[20px]' : 'text-[12px] sm:text-[15px]'}`}>
                            {formatPrice(productPrice)}
                        </p>
                        {/* dynamic offer price */}
                        {productOffer && (
                            <p className={`font-bold text-[#80B500] font-nuni line-through ${isList ? 'text-[12px] sm:text-[15px]' : 'text-[10px] sm:text-[12px]'}`}>
                                {formatPrice(productOffer)}
                            </p>
                        )}
                    </div>
                    {isList && (
                        <div className="px-1 sm:px-2 mt-3 sm:mt-4 w-full">
                            <p className="text-gray-500 font-nuni text-[12px] sm:text-[14px] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-5 pr-0 sm:pr-10">
                                {productDesc || "Experience the best quality and natural freshness. A perfect choice for a healthy and vibrant lifestyle. Get it today and elevate your daily routine!"}
                            </p>
                            <Flex className="gap-2 sm:gap-3 flex-wrap">
                                <button 
                                    onClick={handleCartToggle} 
                                    className={`text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-[3px] font-nuni font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm ${isAlreadyInCart ? 'bg-[#232323] hover:bg-[#111]' : 'bg-[#80B500] hover:bg-[#6a9600]'}`}>
                                    {isAlreadyInCart ? <IoCart className="text-sm sm:text-lg" /> : <IoCartOutline className="text-sm sm:text-lg" />}
                                    <span className="whitespace-nowrap">{isAlreadyInCart ? "Remove Cart" : "Add to Cart"}</span>
                                </button>
                                <button 
                                    onClick={handleWishlistToggle} 
                                    className="bg-[#f4f6f8] hover:bg-[#e8ecef] px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-[3px] transition-colors duration-300 cursor-pointer flex items-center justify-center">
                                    {isAlreadyInWishlist ? <FaHeart className="text-sm sm:text-lg text-[#80B500]" /> : <GrFavorite className="text-sm sm:text-lg text-[#444]" />}
                                </button>
                            </Flex>
                        </div>
                    )}
                </div>
            </div>
            {/* image zoom modal */}
            {isZoomOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300"
                    onClick={() => setIsZoomOpen(false)}>
                    <div className="relative bg-white rounded-lg p-4 sm:p-5 max-w-sm sm:max-w-2xl w-full flex flex-col items-center shadow-2xl animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}>
                        {/* close button */}
                        <button onClick={() => setIsZoomOpen(false)} className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-1.5 sm:p-2 rounded-full transition-colors duration-300 cursor-pointer z-10">
                            <IoClose className="text-lg sm:text-xl" />
                        </button>
                        {/* product image */}
                        <div className="w-full flex items-center justify-center pt-6 sm:pt-2">
                            <Images 
                                imgSrc={imgString} 
                                className="w-full h-auto max-h-[50vh] sm:max-h-[70vh] object-contain rounded-md" 
                            />
                        </div>
                        {/* product info inside modal */}
                        <h3 className="text-base sm:text-2xl font-bold text-[#232323] font-int mt-3 sm:mt-4 text-center line-clamp-2 px-2">
                            {productTitle}
                        </h3>
                        <p className="text-[#80B500] font-bold text-base sm:text-xl font-nuni mt-1">
                            {formatPrice(productPrice)}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Product;