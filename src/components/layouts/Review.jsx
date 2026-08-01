import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";

const StarIcon = ({ filled }) => (
  <svg className={`w-4 h-4 md:w-5 md:h-5 ${filled ? 'text-[#FFB800]' : 'text-gray-200'} transition-colors duration-300`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Review = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [activeWeight, setActiveWeight] = useState("250g");
  const weightMultipliers = {
    "250g": 1,
    "500g": 1.8,
    "1kg": 3.5,
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products/category/beauty?limit=10");
        const products = response.data.products;
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        setProduct(randomProduct);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product review data:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => count > 1 && setCount(count - 1);

  const basePrice = product?.price || 0;
  const currentMultiplier = weightMultipliers[activeWeight];
  const displayPrice = (basePrice * currentMultiplier).toFixed(2);
  const originalPrice = ((basePrice * currentMultiplier) * 1.2).toFixed(2); 

  return (
    <div className="bg-[#F7F5EB] py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-white opacity-40 blur-[120px] rounded-full pointer-events-none"></div>
      <Container className="px-4 lg:px-0 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#80B500] rounded-full animate-spin"></div>
          </div>
        ) : (
          <Flex className={"flex-col lg:flex-row justify-between items-center gap-y-12 lg:gap-y-0 lg:gap-x-16"}>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-125">
                <div className="absolute inset-0 bg-white/60 rounded-3xl blur-xl transition-all duration-500"></div>
                <div className="bg-white/80 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white relative flex justify-center items-center overflow-hidden min-h-87.5">
                  <div className="absolute top-6 left-6 bg-[#80B500] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                    -{Math.round(product?.discountPercentage || 0)}%
                  </div>
                  <Images 
                    imgSrc={product?.thumbnail} 
                    alt={product?.title}
                    className="w-full max-w-70 md:max-w-[320px] object-contain drop-shadow-2xl mx-auto" 
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left pt-4">
              <Flex className="items-center gap-4 mb-3">
                <span className="text-[#80B500] bg-[#80B500]/10 px-3 py-1 rounded-full text-xs font-nuni font-bold uppercase tracking-widest cursor-default">
                  {product?.category?.replace('-', ' ')}
                </span>
                <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 cursor-default">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                  In Stock ({product?.stock})
                </span>
              </Flex>
              <h3 className="text-[#232323] text-[32px] md:text-[46px] font-extrabold font-int pb-3 leading-[1.1] capitalize">
                {product?.title}
              </h3>
              <Flex className="items-center gap-2 pb-5">
                <Flex className="gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= Math.round(product?.rating || 0)} />
                  ))}
                </Flex>
                <span className="text-sm font-nuni text-gray-500 cursor-default">
                  ({product?.reviews?.length || 12} Customer Reviews)
                </span>
              </Flex>
              <div className="flex items-end gap-3 pb-6 border-b border-gray-200 w-full cursor-default">
                <p className="text-[28px] md:text-[36px] text-[#80B500] font-extrabold font-nuni leading-none">
                  ${displayPrice}
                </p>
                <p className="text-[16px] md:text-[20px] text-gray-400 font-bold font-nuni line-through mb-1">
                  ${originalPrice}
                </p>
              </div>
              <p className="w-full lg:w-[90%] leading-relaxed font-nuni text-base text-[#546375] py-6 cursor-default">
                {product?.description} Elevate your daily routine with this premium quality formula, designed for maximum efficiency and long-lasting results.
              </p>
              <div className="pb-8 w-full">
                <p className="text-sm mr-3 font-bold font-int text-[#232323] mb-3 cursor-default">SELECT WEIGHT:</p>
                <Flex className="gap-3">
                  {Object.keys(weightMultipliers).map((weight) => (
                    <div 
                      key={weight}
                      onClick={() => setActiveWeight(weight)}
                      className={`relative px-6 py-2.5 font-nuni text-sm font-bold cursor-pointer transition-all duration-300 rounded-md border-2 overflow-hidden
                        ${activeWeight === weight 
                          ? "border-[#80B500] text-[#80B500] bg-white shadow-sm" 
                          : "border-transparent bg-white text-gray-500 hover:border-gray-300 shadow-sm"
                      }`}
                    >
                      {activeWeight === weight && (
                        <div className="absolute top-0 left-0 w-full h-0.75 bg-[#80B500]"></div>
                      )}
                      {weight}
                    </div>
                  ))}
                </Flex>
              </div>
              <Flex className="items-center flex-wrap gap-4 w-full">
                <Flex className="items-center bg-white rounded-md shadow-sm border border-gray-200 h-12.5">
                  <button 
                    onClick={handleDecrement} 
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors rounded-l-md font-bold text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <div className="w-12 h-full flex items-center justify-center text-[#232323] font-nuni text-[16px] font-bold border-x border-gray-100 cursor-default">
                    {count}
                  </div>
                  <button 
                    onClick={handleIncrement} 
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[#80B500] hover:bg-gray-50 transition-colors rounded-r-md font-bold text-lg cursor-pointer"
                  >
                    +
                  </button>
                </Flex>
                <button className="h-12.5 bg-[#80B500] hover:bg-[#6c9a00] text-white px-8 rounded-md font-bold font-nuni text-base transition-all duration-300 shadow-[0_10px_20px_rgba(128,181,0,0.2)] hover:shadow-[0_10px_25px_rgba(128,181,0,0.35)] hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  ADD TO CART
                </button>
              </Flex>
            </div>
          </Flex>
        )}
      </Container>
    </div>
  );
};

export default Review;