import React from 'react'
import Container from '../Container'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaHeadset, FaEnvelope, FaComments, FaArrowRight } from "react-icons/fa"

const Faq = () => {
    const faqData = [
        {
            id: "item-1",
            question: "Are your organic foods certified and lab-tested?",
            answer: "Yes, all our fresh produce and grocery items are 100% certified organic by national agricultural boards. We strictly monitor our farms to ensure no synthetic pesticides or fertilizers are used."
        },
        {
            id: "item-2",
            question: "How do you ensure the food stays fresh during delivery?",
            answer: "We use temperature-controlled packaging and partner with express delivery services. This ensures your organic groceries arrive garden-fresh within 24 hours of dispatch."
        },
        {
            id: "item-3",
            question: "What is your refund or return policy for fresh food?",
            answer: "We have a 100% freshness guarantee. If any item is damaged or not fresh upon delivery, simply share a picture with our support team within 12 hours, and we will issue a full refund or a replacement."
        },
        {
            id: "item-4",
            question: "What payment methods do you accept for online orders?",
            answer: "We accept all major credit/debit cards, mobile banking (bKash, Nagad), and Cash on Delivery (COD) for selected local areas."
        }
    ];

    // live chat
    const handleOpenChat = () => {
        const event = new CustomEvent("openLiveChat");
        window.dispatchEvent(event);
    };

    return (
        <div className="py-20 lg:py-28 bg-[#F9FBF5]">
            <Container className="px-4 lg:px-0">
                <div className="text-center mb-16">
                    <span className="text-[#80B500] font-nuni font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
                        Get Your Answers
                    </span>
                    <h3 className="text-4xl md:text-[48px] font-int text-[#232323] font-extrabold">
                        Frequently Asked Questions
                    </h3>
                    <p className="text-base font-nuni text-[#546375] pt-4 max-w-2xl mx-auto">
                        Find answers to the most common questions about our organic products, shipping, and returns.
                    </p>
                </div>
                {/* content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* left side */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full h-full">
                            {faqData.map((faq) => (
                                <AccordionItem 
                                    key={faq.id} 
                                    value={faq.id} 
                                    className="mb-5 border border-[#E5E7EB] rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <AccordionTrigger className="cursor-pointer hover:no-underline px-6 py-5 rounded-xl hover:bg-[#80B500] hover:text-white transition-colors duration-300 text-[17px] font-int text-[#232323] data-[state=open]:text-[#80B500] data-[state=open]:border-[#80B500] data-[state=open]:hover:text-white text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 py-5 text-[15px] font-nuni text-[#546375] leading-relaxed bg-[#F9FBF5] rounded-b-xl border-t border-gray-100">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    {/* right side */}
                    <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
                        {/* live chat */}
                        <div 
                            onClick={handleOpenChat}
                            className="md:col-span-2 relative bg-[#0B1120] rounded-3xl p-8 md:p-10 overflow-hidden group cursor-pointer border border-white/10 shadow-lg hover:shadow-[0_20px_40px_rgba(128,181,0,0.15)] transition-shadow duration-300 flex flex-col justify-center"
                        >
                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#80B500]/30 rounded-full blur-[70px] group-hover:bg-[#80B500]/40 transition-colors duration-500 pointer-events-none"></div>
                            {/* header */}
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex justify-center items-center border border-white/10">
                                    <FaComments className="text-[#80B500] text-2xl" />
                                </div>
                                <div className="flex items-center gap-2 bg-[#80B500]/10 px-3 py-1.5 rounded-full border border-[#80B500]/30 backdrop-blur-sm cursor-default">
                                    <span className="w-2 h-2 rounded-full bg-[#80B500] animate-pulse"></span>
                                    <span className="text-[#80B500] text-xs font-bold font-nuni uppercase tracking-wider">Online</span>
                                </div>
                            </div>
                            {/* text */}
                            <div className="relative z-10">
                                <h4 className="text-white text-[28px] font-int font-bold mb-3 group-hover:text-[#80B500] transition-colors duration-300">Live Chat Support</h4>
                                <p className="text-gray-400 font-nuni text-base mb-8 max-w-87.5">Can't find the answer? Chat with our organic food experts directly.</p>
                                <div className="flex items-center text-white font-bold text-sm font-int uppercase tracking-widest group-hover:text-[#80B500] transition-colors duration-300">
                                    Start Chatting <FaArrowRight className="ml-2 text-[#80B500]" />
                                </div>
                            </div>
                        </div>
                        {/* call us */}
                        <div className="col-span-1 bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 cursor-pointer hover:border-[#80B500]/30 hover:shadow-lg transition-all duration-300 group flex flex-col justify-center">
                            <div className="w-12 h-12 bg-[#F9FBF5] rounded-full flex justify-center items-center mb-5 group-hover:bg-[#80B500] transition-colors duration-300">
                                <FaHeadset className="text-[#80B500] text-xl group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-[#232323] font-int font-bold text-xl mb-1">Call Us</h4>
                            <p className="text-[#546375] font-nuni text-sm">+880 123 456 789</p>
                        </div>
                        {/* email */}
                        <div className="col-span-1 bg-linear-to-br from-[#80B500] to-[#658f00] rounded-3xl p-6 md:p-8 cursor-pointer hover:shadow-xl hover:shadow-[#80B500]/40 transition-shadow duration-300 group flex flex-col justify-center overflow-hidden relative">
                            <div className="absolute -bottom-4 -right-4 text-white/10 text-7xl -rotate-12 pointer-events-none">
                                <FaEnvelope />
                            </div>
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center mb-5 relative z-10">
                                <FaEnvelope className="text-white text-xl" />
                            </div>
                            <h4 className="text-white font-int font-bold text-xl mb-1 relative z-10">Email</h4>
                            <p className="text-white/90 font-nuni text-sm relative z-10">support@cabbage.com</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Faq