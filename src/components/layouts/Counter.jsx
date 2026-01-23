import React from 'react'
import Container from '../Container'
import Flex from '../Flex'
import Images from '../Images'

import c1 from '../../assets/c1.png'
import c2 from '../../assets/c2.png'
import c3 from '../../assets/c3.png'
import c4 from '../../assets/c4.png'
import path from '../../assets/path.png'

import SlotCounter from 'react-slot-counter';

const Counter = () => {
    return (
        <>
        <div className="bg-[url('/src/assets/counter.png')] bg-no-repeat bg-center bg-cover py-[72px]">
            <Container>
                <Flex className={'justify-between'}>
                    <div className="mx-auto text-center">
                        <Images imgSrc={c1} className={'mx-auto'}/>
                        <h4 className='text-[42px] font-bold font-int text-[#223645] pt-5 pb-2.5'><SlotCounter value={560} /></h4>
                        <p className='text-[#666E77] text-[19px] font-nuni'>Good Reviews</p>
                    </div>
                    <Images imgSrc={path}/>
                    <div className="mx-auto text-center">
                        <Images imgSrc={c2} className={'mx-auto'}/>
                        <h4 className='text-[42px] font-bold font-int text-[#223645] pt-5 pb-2.5'><SlotCounter value={197} /></h4>
                        <p className='text-[#666E77] text-[19px] font-nuni'>Organic Branch</p>
                    </div>
                    <Images imgSrc={path}/>
                    <div className="mx-auto text-center">
                        <Images imgSrc={c3} className={'mx-auto'}/>
                        <h4 className='text-[42px] font-bold font-int text-[#223645] pt-5 pb-2.5'><SlotCounter value={268} /></h4>
                        <p className='text-[#666E77] text-[19px] font-nuni'>Cultivator Land</p>
                    </div>
                    <Images imgSrc={path}/>
                    <div className="mx-auto text-center">
                        <Images imgSrc={c4} className={'mx-auto'}/>
                        <h4 className='text-[42px] font-bold font-int text-[#223645] pt-5 pb-2.5'><SlotCounter value={340} /></h4>
                        <p className='text-[#666E77] text-[19px] font-nuni'>Total Consumer</p>
                    </div>
                </Flex>
            </Container>
        </div>
        </>
    )
}

export default Counter