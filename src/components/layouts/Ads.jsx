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
            <Container className={'relative'}>
                <div className="absolute -bottom-30 left-1/2 -translate-x-1/2 w-full">
                    <Flex className={'justify-between gap-x-7'}>
                            <Images imgSrc={adss1} className={'w-full'}/>
                            <Images imgSrc={adss2} className={'w-full'}/>
                            <Images imgSrc={adss3} className={'w-full'}/>
                    </Flex>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Ads