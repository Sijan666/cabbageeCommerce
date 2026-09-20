import React from 'react'
import Container from '../Container'
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
        <div className="lg:bg-[url('/src/assets/counter.png')] bg-no-repeat bg-center bg-cover py-12 sm:py-16 lg:py-18" aria-label="company statistics">
            <Container className={'px-4 sm:px-6 lg:px-0'}>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:flex-row gap-y-10 lg:gap-y-0 items-center justify-between w-full">
                    {/* counter 1 */}
                    <div className="mx-auto text-center w-full lg:w-auto" aria-label="560 good reviews" tabIndex={0}>
                        <Images imgSrc={c1} className={'mx-auto'} alt="" aria-hidden="true" />
                        <h4 className='text-4xl lg:text-[42px] font-bold font-int text-[#223645] pt-4 lg:pt-5 pb-1.5 lg:pb-2.5' aria-hidden="true">
                            <SlotCounter value={560} animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }} />
                        </h4>
                        <p className='text-[#666E77] text-base lg:text-[19px] font-nuni' aria-hidden="true">Good Reviews</p>
                    </div>
                    {/* path separator */}
                    <Images imgSrc={path} className={'hidden lg:block shrink-0'} alt="" aria-hidden="true" />
                    {/* counter 2 */}
                    <div className="mx-auto text-center w-full lg:w-auto" aria-label="197 organic branch" tabIndex={0}>
                        <Images imgSrc={c2} className={'mx-auto'} alt="" aria-hidden="true" />
                        <h4 className='text-4xl lg:text-[42px] font-bold font-int text-[#223645] pt-4 lg:pt-5 pb-1.5 lg:pb-2.5' aria-hidden="true">
                            <SlotCounter value={197} animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}/>
                        </h4>
                        <p className='text-[#666E77] text-base lg:text-[19px] font-nuni' aria-hidden="true">Organic Branch</p>
                    </div>
                    {/* path separator */}
                    <Images imgSrc={path} className={'hidden lg:block shrink-0'} alt="" aria-hidden="true" />
                    {/* counter 3 */}
                    <div className="mx-auto text-center w-full lg:w-auto" aria-label="268 cultivator land" tabIndex={0}>
                        <Images imgSrc={c3} className={'mx-auto'} alt="" aria-hidden="true" />
                        <h4 className='text-4xl lg:text-[42px] font-bold font-int text-[#223645] pt-4 lg:pt-5 pb-1.5 lg:pb-2.5' aria-hidden="true">
                            <SlotCounter value={268} animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}/>
                        </h4>
                        <p className='text-[#666E77] text-base lg:text-[19px] font-nuni' aria-hidden="true">Cultivator Land</p>
                    </div>
                    {/* path separator */}
                    <Images imgSrc={path} className={'hidden lg:block shrink-0'} alt="" aria-hidden="true" />
                    {/* counter 4 */}
                    <div className="mx-auto text-center w-full lg:w-auto" aria-label="340 total consumer" tabIndex={0}>
                        <Images imgSrc={c4} className={'mx-auto'} alt="" aria-hidden="true" />
                        <h4 className='text-4xl lg:text-[42px] font-bold font-int text-[#223645] pt-4 lg:pt-5 pb-1.5 lg:pb-2.5' aria-hidden="true">
                            <SlotCounter value={340} animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}/>
                        </h4>
                        <p className='text-[#666E77] text-base lg:text-[19px] font-nuni' aria-hidden="true">Total Consumer</p>
                    </div>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Counter