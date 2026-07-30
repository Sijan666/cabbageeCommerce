import React from 'react';
import Flex from './Flex';
import { IoCartOutline } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { GoZoomIn } from 'react-icons/go';
import { useStore } from '../store/useStore';

const Product = ({ 
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
    const { addToCart, addToWishlist } = useStore();

    const productData = {
        id: productTitle,
        title: productTitle,
        price: parseFloat(productPrice?.replace('$', '') || 0), 
        image: imgString || "", 
    };
    const iconClass = "bg-white text-[#80B500] rounded-full p-2.5 hover:bg-[#80B500] hover:text-white duration-300 cursor-pointer opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100";

    return (
        <div className={`w-full group duration-300 overflow-hidden bg-white shadow-customMade border border-[#e5e5e5] hover:border-[#80B500] rounded-md 
            ${isList ? 'flex flex-col sm:flex-row p-4 gap-6 items-center' : 'pt-2 px-2 pb-5 sm:pb-7'}
        `}>
            {/* Image Section */}
            <div className={`bg-[#f4f6f8] rounded-md group-hover:bg-[#e8ecef] duration-300 relative flex justify-center items-center overflow-hidden shrink-0 
                ${isList ? 'w-full sm:w-[280px] h-[220px]' : 'w-full h-[200px] sm:h-[231px]'}
            `}>
                {productImg}
                {/* Hover Action Icons */}
                {!isList && (
                    <Flex className="gap-x-[11px] absolute opacity-0 group-hover:opacity-100 duration-300 bottom-10 sm:bottom-15 left-1/2 -translate-x-1/2">
                        <div onClick={() => addToCart(productData)} className={iconClass}>
                            <IoCartOutline className="text-[14px]" />
                        </div>
                        <div onClick={() => addToWishlist(productData)} className={`${iconClass} delay-100`}>
                            <GrFavorite className="text-[14px]" />
                        </div>
                        <div className={`${iconClass} delay-200`}>
                            <GoZoomIn className="text-[14px]" />
                        </div>
                    </Flex>
                )}
            </div>
            {/* Content Section */}
            <div className={`w-full ${isList ? 'flex-1 flex flex-col justify-center' : ''}`}>
                {/* Ratings & Badge */}
                <div className="flex justify-between mt-[15px] sm:mt-[21px] items-center px-1 sm:px-2 gap-x-2">
                    <div className="flex items-center gap-x-1 sm:w-auto shrink-0">
                        {productRatings}
                    </div>
                    {badge && (
                        <p className={`text-white font-nuni bg-[#80B500] whitespace-nowrap 
                            ${isList ? 'text-[12px] px-3 py-1 rounded-sm' : 'text-[10px] sm:text-base px-2 sm:px-[7px] py-0.5 rounded-tl-xl sm:rounded-tl-2xl rounded-br-xl sm:rounded-br-2xl rounded-tr-md rounded-bl-md'}
                        `}>
                            {badge}
                        </p>
                    )}
                </div>
                {/* Title */}
                <h4 className={`text-[#232323] font-bold font-int pt-[5px] px-1 sm:px-2 
                    ${isList ? 'text-[18px] sm:text-[22px] mt-2 mb-2 whitespace-normal' : 'text-[14px] sm:text-base truncate'}
                `}>
                    {productTitle}
                </h4>
                {/* Pricing */}
                <div className="flex pt-2 sm:pt-[13px] items-baseline gap-x-2 px-1 sm:px-2 flex-wrap">
                    <p className={`font-bold text-[#283C54] font-nuni ${isList ? 'text-[18px] sm:text-[20px]' : 'text-[13px] sm:text-[15px]'}`}>
                        {productPrice}
                    </p>
                    {productOffer && (
                        <p className={`font-bold text-[#80B500] font-nuni line-through ${isList ? 'text-[14px] sm:text-[15px]' : 'text-[11px] sm:text-[12px]'}`}>
                            {productOffer}
                        </p>
                    )}
                </div>
                {/* List View Details */}
                {isList && (
                    <div className="px-1 sm:px-2 mt-4">
                        <p className="text-gray-500 font-nuni text-[14px] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-5 pr-0 sm:pr-10">
                            {productDesc || "Experience the best quality and natural freshness. A perfect choice for a healthy and vibrant lifestyle. Get it today and elevate your daily routine!"}
                        </p>
                        <Flex className="gap-3">
                            <button 
                                onClick={() => addToCart(productData)} 
                                className="bg-[#80B500] hover:bg-[#6a9600] text-white px-5 py-2.5 rounded-[3px] font-nuni font-bold transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                            >
                                <IoCartOutline className="text-lg" />
                                Add to Cart
                            </button>
                            <button 
                                onClick={() => addToWishlist(productData)} 
                                className="bg-[#f4f6f8] text-[#444] hover:bg-[#e8ecef] px-3.5 py-2.5 rounded-[3px] transition-colors duration-300 cursor-pointer"
                            >
                                <GrFavorite className="text-lg" />
                            </button>
                        </Flex>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Product;