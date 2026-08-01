import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    IoAdd,
    IoCartOutline,
    IoCart,
    IoChevronForward,
    IoRemove,
    IoStar,
    IoShieldCheckmarkOutline,
    IoSyncOutline,
    IoCarOutline,
} from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';

import Container from '../Container';
import Images from '../Images';
import { useStore } from '../../store/useStore';

const ProductDetails = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');
    const currentId = product ? product.id : null;
    const isAlreadyInWishlist = wishlist.some(item => item.id === currentId);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(
                    `https://dummyjson.com/products/${id}`
                );
                setProduct(data);
                setSelectedImage(data.images?.[0] || data.thumbnail);
            } catch (error) {
                console.error('product not found:', error.message);
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const images = useMemo(() => {
        if (!product) return [];
        return [
            ...new Set([
                ...(product.images || []),
                product.thumbnail,
            ]),
        ].filter(Boolean);
    }, [product]);

    const categoryName = product?.category?.replaceAll('-', ' ') || '';
    const originalPrice = product?.discountPercentage
        ? product.price / (1 - product.discountPercentage / 100)
        : product?.price || 0;

    const handleQuantity = (type) => {
        setQuantity((previousQuantity) => {
            if (type === 'increase') {
                return Math.min(previousQuantity + 1, product.stock);
            }
            return Math.max(previousQuantity - 1, 1);
        });
    };

    const getProductData = () => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        thumbnail: product.thumbnail,
        quantity,
        stock: product.stock,
        category: product.category,
    });

    const handleWishlistToggle = () => {
        if (isAlreadyInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(getProductData());
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F9F2]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#80B500] border-t-transparent" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[70vh] bg-[#F7F9F2] px-4 py-32 text-center font-nuni">
                <h2 className="mb-4 text-3xl font-bold text-[#232323]">
                    Product not found
                </h2>
                <Link
                    to="/shop"
                    className="inline-block rounded-full bg-[#80B500] px-8 py-3.5 font-bold text-white transition-all hover:bg-[#6F9F00]"
                >
                    Back to shop
                </Link>
            </div>
        );
    }

    const isInStock = product.stock > 0;

    return (
        <main className="min-h-screen bg-[#F7F9F2] py-8 font-nuni lg:py-12">
            <Container className="px-4 lg:px-0">
                {/* breadcrumbs */}
                <nav className="mb-8">
                    <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <BreadcrumbLink to="/" title="Home" />
                        <IoChevronForward className="text-xs" />
                        <BreadcrumbLink to="/shop" title="Shop" />
                        <IoChevronForward className="text-xs" />
                        <BreadcrumbLink
                            to={`/category/${product.category}`}
                            title={categoryName}
                            capitalize
                        />
                        <IoChevronForward className="hidden text-xs sm:block" />
                        <li className="hidden max-w-62.5 truncate font-bold text-[#232323] sm:block">
                            {product.title}
                        </li>
                    </ol>
                </nav>
                <section className="grid overflow-hidden rounded-4xl border border-[#E4E8DF] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] lg:grid-cols-2">
                    {/* left */}
                    <div className="border-b border-[#E4E8DF] p-6 lg:border-b-0 lg:border-r lg:p-10">
                        <div className="flex flex-col-reverse gap-4 sm:flex-row">
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto sm:w-24 sm:flex-col sm:overflow-y-auto">
                                    {images.map((image) => (
                                        <button
                                            key={image}
                                            type="button"
                                            onClick={() => setSelectedImage(image)}
                                            className={`h-20 min-w-20 cursor-pointer overflow-hidden rounded-2xl border bg-[#F7F9F5] p-2 transition-all duration-300 ${
                                                selectedImage === image
                                                    ? 'border-[#80B500] ring-2 ring-[#80B500]/20'
                                                    : 'border-[#E4E8DF] hover:border-[#80B500]'
                                            }`}
                                        >
                                            <Images
                                                imgSrc={image}
                                                className="h-full w-full object-contain mix-blend-multiply"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className="relative flex min-h-95 flex-1 items-center justify-center rounded-3xl bg-[#F4F7F0] p-8 sm:min-h-125">
                                {product.discountPercentage > 0 && (
                                    <span className="absolute left-6 top-6 rounded-full bg-[#80B500] px-4 py-1.5 text-xs font-bold text-white shadow-md">
                                        -{Math.round(product.discountPercentage)}% OFF
                                    </span>
                                )}
                                <Images
                                    imgSrc={selectedImage || product.thumbnail}
                                    className="max-h-105 w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                        <Link
                            to={`/category/${product.category}`}
                            className="mb-4 w-max rounded-full bg-[#F0F8E7] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#80B500] transition-colors hover:bg-[#80B500] hover:text-white"
                        >
                            {categoryName}
                        </Link>
                        <h1 className="mb-4 font-int text-3xl font-black text-[#232323] sm:text-4xl leading-tight">
                            {product.title}
                        </h1>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-[#FFF9E6] px-2.5 py-1 rounded-lg">
                                <IoStar className="text-[#FFB800]" />
                                <span className="font-bold text-[#232323]">
                                    {product.rating?.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-sm text-gray-400">
                                ({product.reviews?.length || 12} verified reviews)
                            </span>
                        </div>
                        <p className="mb-6 leading-relaxed text-[#70766B]">
                            {product.description}
                        </p>
                        <div className="mb-8 flex flex-wrap items-baseline gap-4 border-y border-[#E4E8DF] py-5">
                            <span className="text-4xl font-black text-[#80B500]">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.discountPercentage > 0 && (
                                <span className="text-lg text-gray-400 line-through">
                                    ${originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                        {/* stock & quantity Box */}
                        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#E4E8DF] bg-[#FAFBF9] p-5">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                                    Availability
                                </p>
                                <p className={`font-bold ${isInStock ? 'text-[#80B500]' : 'text-red-500'}`}>
                                    {isInStock ? `In Stock (${product.stock} items available)` : 'Out of stock'}
                                </p>
                            </div>
                            <div className="flex h-12 items-center rounded-xl border border-[#E4E8DF] bg-white px-2 shadow-sm">
                                <QuantityButton
                                    icon={<IoRemove />}
                                    onClick={() => handleQuantity('decrease')}
                                    disabled={quantity <= 1}
                                />
                                <span className="w-12 text-center font-bold text-lg text-[#232323]">
                                    {quantity}
                                </span>
                                <QuantityButton
                                    icon={<IoAdd />}
                                    onClick={() => handleQuantity('increase')}
                                    disabled={quantity >= product.stock}
                                />
                            </div>
                        </div>
                        {/* action buttons */}
                        <div className="flex flex-col gap-3.5 sm:flex-row">
                            <button
                                type="button"
                                disabled={!isInStock}
                                onClick={() => addToCart(getProductData())}
                                className="flex min-h-14 flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#80B500] px-6 font-bold text-white shadow-lg shadow-[#80B500]/20 transition-all hover:bg-[#6F9F00] hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                <IoCartOutline className="text-2xl" />
                                Add to Cart · ${(product.price * quantity).toFixed(2)}
                            </button>
                            <button
                                type="button"
                                onClick={handleWishlistToggle}
                                className={`flex min-h-14 min-w-14 cursor-pointer items-center justify-center rounded-2xl border transition-all ${
                                    isAlreadyInWishlist
                                        ? 'border-[#80B500] bg-[#80B500]/10 text-[#80B500]'
                                        : 'border-[#E4E8DF] bg-white text-[#232323] hover:border-[#80B500] hover:text-[#80B500]'
                                }`}
                                title={isAlreadyInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                {isAlreadyInWishlist ? (
                                    <FaHeart className="text-xl text-[#80B500]" />
                                ) : (
                                    <GrFavorite className="text-xl" />
                                )}
                            </button>
                        </div>
                        {/* badges */}
                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#E4E8DF] pt-6">
                            <div className="flex items-center gap-3">
                                <IoCarOutline className="text-2xl text-[#80B500]" />
                                <span className="text-xs font-bold text-[#546375]">Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoSyncOutline className="text-2xl text-[#80B500]" />
                                <span className="text-xs font-bold text-[#546375]">30-Day Return</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoShieldCheckmarkOutline className="text-2xl text-[#80B500]" />
                                <span className="text-xs font-bold text-[#546375]">Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* additional details */}
                <section className="mt-12 rounded-[28px] border border-[#E4E8DF] bg-white p-6 sm:p-10 shadow-sm">
                    <div className="flex border-b border-[#E4E8DF] gap-8">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`pb-4 font-bold text-lg cursor-pointer transition-colors relative ${
                                activeTab === 'description' ? 'text-[#80B500]' : 'text-gray-400 hover:text-[#232323]'
                            }`}
                        >
                            Description
                            {activeTab === 'description' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#80B500]" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`pb-4 font-bold text-lg cursor-pointer transition-colors relative ${
                                activeTab === 'info' ? 'text-[#80B500]' : 'text-gray-400 hover:text-[#232323]'
                            }`}
                        >
                            Additional Information
                            {activeTab === 'info' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#80B500]" />
                            )}
                        </button>
                    </div>
                    <div className="py-6 text-[#70766B] leading-relaxed">
                        {activeTab === 'description' ? (
                            <div>
                                <p className="mb-4">
                                    Experience absolute top-tier quality with {product.title}. Designed carefully to meet your everyday needs while ensuring premium durability and performance.
                                </p>
                                <p>
                                    Part of our exclusive <span className="font-bold text-[#232323] capitalize">{categoryName}</span> collection, this item guarantees maximum satisfaction with rigorous quality standards.
                                </p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-bold text-[#232323]">Brand:</span>
                                    <span>{product.brand || 'Generic'}</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-bold text-[#232323]">Category:</span>
                                    <span className="capitalize">{categoryName}</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-bold text-[#232323]">Stock:</span>
                                    <span>{product.stock} Units Available</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-bold text-[#232323]">Rating:</span>
                                    <span>{product.rating} / 5.0</span>
                                </li>
                            </ul>
                        )}
                    </div>
                </section>
            </Container>
        </main>
    );
};
const BreadcrumbLink = ({ to, title, capitalize = false }) => (
    <li>
        <Link
            to={to}
            className={`cursor-pointer transition-colors hover:text-[#80B500] ${
                capitalize ? 'capitalize' : ''
            }`}
        >
            {title}
        </Link>
    </li>
);
const QuantityButton = ({ icon, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-[#F0F8E7] hover:text-[#80B500] disabled:cursor-not-allowed disabled:opacity-30"
    >
        {icon}
    </button>
);

export default ProductDetails;