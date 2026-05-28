import React, { useState } from 'react';
import Images from '../Images';
import Container from '../Container';
import tc1 from '../../assets/tc1.png';
import tc2 from '../../assets/tc2.png';
import tc3 from '../../assets/tc3.png';
import tc4 from '../../assets/tc4.png';
import tc5 from '../../assets/tc5.png';

// Swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const Topslider = () => {
    const [selected, setSelected] = useState('Herbal , fruits , Juices , ,Package , Fast');

    return (
        <>
            <div className="relative">
                <div className="">
                    <Container className={'p-4 sm:p-6 lg:p-10 absolute left-1/2 -translate-x-1/2 -top-[120px] md:-top-[180px] lg:-top-90 bg-white w-[95%] md:w-[90%] lg:w-full rounded-lg shadow-lg '}>
                        <div className='mx-2 md:mx-10 lg:mx-25 my-10 lg:my-20 relative'>
                            
                            <Swiper
                                modules={[Navigation]}
                                loop={true}
                                speed={500}
                                slidesPerView={5}
                                navigation={{
                                    nextEl: '.custom-next',
                                    prevEl: '.custom-prev',
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    480: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                    },
                                    1280: {
                                        slidesPerView: 5,
                                    }
                                }}
                                className="w-full"
                            >
                                {/* Slide 1 */}
                                <SwiperSlide>
                                    <div className="text-center outline-none cursor-pointer group" onClick={() => setSelected('fruits')}>
                                        <Images imgSrc={tc1} className={'mx-auto w-[60px] md:w-auto'}/>
                                        <h4 className={`text-[16px] md:text-[20px] font-bold font-int pb-4 md:pb-8 pt-4 md:pt-5 transition-colors duration-300 ${selected === 'fruits' ? 'text-[#7bb343]' : 'text-[#232323] group-hover:text-[#7bb343]'}`}>Fruits & Vegies</h4>
                                        <p className='text-[#1A2167] font-nuni text-[13px] md:text-[15px]'>(235 item)</p>
                                    </div>
                                </SwiperSlide>
                                {/* Slide 2 */}
                                <SwiperSlide>
                                    <div className="text-center outline-none cursor-pointer group" onClick={() => setSelected('Herbal')}>
                                        <Images imgSrc={tc2} className={'mx-auto w-[60px] md:w-auto'}/>
                                        <h4 className={`text-[16px] md:text-[20px] font-bold font-int pb-4 md:pb-8 pt-4 md:pt-5 transition-colors duration-300 ${selected === 'Herbal' ? 'text-[#7bb343]' : 'text-[#232323] group-hover:text-[#7bb343]'}`}>Herbal Tea</h4>
                                        <p className='text-[#1A2167] font-nuni text-[13px] md:text-[15px]'>(235 item)</p>
                                    </div>
                                </SwiperSlide>
                                {/* Slide 3 */}
                                <SwiperSlide>
                                    <div className="text-center outline-none cursor-pointer group" onClick={() => setSelected('Juices')}>
                                        <Images imgSrc={tc3} className={'mx-auto w-[60px] md:w-auto'}/>
                                        <h4 className={`text-[16px] md:text-[20px] font-bold font-int pb-4 md:pb-8 pt-4 md:pt-5 transition-colors duration-300 ${selected === 'Juices' ? 'text-[#7bb343]' : 'text-[#232323] group-hover:text-[#7bb343]'}`}>Juices</h4>
                                        <p className='text-[#1A2167] font-nuni text-[13px] md:text-[15px]'>(235 item)</p>
                                    </div>
                                </SwiperSlide>
                                {/* Slide 4 */}
                                <SwiperSlide>
                                    <div className="text-center outline-none cursor-pointer group" onClick={() => setSelected('Fast')}>
                                        <Images imgSrc={tc4} className={'mx-auto w-[60px] md:w-auto'}/>
                                        <h4 className={`text-[16px] md:text-[20px] font-bold font-int pb-4 md:pb-8 pt-4 md:pt-5 transition-colors duration-300 ${selected === 'Fast' ? 'text-[#7bb343]' : 'text-[#232323] group-hover:text-[#7bb343]'}`}>Fast Foods</h4>
                                        <p className='text-[#1A2167] font-nuni text-[13px] md:text-[15px]'>(235 item)</p>
                                    </div>
                                </SwiperSlide>
                                {/* Slide 5 */}
                                <SwiperSlide>
                                    <div className="text-center outline-none cursor-pointer group" onClick={() => setSelected('Package')}>
                                        <Images imgSrc={tc5} className={'mx-auto w-[60px] md:w-auto'}/>
                                        <h4 className={`text-[16px] md:text-[20px] font-bold font-int pb-4 md:pb-8 pt-4 md:pt-5 transition-colors duration-300 ${selected === 'Package' ? 'text-[#7bb343]' : 'text-[#232323] group-hover:text-[#7bb343]'}`}>Package Food</h4>
                                        <p className='text-[#1A2167] font-nuni text-[13px] md:text-[15px]'>(235 item)</p>
                                    </div>
                                </SwiperSlide>
                                {/* Slide 6 */}
                                <SwiperSlide>
                                    <div className="text-center outline-none cursor-pointer group" onClick={() => setSelected('Herbal')}>
                                        <Images imgSrc={tc2} className={'mx-auto w-[60px] md:w-auto'}/>
                                        <h4 className={`text-[16px] md:text-[20px] font-bold font-int pb-4 md:pb-8 pt-4 md:pt-5 transition-colors duration-300 ${selected === 'Herbal' ? 'text-[#7bb343]' : 'text-[#232323] group-hover:text-[#7bb343]'}`}>Herbal Tea</h4>
                                        <p className='text-[#1A2167] font-nuni text-[13px] md:text-[15px]'>(235 item)</p>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Topslider;