import React from 'react'
import Images from './Images'
import Flex from './Flex'
import { IoCartOutline } from 'react-icons/io5'
import { GrFavorite } from 'react-icons/gr'
import { GoZoomIn } from 'react-icons/go'

const Product = ({productImg , className , productRatings , badge , productTitle , productPrice , productOffer}) => {
    return (
        <>
        <div className={`pt-2 px-2 pb-7 ${className} shadow-customMade border border-[#FFFFFF] hover:border hover:border-[#80B500] rounded-md group duration-300 overflow-hidden`}>
            <div className="bg-[#C8CACF] h-[231px] w-[254px] rounded-md group-hover:bg-[#E0E2EB] duration-300 relative">{productImg}
                <Flex className={'gap-x-[11px] absolute opacity-0 group-hover:opacity-100 duration-300 bottom-15 left-1/2 -translate-x-1/2'}>
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
            <div className="flex justify-between mt-[21px] items-center px-2">
                <Images imgSrc={productRatings}/>
                <p className='text-white font-nuni text-base bg-[#80B500] px-[7px] py-0.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md'>{badge}</p>
            </div>
            <h4 className='text-[232323] text-base font-bold font-int pt-[5px] px-2'>{productTitle}</h4>
            <div className="flex pt-[13px] items-baseline px-2">
                <p className='text-[15px] font-bold text-[#283C54] font-nuni'>{productPrice}</p>
                <p className='text-[12px] font-bold text-[#80B500] font-nuni line-through'>{productOffer}</p>
            </div>
        </div>
        </>
    )
}

export default Product