import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Container from '../Container';
import ProductforOurProducts from '../ProductsforOurProducts';
import Images from '../Images';

const CategoryProducts = () => {
    const { categoryName } = useParams(); 
    
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://dummyjson.com/products/category/${categoryName}?limit=100`);
                setProducts(response.data.products);
            } catch (error) {
                console.error("Data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (categoryName) {
            fetchCategoryProducts();
        }
    }, [categoryName]);

    return (
        <div className="py-10 md:py-15 bg-[#F5F5F5] min-h-screen">
            <Container className="px-4 lg:px-0">
                <div className="mb-10">
                    {/* breadcrumbs */}
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link to="/" className="inline-flex items-center text-sm font-nuni font-medium text-[#546375] hover:text-[#80B500] transition-colors duration-300">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-1 text-sm font-nuni font-bold text-[#80B500] md:ml-2 capitalize">
                                        {categoryName.replace('-', ' ')}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    {/* Title */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4">
                        <h2 className="text-[32px] md:text-[42px] font-int text-[#232323] font-bold capitalize leading-tight">
                            {categoryName.replace('-', ' ')} Products
                        </h2>
                        {/* product count */}
                        {!isLoading && products.length > 0 && (
                            <p className="text-[#546375] font-nuni mt-2 md:mt-0 pb-2 text-[15px]">
                                Showing <span className="font-bold text-[#232323]">{products.length}</span> items
                            </p>
                        )}
                    </div>
                </div>
                {/* products */}
                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-75">
                            <div className="w-12 h-12 border-4 border-[#80B500] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : products.length > 0 ? (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
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
                                        productsBrand={product.brand || 'No Brand'}
                                        productsPrice={`$${product.price.toFixed(2)}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-[#546375] font-nuni text-[18px]">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default CategoryProducts;