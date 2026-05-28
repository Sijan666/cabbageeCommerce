import React from 'react'
import Container from '../Container'
import Flex from '../Flex'
import Button from '../Button'
import Images from '../Images'
import adss1 from '../../assets/adss1.png'
import adss2 from '../../assets/adss2.png'
import adss3 from '../../assets/adss3.png'

const Ads = () => {
    return (
        <>
        <div className=""> 
            <Container className={'lg:relative px-4 lg:px-0'}>
                <div className="lg:absolute lg:-bottom-30 lg:left-1/2 lg:-translate-x-1/2 w-full">
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
                            <Images imgSrc={adss1} className={'w-full'}/>
                            <Images imgSrc={adss2} className={'w-full'}/>
                            <Images imgSrc={adss3} className={'w-full'}/>
                    </div>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Ads