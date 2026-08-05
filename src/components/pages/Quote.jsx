import React, { useState } from "react";
import Container from "../Container";
import Flex from "../Flex";
import { SlLocationPin, SlEnvolope, SlPhone } from "react-icons/sl";

const Quote = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Your quote request has been sent successfully. We will contact you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <div className="bg-[#F7F9F2] min-h-screen py-16 md:py-24">
            <Container className="px-4 lg:px-0">
                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-int text-[#232323] mb-4">
                        Request a <span className="text-[#80B500]">Quote</span>
                    </h2>
                    <p className="text-base font-nuni text-[#546375] leading-relaxed">
                        Need a custom order, bulk pricing, or specialized service? Fill out the form below with your requirements, and our team will get back to you with a tailored quotation within 24 hours.
                    </p>
                </div>
                <Flex className="flex-col lg:flex-row gap-12 lg:gap-16 bg-white rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                {/* Contact Information */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-8">
                        <div>
                            <h3 className="text-2xl font-bold font-int text-[#232323] mb-6">Contact Information</h3>
                            <p className="text-[#546375] font-nuni mb-8">
                                Reach out to us directly if you need immediate assistance. We are here to help you.
                            </p>
                        </div>
                        <Flex className="items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#80B500]/10 flex items-center justify-center shrink-0">
                                <SlLocationPin className="text-xl text-[#80B500]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#232323] font-int mb-1">Our Location</h4>
                                <p className="text-[#546375] font-nuni text-sm">254 Lillian, Holbrook<br />New York, USA</p>
                            </div>
                        </Flex>
                        <Flex className="items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#80B500]/10 flex items-center justify-center shrink-0">
                                <SlEnvolope className="text-xl text-[#80B500]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#232323] font-int mb-1">Email Us</h4>
                                <p className="text-[#546375] font-nuni text-sm">info@santizex-site.com<br />support@santizex.com</p>
                            </div>
                        </Flex>
                        <Flex className="items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#80B500]/10 flex items-center justify-center shrink-0">
                                <SlPhone className="text-xl text-[#80B500]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#232323] font-int mb-1">Call Us</h4>
                                <p className="text-[#546375] font-nuni text-sm">+1 (800) 123-4567<br />Mon - Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </Flex>
                    </div>
                    {/* Form */}
                    <div className="w-full lg:w-2/3">
                        <h3 className="text-2xl font-bold font-int text-[#232323] mb-8">Send Us A Message</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#232323] font-nuni">Your Name *</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe" 
                                        className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none font-nuni transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#232323] font-nuni">Email Address *</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com" 
                                        className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none font-nuni transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#232323] font-nuni">Phone Number</label>
                                <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (123) 456-7890" 
                                className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none font-nuni transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#232323] font-nuni">Order Details / Message *</label>
                                <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Please describe the products, quantity, or specific requirements you need a quote for..." 
                                rows="5"
                                className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none font-nuni resize-none transition-colors"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="mt-4 bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold font-nuni py-4 px-8 rounded-xl shadow-lg shadow-[#80B500]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm w-full md:w-auto self-start cursor-pointer"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </Flex>
            </Container>
        </div>
    );
};

export default Quote;