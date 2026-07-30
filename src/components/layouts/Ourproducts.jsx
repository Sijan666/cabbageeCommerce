import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Container from '../Container';
import Flex from '../Flex';
import ProductforOurProducts from '../ProductsforOurProducts';
import Images from '../Images';
import mixitup from 'mixitup';

const Ourproducts = () => {
    const containerRef = useRef(null);
    const mixerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    // fetch products
    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=12");
                const fetchedProducts = response.data.products;
                
                setProducts(fetchedProducts);
                const uniqueCategories = [...new Set(fetchedProducts.map(item => item.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // mixitup
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
        // cleanup function
        return () => {
            if (mixerRef.current) {
                mixerRef.current.destroy();
            }
        };
    }, [products, isLoading]);

    return (
        <div className="pb-10 md:pb-15">
            <Container className="px-4 lg:px-0">
                <h3 className='text-[32px] md:text-[48px] font-int text-[#232323] font-bold text-center leading-tight'>
                    Our Products
                </h3>
                <p className='text-sm md:text-base font-nuni text-[#546375] pt-3 md:pt-5 text-center'>
                    A highly efficient slip-ring scanner for today's diagnostic requirements.
                </p>
                {/* filter */}
                <div className="pt-6 md:pt-9">
                    <Flex className={'justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-3 flex-wrap'}>
                        <p data-filter="all" className='font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>
                            All
                        </p>
                        {categories.map((category, index) => (
                            <p 
                                key={index} 
                                data-filter={`.${category}`} 
                                className='capitalize font-bold font-nuni text-[16px] md:text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'
                            >
                                {category.replace("-", " ")}
                            </p>
                        ))}
                    </Flex>
                </div>
                {/* Products */}
                <div className="product pt-10 md:pt-13" ref={containerRef}>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-75">
                            <div className="w-12 h-12 border-4 border-[#80B500] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {products.map((product) => {
                                return (
                                    <div key={product.id} className={`mix ${product.category}`}>
                                        <ProductforOurProducts 
                                            productId={product.id}
                                            imgString={product.thumbnail}
                                            productsImg={
                                                <Images
                                                    imgSrc={product.thumbnail} 
                                                    alt={product.title} 
                                                    className="w-full h-37.5 md:h-50 object-contain mix-blend-multiply drop-shadow-sm p-4" 
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