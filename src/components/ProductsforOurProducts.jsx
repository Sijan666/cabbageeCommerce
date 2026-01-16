import React from 'react'
import Images from './Images'
import Flex from './Flex'
import { IoCartOutline } from 'react-icons/io5'
import { GrFavorite } from 'react-icons/gr'
import { GoZoomIn } from 'react-icons/go'

const ProductforOurProducts = ({productsImg , className , productsTitle , productsPrice , productsBrand}) => {
    return (
        <>
        <div className={` pb-7 ${className} shadow-customMade border border-[#FFFFFF] hover:border hover:border-[#80B500] group duration-300 overflow-hidden`}>
            <div className="bg-[#C8CACF] h-[231px] w-[254px] group-hover:bg-[#E0E2EB] duration-300 relative">{productsImg}
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
            <div className="text-center pt-3">
                <h4 className='text-[232323] text-base font-bold font-int pt-[5px] px-2'>{productsTitle}</h4>
                <p className='pt-4 pb-2 text-[#546375] font-nuni text-[12px]'>{productsBrand}</p>
                <p className='text-[14px] text-[#80B500] font-nuni'>{productsPrice}</p>
            </div>
        </div>
        </>
    )
}

export default ProductforOurProducts