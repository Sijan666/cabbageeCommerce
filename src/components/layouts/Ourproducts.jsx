import React, { useEffect, useRef } from 'react'
import Container from '../Container'
import Flex from '../Flex'
import ProductforOurProducts from '../ProductsforOurProducts'
import mixitup from 'mixitup';

const Ourproducts = () => {

    const containerRef = useRef(null);
    
    useEffect(() => {
            if (containerRef.current) {
            mixitup(containerRef.current, {
                animation: {
                    duration: 400,
                },
                selectors: {
                    target: '.mix'
                }
            });
        }
    },);

    return (
        <>
        <div className="pb-15">
            <Container>
                <h3 className='text-[48px] font-int text-[#232323] font-bold text-center'>Our Products</h3>
                <p className='text-base font-nuni text-[#546375] pt-5 text-center'>A highly efficient slip-ring scanner for today's diagnostic requirements.</p>
                <div className="pt-9">
                    <Flex className={'justify-center gap-x-10'}>
                        <p data-filter=".food" className='font-bold font-nuni text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Food & Drinks</p>
                        <p data-filter=".veg" className='font-bold font-nuni text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Vegetables</p>
                        <p data-filter=".dried" className='font-bold font-nuni text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Dried Foods</p>
                        <p data-filter=".bread" className='font-bold font-nuni text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Bread & Cake</p>
                        <p data-filter=".fish" className='font-bold font-nuni text-[18px] cursor-pointer text-[#223645] hover:text-[#80B500] duration-300'>Fish & meat</p>
                    </Flex>
                </div>
                <div className="product pt-13" ref={containerRef}>
                    <Flex className={'gap-x-10 gap-y-10 flex-wrap justify-center'}>
                        <div className="mix food">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Juicy Orange Pack'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                        <div className="mix veg">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Olive Oil'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                        <div className="mix dried">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Seeds Olive Slice'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                        <div className="mix dried">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Penne Box'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                        <div className="mix veg">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Coffe Seeds'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                        <div className="mix bread">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Brown Flour'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                        <div className="mix veg">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Mashroom'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                        <div className="mix food">
                            <ProductforOurProducts 
                                productsImg={''}
                                productsTitle={'Apples'}
                                productsBrand={'GARDEN SAFE,SEED'}
                                productsPrice={'$19.00'}
                            />
                        </div>
                    </Flex>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Ourproducts