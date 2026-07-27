import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Images from '../Images';
import Container from '../Container';

// Image
import tc1 from '../../assets/tc1.png';
import tc2 from '../../assets/tc2.png';
import tc3 from '../../assets/tc3.png';
import tc4 from '../../assets/tc4.png';
import tc5 from '../../assets/tc5.png';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const TopCategories = () => {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState('');
    const navigate = useNavigate();
    const categoryImages = [tc1, tc2, tc3, tc4, tc5];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error.message);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (categorySlug) => {
        setSelected(categorySlug);
        navigate(`/category/${categorySlug}`); 
    };

    return (
        <section className="w-full mb-16 md:mb-28"> 
            <div className="bg-linear-to-b from-[#2A2B2D] to-[#424345] pt-20 md:pt-28 pb-[140px] md:pb-[180px] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-white opacity-[0.02] blur-[100px] pointer-events-none"></div>
                <Container className="px-4 lg:px-0 relative z-10">
                    <div className="text-center">
                        <h3 className="text-3xl md:text-5xl font-extrabold text-white font-int mb-5 tracking-tight">
                            Top Categories
                        </h3>
                        <p className="text-[15px] md:text-[17px] text-gray-300 font-nuni max-w-2xl mx-auto leading-relaxed">
                            A highly efficient slip-ring scanner for today's diagnostic requirements, crafted for your needs.
                        </p>
                    </div>
                </Container>
            </div>
            {/* Slider */}
            <Container className="px-4 lg:px-0 relative z-20 -mt-[90px] md:-mt-[110px]">
                <div className='bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-50 p-6 md:p-10 lg:py-12 lg:px-14 w-full mx-auto relative'>
                    {categories.length > 0 ? (
                        <div className="relative">
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                navigation={{
                                    nextEl: '.custom-next',
                                    prevEl: '.custom-prev',
                                }}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                speed={600}
                                spaceBetween={20}
                                slidesPerView={5}
                                breakpoints={{
                                    0: { slidesPerView: 1, spaceBetween: 10 },
                                    480: { slidesPerView: 2, spaceBetween: 20 },
                                    768: { slidesPerView: 3, spaceBetween: 30 },
                                    1024: { slidesPerView: 4, spaceBetween: 30 },
                                    1280: { slidesPerView: 5, spaceBetween: 40 }
                                }}
                                className="w-full px-2"
                            >
                                {categories.map((cat, index) => {
                                    const catSlug = cat.slug || cat;
                                    const catName = cat.name || cat;
                                    const image = categoryImages[index % categoryImages.length];
                                    return (
                                        <SwiperSlide key={index}>
                                            <div 
                                                className="flex flex-col items-center justify-center text-center outline-none cursor-pointer group py-4" 
                                                onClick={() => handleCategoryClick(catSlug)}
                                            >
                                                <div className="w-[100px] h-[100px] rounded-full bg-[#F9FBF5] border border-gray-100 group-hover:bg-[#F4F9EB] group-hover:border-[#80B500]/30 flex justify-center items-center transform group-hover:-translate-y-2 group-hover:shadow-md transition-all duration-400">
                                                    <Images imgSrc={image} className="w-[50px] object-contain group-hover:scale-110 transition-transform duration-300"/>
                                                </div>
                                                <h4 className={`text-[16px] md:text-[18px] capitalize font-bold font-int pt-6 transition-colors duration-300 ${selected === catSlug ? 'text-[#80B500]' : 'text-[#232323] group-hover:text-[#80B500]'}`}>
                                                    {catName.replace('-', ' ')}
                                                </h4>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            {/* Navigation Arrows */}
                            <div className="custom-prev absolute top-[40%] -translate-y-1/2 -left-4 md:-left-8 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex justify-center items-center cursor-pointer z-10 text-gray-400 hover:text-white hover:bg-[#80B500] hover:border-[#80B500] hover:scale-110 transition-all duration-300">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <div className="custom-next absolute top-[40%] -translate-y-1/2 -right-4 md:-right-8 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex justify-center items-center cursor-pointer z-10 text-gray-400 hover:text-white hover:bg-[#80B500] hover:border-[#80B500] hover:scale-110 transition-all duration-300">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center py-20">
                            <div className="w-12 h-12 border-4 border-gray-100 border-t-[#80B500] rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-400 font-nuni text-sm">Loading amazing categories...</p>
                        </div>
                    )}
                    
                </div>
            </Container>
        </section>
    );
};

export default TopCategories;