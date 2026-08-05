import React, { useState, useEffect } from "react";
import Container from "../Container"; 
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message! Our support team will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#F7F9F2] min-h-screen py-16 md:py-24 font-nuni">
        <Container className="px-4 lg:px-0">
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#80B500]/10 border border-[#80B500]/20 text-[#80B500] font-nuni font-bold tracking-[0.2em] text-xs mb-4 uppercase cursor-default">
                <span className="w-2 h-2 rounded-full bg-[#80B500] mr-2"></span>
                Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-int text-[#232323] mb-4 tracking-tight">
                Contact <span className="text-[#80B500]">Us</span>
            </h2>
            <p className="text-base font-nuni text-[#546375] leading-relaxed">
                Have a question about our products, your order, or just want to say hi? We are always here to help you.
            </p>
            </div>
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-4xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#80B500]/10 flex items-center justify-center text-[#80B500] mb-6 group-hover:bg-[#80B500] group-hover:text-white transition-colors duration-300">
                <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black font-int text-[#232323] mb-2">Our Location</h3>
                <p className="text-[#546375] text-sm">254 Lillian, Holbrook<br />New York, USA</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-4xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#80B500]/10 flex items-center justify-center text-[#80B500] mb-6 group-hover:bg-[#80B500] group-hover:text-white transition-colors duration-300">
                <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black font-int text-[#232323] mb-2">Call Us</h3>
                <p className="text-[#546375] text-sm">+1 (800) 123-4567<br />+1 (800) 987-6543</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-4xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#80B500]/10 flex items-center justify-center text-[#80B500] mb-6 group-hover:bg-[#80B500] group-hover:text-white transition-colors duration-300">
                <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black font-int text-[#232323] mb-2">Email Us</h3>
                <p className="text-[#546375] text-sm">info@santizex-site.com<br />support@santizex.com</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-8 rounded-4xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#80B500]/10 flex items-center justify-center text-[#80B500] mb-6 group-hover:bg-[#80B500] group-hover:text-white transition-colors duration-300">
                <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black font-int text-[#232323] mb-2">Business Hours</h3>
                <p className="text-[#546375] text-sm">Mon - Fri: 9am - 6pm<br />Saturday: 10am - 4pm</p>
            </div>
            </div>
            {/* Map & Form Section */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Google Map (Left Side) */}
            <div className="h-100 lg:h-auto w-full relative bg-gray-200">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sbd!4v1689254359876!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
            </div>
            {/* Contact Form (Right Side) */}
            <div className="p-8 md:p-14">
                <h3 className="text-2xl md:text-3xl font-black font-int text-[#232323] mb-2">Send a Message</h3>
                <p className="text-sm text-[#546375] mb-8">
                Fill out the form below and we will reply as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#232323]">Your Name *</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe" 
                        className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none transition-colors text-sm"
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#232323]">Email Address *</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com" 
                        className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none transition-colors text-sm"
                    />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#232323]">Subject</label>
                    <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none transition-colors text-sm"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#232323]">Message *</label>
                    <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..." 
                    rows="4"
                    className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl px-5 py-4 outline-none transition-colors text-sm resize-none"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="mt-4 bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#80B500]/30 hover:shadow-xl transition-all duration-300 uppercase tracking-widest text-sm w-full md:w-auto self-start flex items-center justify-center gap-2 cursor-pointer group"
                >
                    Send Message
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
                </form>
            </div>
            </div>
        </Container>
        </div>
    );
};

export default Contact;