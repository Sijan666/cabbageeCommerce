import React from 'react'
import Images from './Images'
import Flex from './Flex'
import { IoCartOutline } from 'react-icons/io5'
import { GrFavorite } from 'react-icons/gr'
import { GoZoomIn } from 'react-icons/go'

const Product = ({productImg , className , productRatings , badge , productTitle , productPrice , productOffer}) => {
    return (
        <>
        <div className={`w-full pt-2 px-2 pb-5 sm:pb-7 ${className} shadow-customMade border border-[#FFFFFF] hover:border hover:border-[#80B500] rounded-md group duration-300 overflow-hidden`}>
            <div className="bg-[#C8CACF] h-[200px] sm:h-[231px] w-full rounded-md group-hover:bg-[#E0E2EB] duration-300 relative flex justify-center items-center overflow-hidden">
                {productImg}
                <Flex className={'gap-x-[11px] absolute opacity-0 group-hover:opacity-100 duration-300 bottom-10 sm:bottom-15 left-1/2 -translate-x-1/2'}>
                    <div className="bg-white text-[#80B500] rounded-full p-2.5 hover:bg-[#80B500] hover:text-white duration-300 cursor-pointer opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100">
                        <IoCartOutline className="text-[14px]" />
                    </div>
                    <div className="bg-white text-[#80B500] rounded-full p-2.5 hover:bg-[#80B500] hover:text-white duration-300 cursor-pointer opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 delay-100">
                        <GrFavorite className="text-[14px]" />
                    </div>
                    <div className="bg-white text-[#80B500] rounded-full p-2.5 hover:bg-[#80B500] hover:text-white duration-300 cursor-pointer opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 delay-200">
                        <GoZoomIn className="text-[14px]" />
                    </div>
                </Flex>
            </div>
            <div className="flex justify-between mt-[15px] sm:mt-[21px] items-center px-1 sm:px-2 gap-x-2">
                <div className="w-[60px] sm:w-auto shrink-0">
                    <Images imgSrc={productRatings}/>
                </div>
                {badge && (
                    <p className='text-white font-nuni text-[10px] sm:text-base bg-[#80B500] px-2 sm:px-[7px] py-0.5 rounded-tl-xl sm:rounded-tl-2xl rounded-br-xl sm:rounded-br-2xl rounded-tr-md rounded-bl-md whitespace-nowrap'>{badge}</p>
                )}
            </div>
            <h4 className='text-[#232323] text-[14px] sm:text-base font-bold font-int pt-[5px] px-1 sm:px-2 truncate'>{productTitle}</h4>
            <div className="flex pt-2 sm:pt-[13px] items-baseline gap-x-2 px-1 sm:px-2 flex-wrap">
                <p className='text-[13px] sm:text-[15px] font-bold text-[#283C54] font-nuni'>{productPrice}</p>
                {productOffer && (
                    <p className='text-[11px] sm:text-[12px] font-bold text-[#80B500] font-nuni line-through'>{productOffer}</p>
                )}
            </div>
        </div>
        </>
    )
}

export default Product