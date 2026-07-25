import React from 'react';
import Container from '../Container';
import Flex from '../Flex';
import Images from '../Images';
import Wood from '/src/assets/wood.png';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Member from '../layouts/Member';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Blog from '../layouts/Blog';

const About = () => {

    // Testimonial Data
    const testimonials = [
        {
            id: 1,
            name: "Lurch Schpellchek",
            designation: "UI/UX designer",
            text: "What a load of rubbish bits and bobs pear shaped owt to do with me bubble and squeak jolly good morish tinkety tonk old fruit, car boot my good sir buggered plastered cheeky David, haggle young delinquent say so I said bite your arm off easy peasy. Skive off it's all gone to pot buggered."
        },
        {
            id: 2,
            name: "Jane Doe",
            designation: "Frontend Developer",
            text: "The component-based architecture combined with utility classes is a game changer for modern web development. Skive off it's all gone to pot buggered plastered cheeky David."
        },
        {
            id: 3,
            name: "John Smith",
            designation: "Project Manager",
            text: "Outstanding delivery and pixel-perfect design. The application runs smoothly and the UI looks incredibly premium and modern. Jolly good morish tinkety tonk old fruit."
        }
    ];

    return (
        <main className="w-full font-sans">
            {/* Banner */}
            <div className="relative bg-[#f4f6f8] py-24 overflow-hidden">
                <Container className="px-4 sm:px-8 lg:px-20">
                    <Flex className="flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-int">
                            About us
                        </h1>
                        <Flex className="items-center text-sm text-gray-500 space-x-2 font-nuni">
                            <Link to={'/'}>
                                <span className="hover:text-[#80B500] cursor-pointer transition-colors">Home</span>
                            </Link>
                            <span>›</span>
                            <span className="text-gray-800">About us</span>
                        </Flex>
                    </Flex>
                    {/* Image */}
                    <div className="absolute left-0 bottom-4 w-16 md:w-20 lg:w-28 ml-4 lg:ml-12">
                        <Images 
                            imgSrc={Wood} 
                            className="w-full h-auto object-contain drop-shadow-md"
                        />
                    </div>
                </Container>
            </div>
            {/* main content */}
            <div className="py-20">
                <Container className="px-4 sm:px-8 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Side: Text Content */}
                        <div>
                            <span className="text-[#84b544] font-medium text-sm md:text-base mb-4 block font-nuni">
                                Know More About Shop
                            </span>
                            <h2 className="text-3xl md:text-[2.75rem] font-bold text-[#232323] leading-[1.2] mb-6 font-int">
                                Trusted Organic Food <br className="hidden lg:block" /> Store For People
                            </h2>
                            <div className="text-gray-500 space-y-6 text-base leading-relaxed mb-10 pr-0 md:pr-10 font-nuni">
                                <p>
                                    Buy natural, sustainable and chemicalfree products from local the country. We are a strong community of 100,000+
                                </p>
                                <p>
                                    sellers who aspire to be good, do good, and spread goodness. We democratic, self-sustaining, two-sided marketplace which thrives on trust and is built on community and quality content.
                                </p>
                            </div>
                            {/* Signature */}
                            <div>
                                <h4 className="text-[#232323] font-bold text-lg font-int">Jerry Henson</h4>
                                <p className="text-gray-400 text-sm mt-1 font-nuni">/ Shop Director</p>
                            </div>
                        </div>
                        {/* Right Side */}
                        <Flex className="gap-6 h-[450px] md:h-[600px] w-full">
                            {/* Left Image Placeholder */}
                            <div className="w-1/2 h-[80%] bg-[#e5e7eb] rounded-sm mt-0 relative overflow-hidden">
                                {/* <Images imgSrc={ShopImage1} className="w-full h-full object-cover rounded-sm" /> */}
                            </div>
                            {/* Right Image Placeholder */}
                            <div className="w-1/2 h-[80%] bg-[#e5e7eb] rounded-sm mt-[15%] relative overflow-hidden">
                                {/* <Images imgSrc={ShopImage2} className="w-full h-full object-cover rounded-sm" /> */}
                            </div>
                        </Flex>
                    </div>
                </Container>
            </div>
            {/* video banner */}
            <div className="w-full h-[300px] md:h-[400px] lg:h-[450px] bg-[#7a7a7a] flex items-center justify-center bg-cover bg-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-xl group">
                    <FaPlay className="text-[#80B500] text-2xl md:text-3xl ml-2 group-hover:text-[#6a9600] transition-colors" />
                </div>
            </div>
            {/* team member */}
            <Member/>
            {/* Client Testimonial Section */}
            <div className="bg-[#f9f8f3] py-24">
                <Container className="px-4 sm:px-8 lg:px-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#232323] mb-3 font-int">
                        Client Testimonial
                    </h2>
                    <p className="text-gray-500 text-sm font-nuni mb-16">
                        A highly efficient slip-ring scanner for today's diagnostic requirements.
                    </p>
                    <Flex className="items-center justify-center gap-x-4 md:gap-x-12">
                        {/* Left Arrow */}
                        <button className="custom-prev-btn hidden md:flex w-12 h-12 rounded-full border border-[#80B500] items-center justify-center cursor-pointer text-[#80B500] hover:bg-[#80B500] hover:text-white transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed">
                            <HiOutlineArrowLeft className="text-xl" />
                        </button>
                        {/* Testimonial Card */}
                        <div className="relative w-full max-w-3xl">
                            {/* Background Layer */}
                            <div className="absolute top-6 bottom-6 -left-4 -right-4 md:-left-8 md:-right-8 bg-white/50 shadow-sm rounded-sm z-0"></div>
                            {/* Main Card Layer */}
                            <div className="relative z-10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-sm pt-12 pb-16">
                                <Swiper
                                    modules={[Pagination, Navigation]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    navigation={{
                                        prevEl: '.custom-prev-btn',
                                        nextEl: '.custom-next-btn',
                                    }}
                                    pagination={{
                                        el: '.custom-testi-pagination',
                                        clickable: true,
                                    }}
                                    className="w-full"
                                >
                                    {testimonials.map((item) => (
                                        <SwiperSlide key={item.id} className="px-6 md:px-16 pb-8">
                                            <Flex className="flex-col items-center">
                                                {/* Avatar */}
                                                <div className="w-16 h-16 bg-[#e2e2e6] rounded-full mb-4"></div>
                                                {/* Info */}
                                                <h4 className="text-[#232323] font-bold text-lg font-int mb-1">
                                                    {item.name}
                                                </h4>
                                                <p className="text-gray-400 text-xs font-nuni mb-6">
                                                    {item.designation}
                                                </p>
                                                {/* Text */}
                                                <p className="text-[#6b7280] text-sm md:text-[15px] leading-relaxed font-nuni text-center">
                                                    {item.text}
                                                </p>
                                            </Flex>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {/* Dots */}
                                <div className="custom-testi-pagination absolute bottom-10 left-0 right-0 flex items-center justify-center gap-x-2 z-20
                                    [&_.swiper-pagination-bullet]:w-2
                                    [&_.swiper-pagination-bullet]:h-2
                                    [&_.swiper-pagination-bullet]:bg-[#c0d892]
                                    [&_.swiper-pagination-bullet]:opacity-100
                                    [&_.swiper-pagination-bullet]:rounded-full
                                    [&_.swiper-pagination-bullet]:m-0
                                    [&_.swiper-pagination-bullet]:transition-all
                                    [&_.swiper-pagination-bullet]:cursor-pointer
                                    [&_.swiper-pagination-bullet-active]:bg-transparent!
                                    [&_.swiper-pagination-bullet-active]:border-[1.5px]
                                    [&_.swiper-pagination-bullet-active]:border-[#80B500]
                                    [&_.swiper-pagination-bullet-active]:w-3!
                                    [&_.swiper-pagination-bullet-active]:h-3!
                                "></div>
                            </div>
                        </div>
                        {/* Right Arrow */}
                        <button className="custom-next-btn hidden md:flex w-12 h-12 rounded-full bg-[#80B500] items-center justify-center cursor-pointer text-white shadow-[0_4px_15px_rgba(128,181,0,0.3)] hover:bg-[#6a9600] transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed">
                            <HiOutlineArrowRight className="text-xl" />
                        </button>
                    </Flex>
                </Container>
            </div>
            {/* blog */}
            <Blog/>
        </main>
    );
};

export default About;