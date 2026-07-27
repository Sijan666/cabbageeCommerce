import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";

import Fac1 from "/src/assets/fac1.png";
import Fac2 from "/src/assets/fac2.png";
import Fac3 from "/src/assets/fac3.png";
import Fac4 from "/src/assets/fac4.png";
import Fac5 from "/src/assets/fac5.png";
import Fac6 from "/src/assets/fac6.png";

const Faciliti = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCenterProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://dummyjson.com/products/category/groceries?limit=1");
        setProduct(response.data.products[0]);
      } catch (error) {
        console.error("Data not found", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCenterProduct();
  }, []);

  const leftFeatures = product ? [
    { 
      img: Fac1, 
      title: "Premium Quality", 
      desc: product.description.length > 55 ? product.description.slice(0, 55) + "..." : product.description 
    },
    { 
      img: Fac2, 
      title: "Highly Rated", 
      desc: `Customers love this! Rated ${product.rating} out of 5 stars by verified buyers.` 
    },
    { 
      img: Fac3, 
      title: "Stock Status", 
      desc: `Currently ${product.availabilityStatus || 'in stock'} with ${product.stock} units available.` 
    },
  ] : [];

  const rightFeatures = product ? [
    { 
      img: Fac4, 
      title: "Fast Shipping", 
      desc: `${product.shippingInformation || 'Ships within 1-2 business days'} directly to your door.` 
    },
    { 
      img: Fac5, 
      title: "Special Offer", 
      desc: `Get it now and enjoy ${product.discountPercentage}% off the regular retail price.` 
    },
    { 
      img: Fac6, 
      title: "Buyer Protection", 
      desc: `${product.returnPolicy || '30 days return policy'} - shop with full confidence.` 
    },
  ] : [];

  return (
    <div className="mt-20 lg:mt-60 mb-16 lg:mb-24 overflow-hidden">
      <Container className="px-4 md:px-8 lg:px-0">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h3 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#232323] font-int relative inline-block">
            Product Spotlight
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#80B500] rounded-full"></span>
          </h3>
          <p className="text-sm md:text-base text-[#546375] font-nuni mt-6 max-w-2xl mx-auto">
            Discover the amazing features and benefits of our top-picked product for the day.
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
              <div className="w-14 h-14 border-4 border-[#F4F9EB] border-t-[#80B500] rounded-full animate-spin"></div>
          </div>
        ) : product ? (
          <Flex className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-y-16 lg:gap-y-0 lg:gap-x-8">
            {/* Left */}
            <div className="w-full lg:w-1/3 flex flex-col gap-y-10 md:gap-y-14">
              {leftFeatures.map((item, index) => (
                <Flex key={index} className="group flex-col sm:flex-row-reverse items-center sm:items-start text-center sm:text-right gap-y-4 sm:gap-y-0 sm:gap-x-5 cursor-pointer">
                  <div className="shrink-0 w-[70px] h-[70px] bg-[#F4F9EB] group-hover:bg-[#80B500] transition-colors duration-500 rounded-full flex justify-center items-center shadow-sm">
                    <Images imgSrc={item.img} className="w-10 object-contain group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                  </div>
                  <div className="w-full sm:pt-1">
                    <h5 className="text-[#223645] text-xl md:text-[22px] font-bold font-int group-hover:text-[#80B500] transition-colors duration-300">
                      {item.title}
                    </h5>
                    <p className="text-[#666E77] text-sm md:text-base font-nuni w-full sm:max-w-[260px] mt-2 leading-relaxed sm:ml-auto">
                      {item.desc}
                    </p>
                  </div>
                </Flex>
              ))}
            </div>
            {/* API Product */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center order-first lg:order-0 mb-12 lg:mb-0 relative group">
              <div className="text-center w-full max-w-[350px]">
                <div className="relative bg-white rounded-full w-[280px] h-[280px] sm:w-[320px] sm:h-80 mx-auto flex justify-center items-center p-6 border-4 border-[#F4F9EB] shadow-[0_10px_40px_-10px_rgba(128,181,0,0.2)] group-hover:border-[#80B500] transition-colors duration-500">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" 
                  />
                  {/* price badge */}
                  <div className="absolute top-4 right-4 bg-[#80B500] text-white font-bold font-nuni px-4 py-2 rounded-full shadow-md transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    ${product.price}
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-[#80B500] font-nuni font-bold text-sm tracking-widest uppercase mb-2">
                    {product.brand ? `${product.brand} - ` : ''}{product.category.replace('-', ' ')}
                  </p>
                  <h4 className="text-[24px] font-int font-bold text-[#232323] line-clamp-1">
                    {product.title}
                  </h4>
                  <button className="mt-5 bg-transparent hover:bg-[#80B500] text-[#232323] hover:text-white border-2 border-[#232323] hover:border-[#80B500] font-nuni font-bold py-2.5 px-8 rounded-full transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="w-full lg:w-1/3 flex flex-col gap-y-10 md:gap-y-14">
              {rightFeatures.map((item, index) => (
                <Flex key={index} className="group flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-y-4 sm:gap-y-0 sm:gap-x-5 cursor-pointer">
                  <div className="shrink-0 w-[70px] h-[70px] bg-[#F4F9EB] group-hover:bg-[#80B500] transition-colors duration-500 rounded-full flex justify-center items-center shadow-sm">
                    <Images imgSrc={item.img} className="w-10 object-contain group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                  </div>
                  <div className="w-full sm:pt-1">
                    <h5 className="text-[#223645] text-xl md:text-[22px] font-bold font-int group-hover:text-[#80B500] transition-colors duration-300">
                      {item.title}
                    </h5>
                    <p className="text-[#666E77] text-sm md:text-base font-nuni w-full sm:max-w-[260px] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Flex>
              ))}
            </div>
          </Flex>
        ) : null}
      </Container>
    </div>
  );
};

export default Faciliti;