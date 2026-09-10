import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import { useStore } from "../../store/useStore";
import Fac1 from "/src/assets/fac1.png";
import Fac2 from "/src/assets/fac2.png";
import Fac3 from "/src/assets/fac3.png";
import Fac4 from "/src/assets/fac4.png";
import Fac5 from "/src/assets/fac5.png";
import Fac6 from "/src/assets/fac6.png";

const ProductSpotlight = () => {
  const { currency, exchangeRates } = useStore();
  const [productsList, setProductsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // dynamic price formatter
  const formatPrice = (price) => {
    const converted = price * exchangeRates[currency];
    if (currency === 'BDT') return `৳${converted.toFixed(0)}`;
    if (currency === 'EUR') return `€${converted.toFixed(2)}`;
    if (currency === 'INR') return `₹${converted.toFixed(0)}`;
    return `$${converted.toFixed(2)}`;
  };

  // fetch center products
  useEffect(() => {
    const fetchCenterProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://dummyjson.com/products/category/groceries");
        setProductsList(response.data.products);
      } catch (error) {
        console.error("data not found", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCenterProducts();
  }, []);

  // auto slide interval
  useEffect(() => {
    if (productsList.length === 0) return;

    const intervalId = setInterval(() => {
      setIsFading(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % productsList.length);
        setIsFading(false);
      }, 500);
      
    }, 60000);

    return () => clearInterval(intervalId);
  }, [productsList]);

  const product = productsList[currentIndex];

  // generate slug
  const productSlug = product?.title 
    ? product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
    : '';

  // left features
  const leftFeatures = product ? [
    { 
      img: Fac1, 
      title: "Premium Quality", 
      desc: product.description.length > 55 ? product.description.slice(0, 55) + "..." : product.description 
    },
    { 
      img: Fac2, 
      title: "Highly Rated", 
      desc: `Customers love this! Rated ${product.rating} out of 5 stars.` 
    },
    { 
      img: Fac3, 
      title: "Stock Status", 
      desc: `Currently ${product.availabilityStatus || 'in stock'} with ${product.stock} units.` 
    },
  ] : [];

  // right features
  const rightFeatures = product ? [
    { 
      img: Fac4, 
      title: "Fast Shipping", 
      desc: `${product.shippingInformation || 'Ships within 1-2 business days'}.` 
    },
    { 
      img: Fac5, 
      title: "Special Offer", 
      desc: `Get it now and enjoy ${product.discountPercentage}% off the retail price.` 
    },
    { 
      img: Fac6, 
      title: "Buyer Protection", 
      desc: `${product.returnPolicy || '30 days return policy'} - shop with confidence.` 
    },
  ] : [];

  return (
    <div className="mt-12 md:mt-20 lg:mt-25 mb-12 md:mb-16 lg:mb-24 overflow-hidden" aria-label="Product Spotlight">
      <Container className="px-4 md:px-8 xl:px-0">
        {/* header */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#232323] font-int relative inline-block">
            Product Spotlight
            <span className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 bg-[#80B500] rounded-full" aria-hidden="true"></span>
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-[#546375] font-nuni mt-4 sm:mt-6 max-w-2xl mx-auto px-2">
            Discover the amazing features and benefits of our top-picked product for the day.
          </p>
        </div>
        
        {/* content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-75 sm:h-100" role="status" aria-label="loading product spotlight">
              <div className="w-10 h-10 sm:w-14 sm:h-14 border-4 border-[#F4F9EB] border-t-[#80B500] rounded-full animate-spin"></div>
          </div>
        ) : product ? (
          <Flex className={`flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-y-12 lg:gap-y-0 lg:gap-x-4 xl:gap-x-8 transition-all duration-500 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {/* left features */}
            <div className="w-full lg:w-1/3 grid grid-cols-2 lg:grid-cols-1 gap-x-3 gap-y-6 sm:gap-6 lg:gap-y-14">
              {leftFeatures.map((item, index) => (
                <div 
                  key={index} 
                  className={`group flex flex-col lg:flex-row-reverse items-center text-center lg:text-right gap-y-2.5 lg:gap-y-0 lg:gap-x-5 
                    ${index === 2 ? 'col-span-2 lg:col-span-1 max-w-50 lg:max-w-none mx-auto lg:mx-0' : ''}`}
                >
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-17.5 lg:h-17.5 bg-[#F4F9EB] group-hover:bg-[#80B500] transition-colors duration-500 rounded-full flex justify-center items-center shadow-sm">
                    <Images imgSrc={item.img} alt="" aria-hidden="true" className="w-7 sm:w-8 lg:w-10 object-contain group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                  </div>
                  <div className="w-full">
                    <h5 className="text-[#223645] text-[13px] sm:text-base lg:text-[22px] font-bold font-int group-hover:text-[#80B500] transition-colors duration-300">
                      {item.title}
                    </h5>
                    <p className="text-[#666E77] text-[10px] sm:text-xs lg:text-base font-nuni w-full lg:max-w-65 mt-1 sm:mt-1.5 lg:mt-2 leading-relaxed mx-auto lg:ml-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* api product */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center order-first lg:order-0 mb-2 lg:mb-0 relative group shrink-0">
              <div className="text-center w-full max-w-70 xs:max-w-[320px] sm:max-w-90 lg:max-w-87.5 mx-auto">
                <Link to={`/product/${productSlug}`} className="block" aria-label={`view details for ${product.title}`}>
                  <div className="relative bg-white rounded-full w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 mx-auto flex justify-center items-center p-4 sm:p-6 border-4 border-[#F4F9EB] shadow-[0_10px_40px_-10px_rgba(128,181,0,0.2)] group-hover:border-[#80B500] transition-colors duration-500 cursor-pointer">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[#80B500] text-white font-bold font-nuni px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full shadow-md transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </Link>
                <div className="mt-6 sm:mt-8 px-2">
                  <p className="text-[#80B500] font-nuni font-bold text-xs sm:text-sm tracking-widest uppercase mb-1.5 sm:mb-2">
                    {product.brand ? `${product.brand} - ` : ''}{product.category.replace('-', ' ')}
                  </p>
                  <h4 className="text-xl sm:text-[24px] font-int font-bold text-[#232323] line-clamp-1">
                    <Link to={`/product/${productSlug}`} className="hover:text-[#80B500] transition-colors">
                      {product.title}
                    </Link>
                  </h4>
                  <Link to={`/product/${productSlug}`} className="inline-block mt-4 sm:mt-5 bg-transparent hover:bg-[#80B500] text-[#232323] hover:text-white border-2 border-[#232323] hover:border-[#80B500] font-nuni font-bold text-[13px] sm:text-base py-2 px-6 sm:py-2.5 sm:px-8 rounded-full transition-all duration-300 cursor-pointer">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            {/* right features */}
            <div className="w-full lg:w-1/3 grid grid-cols-2 lg:grid-cols-1 gap-x-3 gap-y-6 sm:gap-6 lg:gap-y-14 mt-4 lg:mt-0">
              {rightFeatures.map((item, index) => (
                <div 
                  key={index} 
                  className={`group flex flex-col lg:flex-row items-center text-center lg:text-left gap-y-2.5 lg:gap-y-0 lg:gap-x-5 
                    ${index === 2 ? 'col-span-2 lg:col-span-1 max-w-50 lg:max-w-none mx-auto lg:mx-0' : ''}`}
                >
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-17.5 lg:h-17.5 bg-[#F4F9EB] group-hover:bg-[#80B500] transition-colors duration-500 rounded-full flex justify-center items-center shadow-sm">
                    <Images imgSrc={item.img} alt="" aria-hidden="true" className="w-7 sm:w-8 lg:w-10 object-contain group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                  </div>
                  <div className="w-full">
                    <h5 className="text-[#223645] text-[13px] sm:text-base lg:text-[22px] font-bold font-int group-hover:text-[#80B500] transition-colors duration-300">
                      {item.title}
                    </h5>
                    <p className="text-[#666E77] text-[10px] sm:text-xs lg:text-base font-nuni w-full lg:max-w-65 mt-1 sm:mt-1.5 lg:mt-2 leading-relaxed mx-auto lg:mx-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Flex>
        ) : null}
      </Container>
    </div>
  );
};

export default ProductSpotlight;