import React from 'react'
import Container from '../Container'

const Topcategories = () => {
    return (
        <>
        <div className="my-16 md:my-30 bg-[#525355] pt-16 md:pt-25 pb-[150px] md:pb-[290px]">
            <Container className="px-4 lg:px-0">
                <div className="text-center mb-1">
                    <h3 className="text-3xl md:text-5xl font-bold text-[#FFFFFF] font-int">
                        Top Categories
                    </h3>
                    <p className="text-sm md:text-base text-[#FFFFFF] font-nuni mt-3 md:mt-5 max-w-2xl mx-auto">
                        A highly efficient slip-ring scanner for today's diagnostic
                        requirements.
                    </p>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Topcategories;