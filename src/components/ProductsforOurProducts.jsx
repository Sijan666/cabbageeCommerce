import React, { useState } from 'react';
import Flex from './Flex';
import Images from './Images';
import { IoCartOutline, IoCart, IoClose } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';
import { GoZoomIn } from 'react-icons/go';
import { useStore } from '../store/useStore';

const ProductforOurProducts = ({ 
    productId,
    imgString,
    productsImg, 
    className, 
    productsTitle, 
    productsPrice, 
    productsBrand 
}) => {
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const { addToCart, addToWishlist, wishlist, cart, removeFromWishlist, removeFromCart } = useStore();
    const currentId = productId || productsTitle;

    const productData = {
        id: currentId,
        title: productsTitle,
        price: parseFloat(productsPrice?.replace('$', '') || 0), 
        image: imgString || "", 
    };

    const isAlreadyInWishlist = wishlist.some(item => item.id === currentId);
    const isAlreadyInCart = cart.some(item => item.id === currentId);

    // Wishlist
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        if (isAlreadyInWishlist) {
            removeFromWishlist(currentId);
        } else {
            addToWishlist(productData);
        }
    };

    // Cart
    const handleCartToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAlreadyInCart) {
            removeFromCart(currentId);
        } else {
            addToCart(productData);
        }
    };

    const handleZoomClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsZoomOpen(true);
    };

    const baseIconClass = "rounded-full p-2.5 duration-300 cursor-pointer flex items-center justify-center opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100";

    return (
        <>
            <div className={`w-full pb-5 sm:pb-7 ${className} shadow-customMade border border-[#FFFFFF] hover:border hover:border-[#80B500] group duration-300 overflow-hidden`}>
                <div className="bg-[#C8CACF] h-50 sm:h-57.75 w-full group-hover:bg-[#E0E2EB] duration-300 relative flex justify-center items-center overflow-hidden">
                    {productsImg}
                    <Flex className={'gap-x-2.75 absolute bottom-10 sm:bottom-15 left-1/2 -translate-x-1/2 z-10'}>
                        {/* Cart Icon */}
                        <div 
                            onClick={handleCartToggle} 
                            className={`
                                ${baseIconClass} 
                                ${isAlreadyInCart ? 'bg-[#80B500] text-white' : 'bg-white text-[#80B500] hover:bg-[#80B500] hover:text-white'}
                            `}
                        >
                            {isAlreadyInCart ? <IoCart className="text-[14px]" /> : <IoCartOutline className="text-[14px]" />}
                        </div>
                        {/* Wishlist Icon */}
                        <div 
                            onClick={handleWishlistToggle} 
                            className={`
                                ${baseIconClass} delay-100 
                                ${isAlreadyInWishlist ? 'bg-[#80B500] text-white' : 'bg-white text-[#80B500] hover:bg-[#80B500] hover:text-white'}
                            `}
                        >
                            {isAlreadyInWishlist ? <FaHeart className="text-[14px]" /> : <GrFavorite className="text-[14px]" />}
                        </div>
                        {/* Zoom Icon */}
                        <div 
                            onClick={handleZoomClick} 
                            className={`bg-white text-[#80B500] hover:bg-[#80B500] hover:text-white ${baseIconClass} delay-200`}
                        >
                            <GoZoomIn className="text-[14px]" />
                        </div>
                    </Flex>
                </div>
                <div className="text-center pt-3 px-2 sm:px-3">
                    <h4 className='text-[#232323] text-[14px] sm:text-base font-bold font-int pt-1.25 truncate'>{productsTitle}</h4>
                    <p className='pt-2 sm:pt-4 pb-1 sm:pb-2 text-[#546375] font-nuni text-[11px] sm:text-[12px] truncate'>{productsBrand}</p>
                    <p className='text-[13px] sm:text-[14px] text-[#80B500] font-nuni'>{productsPrice}</p>
                </div>
            </div>
            {/* Image Zoom Modal */}
            {isZoomOpen && (
                <div 
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300"
                    onClick={() => setIsZoomOpen(false)}
                >
                    <div 
                        className="relative bg-white rounded-lg p-5 max-w-2xl w-full flex flex-col items-center shadow-2xl animate-scaleIn"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsZoomOpen(false)}
                            className="absolute top-3 right-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full transition-colors duration-300 cursor-pointer"
                        >
                            <IoClose className="text-xl" />
                        </button>
                        {/* Product Image */}
                        <Images 
                            imgSrc={imgString} 
                            className="w-full h-auto max-h-[70vh] object-contain rounded-md" 
                        />
                        {/* Product Info inside Modal */}
                        <h3 className="text-2xl font-bold text-[#232323] font-int mt-4 text-center">
                            {productsTitle}
                        </h3>
                        <p className="text-[#546375] font-nuni text-sm mt-1">
                            {productsBrand}
                        </p>
                        <p className="text-[#80B500] font-bold text-xl font-nuni mt-2">
                            {productsPrice}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductforOurProducts;