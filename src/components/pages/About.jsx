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
import 'swiper/css/effect-cards';
import { Pagination, Navigation, EffectCards } from 'swiper/modules';
import Blog from '../layouts/Blog';

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

const About = () => {
    return (
        <main className="w-full font-sans" role="main">
            {/* Banner Section */}
            <section className="relative bg-[#f4f6f8] py-16 md:py-24 overflow-hidden" aria-label="About Us Banner">
                <Container className="px-4 sm:px-8 lg:px-20">
                    <Flex className="flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-int">
                            About us
                        </h1>
                        <Flex className="items-center text-sm text-gray-500 space-x-2 font-nuni" aria-label="Breadcrumb">
                            <Link to={'/'} aria-label="Go to homepage">
                                <span className="hover:text-[#80B500] cursor-pointer transition-colors">Home</span>
                            </Link>
                            <span aria-hidden="true">›</span>
                            <span className="text-gray-800" aria-current="page">About us</span>
                        </Flex>
                    </Flex>
                    {/* Image */}
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
            {/* Main Content Section */}
            <section className="py-16 md:py-20" aria-labelledby="about-details-heading">
                <Container className="px-4 sm:px-8 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        {/* Left Side: Text Content */}
                        <div>
                            <span className="text-[#84b544] font-medium text-sm md:text-base mb-4 block font-nuni">
                                Know More About Shop
                            </span>
                            <h2 id="about-details-heading" className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-[#232323] leading-tight md:leading-[1.2] mb-6 font-int">
                                Trusted Organic Food <br className="hidden lg:block" /> Store For People
                            </h2>
                            <div className="text-gray-500 space-y-4 md:space-y-6 text-sm md:text-base leading-relaxed mb-8 md:mb-10 pr-0 md:pr-10 font-nuni">
                                <p>
                                    Buy natural, sustainable and chemicalfree products from local the country. We are a strong community of 100,000+
                                </p>
                                <p>
                                    sellers who aspire to be good, do good, and spread goodness. We democratic, self-sustaining, two-sided marketplace which thrives on trust and is built on community and quality content.
                                </p>
                            </div>
                            {/* Signature */}
                            <div>
                                <h4 className="text-[#232323] font-bold text-base md:text-lg font-int">Jerry Henson</h4>
                                <p className="text-gray-400 text-xs md:text-sm mt-1 font-nuni">/ Shop Director</p>
                            </div>
                        </div>
                        {/* Right Side: Images */}
                        <Flex className="gap-4 md:gap-6 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full" aria-hidden="true">
                            {/* Left Image Placeholder */}
                            <div className="w-1/2 h-[80%] bg-[#e5e7eb] rounded-sm mt-0 relative overflow-hidden">
                                {/* Add Images here */}
                            </div>
                            {/* Right Image Placeholder */}
                            <div className="w-1/2 h-[80%] bg-[#e5e7eb] rounded-sm mt-[15%] relative overflow-hidden">
                                {/* Add Images here */}
                            </div>
                        </Flex>
                    </div>
                </Container>
            </section>
            {/* Video Banner Section */}
            <section className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] bg-[#7a7a7a] flex items-center justify-center bg-cover bg-center" aria-label="Promotional Video">
                <button 
                    type="button"
                    aria-label="Play promotional video"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-xl group focus:outline-none focus:ring-4 focus:ring-[#80B500]/50"
                >
                    <FaPlay className="text-[#80B500] text-xl sm:text-2xl md:text-3xl ml-1 sm:ml-2 group-hover:text-[#6a9600] transition-colors" aria-hidden="true" />
                </button>
            </section>
            {/* Team Member Section */}
            <Member />
            {/* Client Testimonial Section */}
            <section className="bg-[#f9f8f3] py-16 md:py-24" aria-labelledby="testimonial-heading">
                <Container className="px-4 sm:px-8 lg:px-20 text-center">
                    <h2 id="testimonial-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#232323] mb-3 font-int">
                        Client Testimonial
                    </h2>
                    <p className="text-gray-500 text-sm font-nuni mb-10 md:mb-16">
                        A highly efficient slip-ring scanner for today's diagnostic requirements.
                    </p>
                    <Flex className="items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-12 relative">
                        {/* Left Arrow */}
                        <button 
                            type="button"
                            aria-label="Previous testimonial"
                            className="custom-prev-btn hidden md:flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#80B500] items-center justify-center cursor-pointer text-[#80B500] hover:bg-[#80B500] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#80B500] [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed"
                        >
                            <HiOutlineArrowLeft className="text-lg md:text-xl" aria-hidden="true" />
                        </button>
                        {/* Testimonial Card */}
                        <div className="relative w-full max-w-[90vw] sm:max-w-[450px] md:max-w-[600px] mx-auto">
                            <div className="relative z-10 pt-8 md:pt-12 pb-12 md:pb-16">
                                <Swiper
                                    effect={'cards'}
                                    grabCursor={true}
                                    modules={[EffectCards, Pagination, Navigation]}
                                    cardsEffect={{
                                        slideShadows: false,
                                    }}
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
                                        <SwiperSlide key={item.id} className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] rounded-xl px-5 sm:px-8 md:px-16 py-8 md:py-12 border border-gray-100 box-border">
                                            <Flex className="flex-col items-center">
                                                {/* Avatar */}
                                                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#e2e2e6] rounded-full mb-3 md:mb-4 shrink-0" aria-hidden="true"></div>
                                                {/* Info */}
                                                <h4 className="text-[#232323] font-bold text-base md:text-lg font-int mb-1 text-center">
                                                    {item.name}
                                                </h4>
                                                <p className="text-gray-400 text-[11px] md:text-xs font-nuni mb-4 md:mb-6 text-center">
                                                    {item.designation}
                                                </p>
                                                {/* Text */}
                                                <p className="text-[#6b7280] text-xs sm:text-sm md:text-[15px] leading-relaxed md:leading-relaxed font-nuni text-center line-clamp-6 md:line-clamp-none">
                                                    {item.text}
                                                </p>
                                            </Flex>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {/* Dots */}
                                <div 
                                    className="custom-testi-pagination absolute bottom-0 md:bottom-4 left-0 right-0 flex items-center justify-center gap-x-2 z-20
                                    [&_.swiper-pagination-bullet]:w-2
                                    [&_.swiper-pagination-bullet]:h-2
                                    [&_.swiper-pagination-bullet]:bg-[#c0d892]
                                    [&_.swiper-pagination-bullet]:opacity-100
                                    [&_.swiper-pagination-bullet]:rounded-full
                                    [&_.swiper-pagination-bullet]:m-0
                                    [&_.swiper-pagination-bullet]:transition-all
                                    [&_.swiper-pagination-bullet]:cursor-pointer
                                    [&_.swiper-pagination-bullet]:focus:outline-none
                                    [&_.swiper-pagination-bullet]:focus:ring-2
                                    [&_.swiper-pagination-bullet]:focus:ring-[#80B500]
                                    [&_.swiper-pagination-bullet-active]:bg-transparent!
                                    [&_.swiper-pagination-bullet-active]:border-[1.5px]
                                    [&_.swiper-pagination-bullet-active]:border-[#80B500]
                                    [&_.swiper-pagination-bullet-active]:w-3!
                                    [&_.swiper-pagination-bullet-active]:h-3!"
                                    aria-label="Testimonial pagination"
                                ></div>
                            </div>
                        </div>
                        {/* Right Arrow */}
                        <button 
                            type="button"
                            aria-label="Next testimonial"
                            className="custom-next-btn hidden md:flex w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#80B500] items-center justify-center cursor-pointer text-white shadow-[0_4px_15px_rgba(128,181,0,0.3)] hover:bg-[#6a9600] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#80B500] [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed"
                        >
                            <HiOutlineArrowRight className="text-lg md:text-xl" aria-hidden="true" />
                        </button>
                    </Flex>
                </Container>
            </section>
            {/* Blog Section */}
            <Blog />
        </main>
    );
};

export default About;