import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
// Icons
import { IoAdd, IoRemove, IoStar, IoChevronBack, IoChevronForward, IoCart } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

import Container from '../Container';
import Loader from '../Loader';
import { useStore } from '../../store/useStore';
import { showToast } from '../Toast';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, addToWishlist, removeFromWishlist, removeFromCart, wishlist, cart } = useStore();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    
    const mainRef = useRef(null);
    const imageRef = useRef(null);
    
    const currentId = product ? product.id : null;
    const isAlreadyInWishlist = wishlist.some(item => item.id === currentId);
    const isAlreadyInCart = cart.some(item => item.id === currentId);

    // Fetch Product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(data);
                setActiveImage(data.images?.[0] || data.thumbnail);
            } catch (error) {
                console.error('Product not found:', error.message);
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    // Initial Page Load Animation
    useEffect(() => {
        if (!isLoading && product && mainRef.current) {
            gsap.fromTo(
                mainRef.current.querySelectorAll('.reveal-el'),
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power3.out', delay: 0.05 }
            );
        }
    }, [isLoading, product]);

    // Smooth Image Transition
    const handleImageChange = (newImage) => {
        if (newImage === activeImage) return;
        
        gsap.to(imageRef.current, {
            opacity: 0,
            y: 6,
            duration: 0.12,
            onComplete: () => {
                setActiveImage(newImage);
                gsap.to(imageRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
            }
        });
    };

    const images = useMemo(() => {
        if (!product) return [];
        return [...new Set([...(product.images || []), product.thumbnail])].filter(Boolean);
    }, [product]);

    // Next & Previous Arrow Handlers
    const handleNextImage = () => {
        const currentIndex = images.indexOf(activeImage);
        const nextIndex = (currentIndex + 1) % images.length;
        handleImageChange(images[nextIndex]);
    };

    const handlePrevImage = () => {
        const currentIndex = images.indexOf(activeImage);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        handleImageChange(images[prevIndex]);
    };

    const categoryName = product?.category?.replaceAll('-', ' ') || '';
    const originalPrice = product?.discountPercentage
        ? product.price / (1 - product.discountPercentage / 100)
        : product?.price || 0;

    const handleQuantity = (type) => {
        setQuantity((prev) => {
            if (type === 'increase') return Math.min(prev + 1, product.stock);
            return Math.max(prev - 1, 1);
        });
    };

    const getProductData = () => ({
        id: product.id, title: product.title, price: product.price,
        image: product.thumbnail, thumbnail: product.thumbnail,
        quantity, stock: product.stock, category: product.category,
    });

    const handleWishlistToggle = () => {
        if (isAlreadyInWishlist) {
            removeFromWishlist(product.id);
            showToast({
                message: 'Removed from wishlist',
                subMessage: product.title,
                type: 'danger',
            });
        } else {
            addToWishlist(getProductData());
            showToast({
                message: 'Added to wishlist',
                subMessage: product.title,
                type: 'success',
            });
        }
    };

    const handleCartToggle = () => {
        if (isAlreadyInCart) {
            removeFromCart(product.id);
            showToast({
                message: 'Removed from cart',
                subMessage: product.title,
                type: 'danger',
            });
        } else {
            addToCart(getProductData());
            showToast({
                message: 'Added to cart',
                subMessage: product.title,
                type: 'success',
            });
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] font-nuni">
            <h2 className="text-xl font-medium tracking-widest text-[#2C3A29]/50 uppercase text-center px-4">Product Not Found</h2>
        </div>
    );

    const isInStock = product.stock > 0;

    return (
        <main ref={mainRef} className="min-h-screen bg-[#FDFCF8] py-10 lg:py-16 font-nuni text-[#2C3A29] selection:bg-[#80B500] selection:text-white">
            <Container className="max-w-337.5 px-4 sm:px-6 lg:px-8 mx-auto">
                {/* Header / Breadcrumb */}
                <div className="reveal-el opacity-0 mb-8 md:mb-10 flex flex-col md:flex-row justify-between md:items-end border-b border-[#2C3A29]/10 pb-5 md:pb-6 gap-3 md:gap-4">
                    <ol className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[#2C3A29]/40">
                        <li><Link to="/" className="hover:text-[#80B500] transition-colors">Home</Link></li>
                        <li className="w-1 h-1 rounded-full bg-[#2C3A29]/20"></li>
                        <li><Link to="/shop" className="hover:text-[#80B500] transition-colors">Collection</Link></li>
                        <li className="w-1 h-1 rounded-full bg-[#2C3A29]/20"></li>
                        <li className="text-[#2C3A29] line-clamp-1">{categoryName}</li>
                    </ol>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#80B500]">
                        SKU: PRD-{product.id}
                    </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* LEFT GALLERY SECTION */}
                    <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 lg:sticky lg:top-10">
                        {/* Thumbnails Column/Row */}
                        {images.length > 1 && (
                            <div className="reveal-el opacity-0 flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-125 custom-scrollbar shrink-0 pb-2 sm:pb-0">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleImageChange(img)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F4F4F0] p-2 transition-all duration-300 cursor-pointer overflow-hidden shrink-0 flex items-center justify-center border-2 hover:bg-[#EAEAE6] ${
                                            activeImage === img ? 'border-[#80B500] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img} alt={`thumb-${idx}`} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Main Image Box */}
                        <div className="reveal-el opacity-0 flex-1 bg-[#F4F4F0] rounded-4xl min-h-75 sm:min-h-120 flex items-center justify-center relative p-6 sm:p-10 overflow-hidden group">
                            {product.discountPercentage > 0 && (
                                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white text-[#2C3A29] text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold px-3 sm:px-3.5 py-1.5 rounded-full shadow-sm z-10">
                                    -{Math.round(product.discountPercentage)}% OFF
                                </div>
                            )}
                            {/* Left Arrow */}
                            {images.length > 1 && (
                                <button 
                                    onClick={handlePrevImage}
                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#2C3A29] flex items-center justify-center shadow-md md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20"
                                    title="Previous Image"
                                >
                                    <IoChevronBack className="text-sm sm:text-lg" />
                                </button>
                            )}
                            {/* Main Image */}
                            <img 
                                ref={imageRef}
                                src={activeImage} 
                                alt={product.title} 
                                className="max-h-62.5 sm:max-h-100 w-full object-contain mix-blend-multiply" 
                            />
                            
                            {/* Right Arrow */}
                            {images.length > 1 && (
                                <button 
                                    onClick={handleNextImage}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#2C3A29] flex items-center justify-center shadow-md md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20"
                                    title="Next Image"
                                >
                                    <IoChevronForward className="text-sm sm:text-lg" />
                                </button>
                            )}
                        </div>
                    </div>
                    {/* RIGHT PRODUCT INFO SECTION */}
                    <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0">
                        <div className="reveal-el opacity-0 mb-5 md:mb-6">
                            <h3 className="text-[10px] md:text-[11px] font-bold text-[#80B500] uppercase tracking-[0.2em] mb-2 md:mb-3">
                                {product.brand || 'Premium Harvest'}
                            </h3>
                            <h1 className="font-int text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-light text-[#2C3A29] leading-[1.1] tracking-tight mb-3 md:mb-4">
                                {product.title}
                            </h1>
                            <div className="flex items-end gap-3 md:gap-4">
                                <span className="font-int text-2xl md:text-3xl font-medium text-[#2C3A29]">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-base md:text-lg text-[#2C3A29]/30 line-through mb-0.5 md:mb-1">
                                        ${originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="reveal-el opacity-0 flex items-center gap-3 md:gap-4 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-[#2C3A29]/10">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <IoStar key={i} className={`text-sm md:text-base ${i < Math.round(product.rating) ? 'text-[#FFB800]' : 'text-[#2C3A29]/10'}`} />
                                ))}
                            </div>
                            <span className="text-[11px] md:text-xs text-[#2C3A29]/50">({product.reviews?.length || 12} Customer Reviews)</span>
                        </div>
                        <p className="reveal-el opacity-0 text-[13px] md:text-[14px] text-[#2C3A29]/70 leading-relaxed mb-6 md:mb-8">
                            {product.description}
                        </p>
                        {/* Action Buttons */}
                        <div className="reveal-el opacity-0 flex flex-col gap-3 md:gap-4">
                            <div className="flex items-center justify-between text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-[#2C3A29]/50 mb-1">
                                <span>Quantity</span>
                                <span className={isInStock ? 'text-[#80B500]' : 'text-red-500'}>
                                    {isInStock ? `${product.stock} Available` : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Quantity Pill */}
                                <div className="flex items-center justify-between bg-white border border-[#2C3A29]/10 rounded-full px-2 h-12 md:h-14 w-full sm:w-32 shadow-sm shrink-0">
                                    <button onClick={() => handleQuantity('decrease')} disabled={quantity <= 1} className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[#2C3A29]/50 hover:bg-[#F4F4F0] hover:text-[#2C3A29] transition-colors disabled:opacity-30 cursor-pointer">
                                        <IoRemove size={16} />
                                    </button>
                                    <span className="font-medium text-sm md:text-base">{quantity}</span>
                                    <button onClick={() => handleQuantity('increase')} disabled={quantity >= product.stock} className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[#2C3A29]/50 hover:bg-[#F4F4F0] hover:text-[#2C3A29] transition-colors disabled:opacity-30 cursor-pointer">
                                        <IoAdd size={16} />
                                    </button>
                                </div>
                                <div className="flex flex-row gap-3 w-full">
                                    {/* Add to Cart Button */}
                                    <button
                                        type="button"
                                        disabled={!isInStock}
                                        onClick={handleCartToggle}
                                        className={`flex-1 h-12 md:h-14 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-400 cursor-pointer flex items-center justify-center gap-2.5 ${
                                            isAlreadyInCart
                                            ? 'bg-[#2C3A29] text-white hover:bg-[#1e2a1c]'
                                            : 'bg-[#80B500] text-white hover:bg-[#6c9a00] hover:shadow-lg hover:shadow-[#80B500]/20'
                                        } disabled:bg-[#2C3A29]/10 disabled:text-[#2C3A29]/30 disabled:shadow-none`}
                                    >
                                        {isAlreadyInCart ? (
                                            <>Remove from Cart <IoCart className="text-sm md:text-base" /></>
                                        ) : (
                                            <>Add to Cart <BsArrowRight className="text-sm md:text-base" /></>
                                        )}
                                    </button>
                                    {/* Wishlist Button */}
                                    <button
                                        type="button"
                                        onClick={handleWishlistToggle}
                                        className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                                            isAlreadyInWishlist 
                                            ? 'bg-[#80B500]/10 border-[#80B500] text-[#80B500]' 
                                            : 'bg-white border-[#2C3A29]/10 text-[#2C3A29]/40 hover:border-[#2C3A29] hover:text-[#2C3A29] shadow-sm'
                                        }`}
                                    >
                                        {isAlreadyInWishlist ? <FaHeart className="text-sm md:text-lg" /> : <GrFavorite className="text-sm md:text-lg" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; height: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
            `}</style>
        </main>
    );
};

export default ProductDetails;