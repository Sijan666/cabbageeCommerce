import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Container from '../Container';
import Flex from '../Flex';
import ProductforOurProducts from '../ProductsforOurProducts';
import mixitup from 'mixitup';

const Ourproducts = () => {
    const containerRef = useRef(null);
    const mixerRef = useRef(null);
    
    // API States
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Products
    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=12");
                setProducts(response.data.products);
            } catch (error) {
                console.error("data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Initialize Mixitup AFTER data is loaded
    useEffect(() => {
        if (!isLoading && products.length > 0 && containerRef.current) {
            if (mixerRef.current) {
                mixerRef.current.destroy();
            }
            mixerRef.current = mixitup(containerRef.current, {
                animation: {
                    duration: 400,
                },
                selectors: {
                    target: '.mix'
                }
            });
        }

        // Cleanup function
        return () => {
            if (mixerRef.current) {
                mixerRef.current.destroy();
            }
        };
    }, [products, isLoading]);

    const mixCategories = ['food', 'veg', 'dried', 'bread', 'fish'];

    return (
        <div className="pb-10 md:pb-15">
            <Container className="px-4 lg:px-0">
                <h3 className='text-[32px] md:text-[48px] font-int text-[#232323] font-bold text-center leading-tight'>
                    Our Products
                </h3>
                <p className='text-sm md:text-base font-nuni text-[#546375] pt-3 md:pt-5 text-center'>
                    A highly efficient slip-ring scanner for today's diagnostic requirements.
                </p>
                {/* Filter Buttons */}
                <div className="pt-6 md:pt-9">
                    <Flex className={'justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-3 flex-wrap'}>
                        <p data-filter="all" className='font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>All</p>
                        <p data-filter=".food" className='font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Food & Drinks</p>
                        <p data-filter=".veg" className='font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Vegetables</p>
                        <p data-filter=".dried" className='font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Dried Foods</p>
                        <p data-filter=".bread" className='font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Bread & Cake</p>
                        <p data-filter=".fish" className='font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Fish & Meat</p>
                    </Flex>
                </div>
                {/* Products Grid */}
                <div className="product pt-10 md:pt-13" ref={containerRef}>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <div className="w-12 h-12 border-4 border-[#80B500] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {products.map((product, index) => {
                                const randomCategory = mixCategories[index % mixCategories.length];
                                return (
                                    <div key={product.id} className={`mix ${randomCategory}`}>
                                        <ProductforOurProducts 
                                            productsImg={
                                                <img 
                                                    src={product.thumbnail} 
                                                    alt={product.title} 
                                                    className="w-full h-[150px] md:h-[200px] object-contain mix-blend-multiply drop-shadow-sm p-4" 
                                                />
                                            }
                                            productsTitle={product.title}
                                            productsBrand={product.brand || 'GARDEN SAFE,SEED'}
                                            productsPrice={`$${product.price.toFixed(2)}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Ourproducts;