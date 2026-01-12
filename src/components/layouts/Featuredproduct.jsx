import React from 'react'
import Container from '../Container'
import Flex from '../Flex'
import Product from '../Product'
import stars from '../../assets/stars.png'

const Featuredproduct = () => {
    return (
        <>
        <div className="py-25">
            <Container>
                <h3 className='text-[48px] font-int text-[#232323] font-bold text-center'>Featured Products</h3>
                <p className='text-base font-nuni text-[#546375] pt-5 text-center'>A highly efficient slip-ring scanner for today's diagnostic requirements.</p>
                <div className="product pt-13">
                    <Flex className={'justify-between'}>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Carrots Group Scal'}
                                productPrice={'$32.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Red Hot Tomato'}
                                productPrice={'$25.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Brucoli Sliced Mix'}
                                productPrice={'$32.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Orange Sliced Mix'}
                                productPrice={'$32.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                    </Flex>
                    <Flex className={'justify-between pt-6'}>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Sliced Red Apple'}
                                productPrice={'$32.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Fresh Green Olive'}
                                productPrice={'$32.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Yellow Orange Mix'}
                                productPrice={'$32.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                        <div className="">
                            <Product 
                                productImg={''}
                                productRatings={stars}
                                badge={'-29%'}
                                productTitle={'Fresh Juice pack'}
                                productPrice={'$32.00'}
                                productOffer={'$46.00'}
                            />
                        </div>
                    </Flex>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Featuredproduct