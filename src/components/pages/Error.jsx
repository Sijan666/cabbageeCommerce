import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Error = () => {
    return (
        <>
        <Helmet>
            <title>404 - Page Not Found | Cabbage</title>
        </Helmet>
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 font-sans relative overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#8cc63f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            <div className="max-w-2xl w-full text-center relative z-10">
            <h1 className="text-[150px] md:text-[200px] font-extrabold text-gray-800 leading-none tracking-tighter drop-shadow-sm relative inline-block">
                4<span className="text-[#8cc63f]">0</span>4
                <span className="absolute top-12 right-0 text-5xl md:text-6xl transform rotate-12 drop-shadow-md">🍃</span>
            </h1>
            <div className="mt-4 md:mt-8">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Oops! This page looks a bit <span className="text-[#8cc63f] italic">overripe.</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
                We couldn't find the organic page you're looking for. It might have been moved, or it simply doesn't exist anymore.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                to="/"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-in-out bg-[#8cc63f] rounded-full hover:bg-[#7ab135] hover:shadow-[0_8px_25px_rgba(140,198,63,0.4)] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#8cc63f]/50"
                >
                <span className="mr-2">Back to Home</span>
                <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                </Link>
            </div>
            </div>
        </div>
        </>
    );
};

export default Error;