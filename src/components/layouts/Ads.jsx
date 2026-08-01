import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from '../Container';
import Images from '../Images';

const Ads = () => {
    const [allDeals, setAllDeals] = useState([]); 
    const [displayedDeals, setDisplayedDeals] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [fadeStates, setFadeStates] = useState([false, false, false]); 

    const cardStyles = [
        { bg: 'bg-[#F79300]', label: 'MEGA DEAL' },
        { bg: 'bg-[#183605]', label: 'TOP DISCOUNT' },
        { bg: 'bg-[#81B615]', label: 'HOT OFFER' }
    ];

    useEffect(() => {
        const fetchTopDiscounts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products?limit=50&select=title,category,discountPercentage,thumbnail');
                const sortedProducts = response.data.products.sort((a, b) => b.discountPercentage - a.discountPercentage);
                const topFifteenDeals = sortedProducts.slice(0, 15);
                setAllDeals(topFifteenDeals);
                setDisplayedDeals(topFifteenDeals.slice(0, 3));
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch ad data:", error);
                setLoading(false);
            }
        };
        fetchTopDiscounts();
    }, []);

    useEffect(() => {
        if (allDeals.length === 0) return;
        let isMounted = true; 
        const changeCardsSequentially = async () => {
            const shuffled = [...allDeals].sort(() => 0.5 - Math.random());
            const newDeals = shuffled.slice(0, 3);

            for (let i = 0; i < 3; i++) {
                if (!isMounted) break;
                setFadeStates(prev => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                });
                await new Promise(res => setTimeout(res, 400));
                if (!isMounted) break;
                setDisplayedDeals(prev => {
                    const next = [...prev];
                    next[i] = newDeals[i];
                    return next;
                });
                setFadeStates(prev => {
                    const next = [...prev];
                    next[i] = false;
                    return next;
                });
                await new Promise(res => setTimeout(res, 200)); 
            }
        };
        const interval = setInterval(changeCardsSequentially, 10000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [allDeals]);

    return (
        <div className="relative z-20"> 
            <Container className="lg:relative px-4 lg:px-0">
                <div className="lg:absolute lg:-bottom-30 lg:left-1/2 lg:-translate-x-1/2 w-full">
                    {loading ? (
                        <div className="flex justify-center items-center py-20 bg-white/50 rounded-xl">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#81B615] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                            {displayedDeals.map((ad, index) => {
                                const style = cardStyles[index];
                                const isFading = fadeStates[index]; 
                                return (
                                    <div 
                                        key={index} 
                                        className={`${style.bg} rounded-md overflow-hidden shadow-lg hover:shadow-2xl relative flex items-center p-6 md:p-8 min-h-45 md:min-h-55 transition-transform duration-300 transform`}
                                    >
                                        <div className={`w-[60%] z-10 text-white transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                                            <p className="text-xs font-semibold uppercase mb-2 tracking-wide opacity-90">
                                                {style.label}
                                            </p>
                                            
                                            <h3 className="text-3xl md:text-4xl font-bold mb-1 leading-tight text-white drop-shadow-md">
                                                {Math.round(ad?.discountPercentage || 0)}% OFF
                                            </h3>
                                            <p className="text-sm md:text-base mb-5 capitalize opacity-95 line-clamp-1">
                                                {ad?.title}
                                            </p>
                                            <Link 
                                                to={`/product/${ad?.id}`} 
                                                className="inline-flex items-center text-sm font-bold hover:underline"
                                            >
                                                Shop Now 
                                                <svg className="w-4 h-4 ml-1 bg-white text-black rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </Link>
                                        </div>
                                        <div className={`w-[50%] absolute right-[-5%] top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out transform ${isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
                                            <Images 
                                                imgSrc={ad?.thumbnail} 
                                                alt={ad?.title} 
                                                className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] max-h-40"
                                            />
                                        </div>
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

export default Ads;