import React from 'react'
import Flex from '../Flex'
import Images from '../Images'
import Container from '../Container'
import tc1 from '../../assets/tc1.png'
import tc2 from '../../assets/tc2.png'
import tc3 from '../../assets/tc3.png'
import tc4 from '../../assets/tc4.png'
import tc5 from '../../assets/tc5.png'

const Topslider = () => {
    return (
        <>
            <div className="relative">
                <div className="">
                    <Container className={'p-10 absolute left-1/2 -translate-x-1/2 -top-70 bg-white w-full rounded-lg shadow-lg '}>
                        <Flex className={'justify-between mx-10'}>
                            
                            {/* Item 1 */}
                            <div className="text-center">
                                <Images imgSrc={tc1} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Fruits & Veggies</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(235 item)</p>
                            </div>

                            {/* Item 2 */}
                            <div className="text-center">
                                <Images imgSrc={tc2} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Groceries</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(105 item)</p>
                            </div>

                            {/* Item 3 */}
                            <div className="text-center">
                                <Images imgSrc={tc3} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Meats</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(45 item)</p>
                            </div>

                            {/* Item 4 */}
                            <div className="text-center">
                                <Images imgSrc={tc4} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Fish</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(35 item)</p>
                            </div>

                            {/* Item 5 */}
                            <div className="text-center">
                                <Images imgSrc={tc5} className={'mx-auto'}/>
                                <h4 className='text-[#232323] text-[20px] font-bold font-int pb-8 pt-5'>Beverages</h4>
                                <p className='text-[#1A2167] font-nuni text-[15px]'>(12 item)</p>
                            </div>

                        </Flex>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Topslider