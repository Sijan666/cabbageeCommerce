import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Container from '../Container';
import Flex from '../Flex';
import Images from '../Images';
import Wood from '/src/assets/wood.png';
import { Link } from 'react-router-dom';
import { BsGrid, BsListUl } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Product from '../Product';

const Shop = () => {
    // ui states with localStorage
    const [viewType, setViewType] = useState(() => {
        const savedView = localStorage.getItem('shopViewType');
        return savedView ? savedView : 'grid'; 
    });

    const handleViewChange = (type) => {
        setViewType(type);
        localStorage.setItem('shopViewType', type);
    };
    
    // API states
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // filter & pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [sortBy, setSortBy] = useState('best-match');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // fetch products
    useEffect(() => {
        async function fetchAllDatas() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=200");
                setAllData(response.data.products);
            } catch (error) {
                console.error("data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAllDatas();
    }, []);

    // filter and sort
    const processedData = useMemo(() => {
        let data = [...allData];

        if (searchQuery) {
            data = data.filter(product => 
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortBy === 'price-low') {
            data.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            data.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            data.sort((a, b) => b.id - a.id);
        } else if (sortBy === 'best-match') {
            data.sort((a, b) => b.rating - a.rating);
        }

        return data;
    }, [allData, searchQuery, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortBy, perPage]);

    // pagination
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const currentProducts = processedData.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(processedData.length / perPage);

    // handlers
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

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
                <Flex className="items-center gap-x-0.5">
                    {stars}
                </Flex>
                <span className="text-[#80B500] bg-[#f0f8eb] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                    ({reviewCount})
                </span>
            </Flex>
        );
    };

    return (
        <main className="w-full font-sans" role="main">
            {/* banner */}
            <section className="relative bg-[#f4f6f8] py-16 md:py-24 overflow-hidden" aria-label="About Us Banner">
                <Container className="px-4 sm:px-8 lg:px-20">
                    <Flex className="flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-int">
                            Shop
                        </h1>
                        <Flex className="items-center text-sm text-gray-500 space-x-2 font-nuni" aria-label="Breadcrumb">
                            <Link to={'/'} aria-label="Go to homepage">
                                <span className="hover:text-[#80B500] cursor-pointer transition-colors">Home</span>
                            </Link>
                            <span aria-hidden="true">›</span>
                            <span className="text-gray-800" aria-current="page">Shop</span>
                        </Flex>
                    </Flex>
                    <div className="absolute left-0 bottom-4 w-16 md:w-20 lg:w-28 ml-4 lg:ml-12" aria-hidden="true">
                        <Images 
                            imgSrc={Wood} 
                            alt="Decorative wood element"
                            loading="lazy"
                            className="w-full h-auto object-contain drop-shadow-md"
                        />
                    </div>
                </Container>
            </section>
            {/* filter */}
            <section className="py-8 mb-4" aria-label="Shop Filters and Toolbar">
                <Container className="px-4 sm:px-8 lg:px-0">
                    <Flex className="flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="text-center lg:text-left">
                            <h2 className="text-[22px] font-bold text-[#232323] font-int mb-1">
                                Organic Fresh Food Fresh Juices
                            </h2>
                            <p className="text-[#888888] text-[13px] font-nuni">
                                Showing {processedData.length > 0 ? indexOfFirstProduct + 1 : 0}-
                                {Math.min(indexOfLastProduct, processedData.length)} of {processedData.length} results
                            </p>
                        </div>
                        <Flex className="items-center justify-center lg:justify-end flex-wrap gap-4 md:gap-5 w-full lg:w-auto">
                            <Flex className="items-center gap-2">
                                <label htmlFor="perPage" className="text-[13px] text-[#444444] font-nuni">
                                    Per Page:
                                </label>
                                <select 
                                    id="perPage"
                                    value={perPage}
                                    onChange={(e) => setPerPage(Number(e.target.value))}
                                    className="h-[34px] border border-[#e5e5e5] text-[#888888] text-[13px] rounded-[3px] px-2 focus:outline-none font-nuni cursor-pointer bg-white"
                                >
                                    <option value="12">12</option>
                                    <option value="24">24</option>
                                    <option value="36">36</option>
                                </select>
                            </Flex>
                            <Flex className="items-center gap-2">
                                <label htmlFor="sortBy" className="text-[13px] text-[#444444] font-nuni">
                                    Sort By:
                                </label>
                                <select 
                                    id="sortBy"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-[34px] border border-[#e5e5e5] text-[#888888] text-[13px] rounded-[3px] px-2 pr-4 focus:outline-none font-nuni cursor-pointer bg-white"
                                >
                                    <option value="best-match">Best Match</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest Arrivals</option>
                                </select>
                            </Flex>
                            <Flex className="items-center gap-2">
                                <button
                                    onClick={() => handleViewChange('grid')}
                                    className={`h-[34px] w-[34px] flex items-center justify-center rounded-[3px] transition-all duration-200 border cursor-pointer ${
                                        viewType === 'grid' 
                                            ? 'border-transparent shadow-[0_3px_10px_rgba(0,0,0,0.06)] bg-white text-[#232323]' 
                                            : 'border-[#e5e5e5] bg-white text-[#888888] hover:text-[#232323]'
                                    }`}
                                >
                                    <BsGrid className="text-sm" />
                                </button>
                                <button
                                    onClick={() => handleViewChange('list')}
                                    className={`h-[34px] w-[34px] flex items-center justify-center rounded-[3px] transition-all duration-200 border cursor-pointer ${
                                        viewType === 'list' 
                                            ? 'border-transparent shadow-[0_3px_10px_rgba(0,0,0,0.06)] bg-white text-[#232323]' 
                                            : 'border-[#e5e5e5] bg-white text-[#888888] hover:text-[#232323]'
                                    }`}
                                >
                                    <BsListUl className="text-[15px]" />
                                </button>
                            </Flex>
                            <form 
                                className="flex items-center h-[34px]"
                                onSubmit={handleSearchSubmit}
                            >
                                <input 
                                    type="text" 
                                    placeholder="Search" 
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="h-full bg-[#f4f6f8] text-[13px] text-[#666666] px-3 w-[120px] sm:w-[130px] outline-none rounded-l-[3px] font-nuni placeholder:text-[#a0a0a0]"
                                />
                                <button 
                                    type="submit"
                                    className="h-full px-3.5 bg-[#80B500] text-white rounded-r-[3px] hover:bg-[#6a9600] transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
                                >
                                    <FiSearch className="text-sm" />
                                </button>
                            </form>
                        </Flex>
                    </Flex>
                </Container>
            </section>
            {/* products & pagination section */}
            <section className="py-10 mb-20 bg-white">
                <Container className="px-4 sm:px-8 lg:px-0">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[400px]">
                            <div className="w-12 h-12 border-4 border-[#80B500] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : processedData.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 font-nuni">
                            <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <>
                            {/* product grid and list */}
                            <div className={`grid gap-6 ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
                                {currentProducts.map((product) => {
                                    const dynamicReviewCount = (product.id * 17) % 150 + 15;
                                    return (
                                        <Product 
                                            key={product.id}
                                            isList={viewType === 'list'}
                                            productDesc={product.description}
                                            productImg={<img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm" />}
                                            productTitle={product.title}
                                            productPrice={`$${product.price.toFixed(2)}`}
                                            productOffer={product.discountPercentage ? getOriginalPrice(product.price, product.discountPercentage) : null}
                                            badge={product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null}
                                            productRatings={renderStars(product.rating, dynamicReviewCount)}
                                        />
                                    );
                                })}
                            </div>
                            {/* pagination */}
                            {processedData.length > perPage && (
                                <Flex className="justify-center items-center gap-3 mt-16 font-nuni font-bold">
                                    <button 
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className={`w-8 h-8 flex items-center justify-center transition-all text-xl ${
                                            currentPage === 1 
                                            ? 'text-[#cccccc] cursor-not-allowed' 
                                            : 'text-[#a0a0a0] hover:text-[#80B500] cursor-pointer'
                                        }`}
                                    >
                                        &larr;
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => {
                                        if (index + 1 === 1 || index + 1 === totalPages || (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1)) {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => paginate(index + 1)}
                                                    className={`w-[42px] h-[42px] flex items-center justify-center rounded-full transition-all cursor-pointer text-[15px] ${
                                                        currentPage === index + 1
                                                        ? 'bg-[#80B500] text-white shadow-[0_4px_10px_rgba(128,181,0,0.3)]'
                                                        : 'bg-white text-[#666666] shadow-[0_0_15px_rgba(0,0,0,0.04)] hover:text-[#80B500]'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            );
                                        }
                                        if (index + 1 === currentPage - 2 || index + 1 === currentPage + 2) {
                                            return <span key={index} className="text-[#888888] mx-1">...</span>;
                                        }
                                        return null;
                                    })}
                                    <button 
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                        className={`w-8 h-8 flex items-center justify-center transition-all text-xl ${
                                            currentPage === totalPages 
                                            ? 'text-[#cccccc] cursor-not-allowed' 
                                            : 'text-[#80B500] hover:scale-110 cursor-pointer'
                                        }`}
                                    >
                                        &rarr;
                                    </button>
                                </Flex>
                            )}
                        </>
                    )}
                </Container>
            </section>
        </main>
    );
};

export default Shop;