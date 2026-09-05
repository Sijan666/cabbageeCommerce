import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '../Container';
import Flex from '../Flex';
import Product from '../Product';
import Images from '../Images';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Featuredproduct = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=8");
                setFeaturedProducts(response.data.products);
            } catch (error) {
                console.error("data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFeatured();
    }, []);

    const getOriginalPrice = (price, discount) => { 
        return `$${(price / (1 - discount / 100)).toFixed(2)}`; 
    };

    const renderStars = (rating, reviewCount) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-[#FFB800] text-[11px] sm:text-[13px]" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-[#FFB800] text-[11px] sm:text-[13px]" />);
            } else {
                stars.push(<FaStar key={i} className="text-[#e5e7eb] text-[11px] sm:text-[13px]" />);
            }
        }
        return (
            <Flex className="items-center gap-x-2">
                <Flex className="items-center gap-x-0.5">{stars}</Flex>
                <span className="text-[#80B500] bg-[#f0f8eb] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">({reviewCount})</span>
            </Flex>
        );
    };

    return (
        <section className="pb-15 pt-60 overflow-hidden">
            <Container className="px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-[36px] md:text-[48px] font-int text-[#232323] font-bold leading-tight">
                        Featured Products
                    </h3>
                    <p className="text-[15px] md:text-base font-nuni text-[#546375] pt-4 md:pt-5">
                        A highly efficient slip-ring scanner for today's diagnostic requirements.
                    </p>
                </div>
                
                <div className="pt-10 md:pt-13">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-75">
                            <div className="w-12 h-12 border-4 border-[#80B500] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <div key={product.id}> 
                                    <Product 
                                        productId={product.id}
                                        imgString={product.thumbnail}
                                        productImg={<Images imgSrc={product.thumbnail} alt={product.title} className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300" />}
                                        productTitle={product.title}
                                        productPrice={`$${product.price.toFixed(2)}`}
                                        productOffer={product.discountPercentage ? getOriginalPrice(product.price, product.discountPercentage) : null}
                                        badge={product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null}
                                        // eslint-disable-next-line react-hooks/purity
                                        productRatings={renderStars(product.rating, product.reviews?.length || Math.floor(Math.random() * 20) + 10)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export default Featuredproduct;