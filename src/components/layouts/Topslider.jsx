import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Images from '../Images';
import Container from '../Container';
import tc1 from '../../assets/tc1.png';
import tc2 from '../../assets/tc2.png';
import tc3 from '../../assets/tc3.png';
import tc4 from '../../assets/tc4.png';
import tc5 from '../../assets/tc5.png';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Topslider = () => {
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
        <div className="relative">
            <div className="">
                <Container className={'p-4 sm:p-6 lg:p-10 absolute left-1/2 -translate-x-1/2 -top-[120px] md:-top-[180px] lg:-top-90 bg-white w-[95%] md:w-[90%] lg:w-full rounded-lg shadow-lg '}>
                    <div className='mx-2 md:mx-10 lg:mx-25 my-10 lg:my-20 relative'>
                        
                        {categories.length > 0 ? (
                            <Swiper
                                modules={[Navigation]}
                                loop={true}
                                speed={500}
                                slidesPerView={5}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                    1280: { slidesPerView: 5 }
                                }}
                                className="w-full"
                            >
                                {categories.map((cat, index) => {
                                    const catSlug = cat.slug || cat;
                                    const catName = cat.name || cat;
                                    const image = categoryImages[index % categoryImages.length];
                                    return (
                                        <SwiperSlide key={index}>
                                            <div 
                                                className="text-center outline-none cursor-pointer group" 
                                                onClick={() => handleCategoryClick(catSlug)}
                                            >
                                                <Images imgSrc={image} className={'mx-auto w-[60px] md:w-auto'}/>
                                                <h4 className={`text-[16px] md:text-[20px] capitalize font-bold font-int pb-4 md:pb-8 pt-4 md:pt-5 transition-colors duration-300 ${selected === catSlug ? 'text-[#7bb343]' : 'text-[#232323] group-hover:text-[#7bb343]'}`}>
                                                    {catName}
                                                </h4>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        ) : (
                            <div className="text-center py-10 font-bold text-gray-500">Loading Categories...</div>
                        )}
                        
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Topslider;