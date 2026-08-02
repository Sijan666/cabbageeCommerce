import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";
import Container from "../Container";
import Images from "../Images";

const Contact = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products/category/groceries");
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
        setCurrentProduct(fetchedProducts[Math.floor(Math.random() * fetchedProducts.length)]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * products.length);
        setCurrentProduct(products[randomIndex]);
        setIsFading(false);
      }, 600);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [products]);

  return (
    <div className="bg-[url('/src/assets/video.png')] bg-no-repeat bg-center bg-cover relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#F9FBF5]/85 backdrop-blur-md z-0"></div>
      <Container className="relative z-10 px-4 lg:px-0">
        <div className="relative w-full rounded-[2.5rem] bg-white/70 border border-white p-8 md:p-12 lg:p-20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* decorative orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#80B500]/15 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#80B500]/10 rounded-full blur-[120px] pointer-events-none"></div>
          {currentProduct ? (
            <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 ease-in-out ${isFading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
              {/* left Side */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                {/* badge */}
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#80B500]/10 border border-[#80B500]/20 text-[#80B500] font-nuni font-bold tracking-[0.2em] text-xs mb-6 uppercase cursor-default">
                  <span className="w-2 h-2 rounded-full bg-[#80B500] mr-2 animate-pulse"></span>
                  Product of the Minute
                </div>
                {/* title */}
                <h3 className="text-[36px] md:text-[50px] lg:text-[60px] text-[#232323] font-extrabold font-int leading-[1.1] mb-4 tracking-tight capitalize">
                  {currentProduct.title}
                </h3>
                {/* price */}
                <div className="text-[#80B500] text-3xl md:text-5xl font-black font-int mb-6 flex items-center gap-2">
                  <span className="text-2xl text-[#546375]/50 font-medium line-through mr-2">
                    ${(currentProduct.price + 10).toFixed(2)}
                  </span>
                  ${currentProduct.price.toFixed(2)}
                </div>
                {/* description */}
                <p className="text-[#546375] text-base md:text-lg font-nuni max-w-120 leading-relaxed mb-10">
                  {currentProduct.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">            
                  <div className="cursor-pointer w-full sm:w-auto">
                    <Button btnText={"Shop Now"} />
                  </div>
                  {/* secondary button */}
                  <button className="cursor-pointer px-8 py-3.5 rounded-full text-[#232323] font-bold font-int text-sm border border-[#232323]/20 hover:bg-[#232323] hover:text-white transition-colors duration-300 w-full sm:w-auto">
                    View Details
                  </button>
                </div>
              </div>
              {/* Right Side */}
              <div className="w-full lg:w-1/2 flex justify-center relative z-10">
                <div className="relative w-75 h-75 md:w-112.5 md:h-112.5 flex justify-center items-center">
                  <div className="absolute inset-0 bg-linear-to-tr from-[#80B500]/20 to-transparent rounded-full blur-[80px] pointer-events-none"></div>
                  {/* Image */}
                  <Images 
                    imgSrc={currentProduct.thumbnail} 
                    className="cursor-pointer w-full h-full object-contain relative z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-opacity duration-700" 
                    alt={currentProduct.title}
                  />
                </div>
              </div>
            </div>
          ) : (
            // loading spinner
            <div className="flex justify-center items-center h-100">
              <div className="relative flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#80B500] rounded-full animate-spin"></div>
                <div className="absolute w-8 h-8 bg-[#80B500]/20 rounded-full blur-md animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Contact;