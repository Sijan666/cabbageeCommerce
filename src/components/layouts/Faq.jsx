import React from 'react'
import Container from '../Container'
import Flex from '../Flex'
import Images from '../Images'
import jhuri from '../../assets/jhuri.png'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const Faq = () => {

    
    return (
        <>
        <div className="pt-25">
            <Container>
                <h3 className='text-[48px] font-int text-[#232323] font-bold text-center'>Some Quesions</h3>
                <p className='text-base font-nuni text-[#546375] pt-5 text-center'>A highly efficient slip-ring scanner for today's diagnostic requirements.</p>
                <div className="py-15">
                    <Flex className={'justify-between gap-x-10'}>
                        <div className="w-[60%] shadow-customMade rounded-md">
                            <div className="p-15 h-150">
                                <Accordion type="single" collapsible defaultValue="inform" className="max-w-lg">
                                    <AccordionItem value="inform" className={'border-0 mb-10'}>
                                        <AccordionTrigger className={'hover:no-underline border border-[#5C727D] px-7.5 py-5 rounded-md hover:bg-[#80B500] hover:text-white duration-300 hover:border-[#80B500] text-[17px] font-int text-[#666E77]'}>
                                            How can I informed that youfood tested by lab?
                                        </AccordionTrigger>
                                        <AccordionContent className={'px-7.5 py-5 text-[14px] font-nuni text-[#5C727D]'}>
                                            We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="benefit" className={'border-0 mb-10'}>
                                        <AccordionTrigger className={'hover:no-underline border border-[#5C727D] px-7.5 py-5 rounded-md hover:bg-[#80B500] hover:text-white duration-300 hover:border-[#80B500] text-[17px] font-int text-[#666E77]'}>
                                            What are the benefits to paying advance amount ?
                                        </AccordionTrigger>
                                        <AccordionContent className={'px-7.5 py-5 text-[14px] font-nuni text-[#5C727D]'}>
                                            Maecenas quis viverra metus, et efficitur ligula. Nam congue augue et ex congue sem. Duis elementum tortor eget condimentum tempor. Praesent sollicitudin semper at orci at placerat.Placeat Lorem ipsum dolor sit amet onsectetur tempora.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="bylab" className={'border-0 mb-10'}>
                                        <AccordionTrigger className={'hover:no-underline border border-[#5C727D] px-7.5 py-5 rounded-md hover:bg-[#80B500] hover:text-white duration-300 hover:border-[#80B500] text-[17px] font-int text-[#666E77]'}>
                                            How can I informed that your food tested by lab?
                                        </AccordionTrigger>
                                        <AccordionContent className={'px-7.5 py-5 text-[14px] font-nuni text-[#5C727D]'}>
                                        Reach us via email, live chat, or phone. We respond within 24 hours
                                        during business days.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="tested" className={'border-0 mb-10'}>
                                        <AccordionTrigger className={'hover:no-underline border border-[#5C727D] px-7.5 py-5 rounded-md hover:bg-[#80B500] hover:text-white duration-300 hover:border-[#80B500] text-[17px] font-int text-[#666E77]'}>
                                            How can I informed that your food tested by lab?
                                        </AccordionTrigger>
                                        <AccordionContent className={'px-7.5 py-5 text-[14px] font-nuni text-[#5C727D]'}>
                                        Reach us via email, live chat, or phone. We respond within 24 hours
                                        during business days.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                        <div className="w-[40%]">
                            <Images imgSrc={jhuri}/>
                        </div>
                    </Flex>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Faq