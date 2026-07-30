import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    IoAdd,
    IoCartOutline,
    IoChevronForward,
    IoRemove,
    IoStar,
} from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';

import Container from '../Container';
import Images from '../Images';
import { useStore } from '../../store/useStore';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, addToWishlist } = useStore();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

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
                return Math.min(
                    previousQuantity + 1,
                    product.stock
                );
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

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
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
                    className="cursor-pointer font-bold text-[#80B500]"
                >
                    Back to shop
                </Link>
            </div>
        );
    }

    const isInStock = product.stock > 0;

    return (
        <main className="min-h-screen bg-[#F7F9F2] py-10 font-nuni lg:py-16">
            <Container className="px-4 lg:px-0">
                <nav className="mb-8">
                    <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <BreadcrumbLink to="/" title="Home" />
                        <IoChevronForward />

                        <BreadcrumbLink to="/shop" title="Shop" />
                        <IoChevronForward />

                        <BreadcrumbLink
                            to={`/category/${product.category}`}
                            title={categoryName}
                            capitalize
                        />

                        <IoChevronForward className="hidden sm:block" />

                        <li className="hidden max-w-[220px] truncate font-bold text-[#232323] sm:block">
                            {product.title}
                        </li>
                    </ol>
                </nav>

                <section className="grid overflow-hidden rounded-[28px] border border-[#E4E8DF] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.06)] lg:grid-cols-2">
                    <div className="border-b border-[#E4E8DF] p-5 lg:border-b-0 lg:border-r lg:p-10">
                        <div className="flex flex-col-reverse gap-4 sm:flex-row">
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto sm:w-20 sm:flex-col">
                                    {images.map((image) => (
                                        <button
                                            key={image}
                                            type="button"
                                            onClick={() =>
                                                setSelectedImage(image)
                                            }
                                            className={`h-20 min-w-20 cursor-pointer overflow-hidden rounded-xl border bg-[#F7F9F5] p-2 transition-colors ${
                                                selectedImage === image
                                                    ? 'border-[#80B500]'
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

                            <div className="relative flex min-h-[380px] flex-1 items-center justify-center rounded-[22px] bg-[#F4F7F0] p-8 sm:min-h-[520px]">
                                {product.discountPercentage > 0 && (
                                    <span className="absolute left-5 top-5 rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white">
                                        -
                                        {Math.round(
                                            product.discountPercentage
                                        )}
                                        %
                                    </span>
                                )}

                                <Images
                                    imgSrc={
                                        selectedImage ||
                                        product.thumbnail
                                    }
                                    className="max-h-[430px] w-full object-contain mix-blend-multiply"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                        <Link
                            to={`/category/${product.category}`}
                            className="mb-4 w-max cursor-pointer rounded-full bg-[#F0F8E7] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#699900]"
                        >
                            {categoryName}
                        </Link>

                        <h1 className="mb-4 font-int text-3xl font-black text-[#232323] sm:text-4xl">
                            {product.title}
                        </h1>

                        <div className="mb-5 flex items-center gap-2">
                            <IoStar className="text-[#FFB800]" />

                            <span className="font-bold text-[#232323]">
                                {product.rating?.toFixed(1)}
                            </span>

                            <span className="text-sm text-gray-500">
                                ({product.reviews?.length || 0} reviews)
                            </span>
                        </div>

                        <p className="mb-7 leading-7 text-[#70766B]">
                            {product.description}
                        </p>

                        <div className="mb-8 flex flex-wrap items-end gap-3">
                            <span className="text-4xl font-black text-[#80B500]">
                                ${product.price.toFixed(2)}
                            </span>

                            {product.discountPercentage > 0 && (
                                <span className="text-lg text-gray-400 line-through">
                                    ${originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="mb-7 flex items-center justify-between rounded-xl border border-[#E4E8DF] bg-[#FAFBF9] p-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Availability
                                </p>

                                <p
                                    className={`font-bold ${
                                        isInStock
                                            ? 'text-[#80B500]'
                                            : 'text-red-500'
                                    }`}
                                >
                                    {isInStock
                                        ? `${product.stock} products in stock`
                                        : 'Out of stock'}
                                </p>
                            </div>

                            <div className="flex h-12 items-center rounded-xl border border-[#E4E8DF] bg-white px-2">
                                <QuantityButton
                                    icon={<IoRemove />}
                                    onClick={() =>
                                        handleQuantity('decrease')
                                    }
                                    disabled={quantity <= 1}
                                />

                                <span className="w-10 text-center font-bold">
                                    {quantity}
                                </span>

                                <QuantityButton
                                    icon={<IoAdd />}
                                    onClick={() =>
                                        handleQuantity('increase')
                                    }
                                    disabled={
                                        quantity >= product.stock
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                disabled={!isInStock}
                                onClick={() =>
                                    addToCart(getProductData())
                                }
                                className="flex min-h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#80B500] px-6 font-bold text-white transition-colors hover:bg-[#6F9F00] disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                <IoCartOutline className="text-2xl" />

                                Add to cart · $
                                {(product.price * quantity).toFixed(2)}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    addToWishlist(getProductData())
                                }
                                className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E4E8DF] px-6 font-bold transition-colors hover:border-[#80B500] hover:text-[#80B500]"
                            >
                                <GrFavorite />

                                <span className="sm:hidden">
                                    Add to wishlist
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
};

const BreadcrumbLink = ({
    to,
    title,
    capitalize = false,
}) => (
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

const QuantityButton = ({
    icon,
    onClick,
    disabled,
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-[#F0F8E7] hover:text-[#80B500] disabled:cursor-not-allowed disabled:opacity-30"
    >
        {icon}
    </button>
);

export default ProductDetails;