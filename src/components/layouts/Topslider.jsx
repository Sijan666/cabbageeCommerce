import React from 'react'
import Flex from '../Flex'
import Images from '../Images'
import Container from '../Container'
import tc1 from '../../assets/tc1.png'
import tc2 from '../../assets/tc2.png'
import tc3 from '../../assets/tc3.png'
import tc4 from '../../assets/tc4.png'
import tc5 from '../../assets/tc5.png'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import NextArrow from '../NextArrow'
import PrevArrow from '../PrevArrow'

const Topslider = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    return (
        <>
            <div className="relative">
                <div className="">
                    <Container className={'p-10 absolute left-1/2 -translate-x-1/2 -top-90 bg-white w-full rounded-lg shadow-lg '}>
                        <div className=' mx-25 my-20'>
                            <Slider {...settings}>
                            <div className="text-center">
                                <Images imgSrc={tc1} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Fruits & Vegies</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>
                            
                            <div className="text-center">
                                <Images imgSrc={tc2} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Herbal Tea</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>

                            <div className="text-center">
                                <Images imgSrc={tc3} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Juices</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>

                            <div className="text-center">
                                <Images imgSrc={tc4} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Fast Foods</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>

                            <div className="text-center">
                                <Images imgSrc={tc5} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Package Food</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>

                            <div className="text-center">
                                <Images imgSrc={tc2} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Herbal Tea</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>

                            <div className="text-center">
                                <Images imgSrc={tc4} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Fast Foods</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>
                            
                            </Slider>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Topslider