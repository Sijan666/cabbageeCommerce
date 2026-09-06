import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import { useStore } from "../../store/useStore";

const DailyDeals = () => {
  const { currency, exchangeRates, customProducts } = useStore();
  const [dealProduct, setDealProduct] = useState(null);
  const [allDeals, setAllDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem('dealCurrentIndex');
    return savedIndex ? Number(savedIndex) : 0;
  });

  // countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // dynamic price formatter
  const formatPrice = (price) => {
    const converted = price * exchangeRates[currency];
    if (currency === 'BDT') return `৳${converted.toFixed(0)}`;
    if (currency === 'EUR') return `€${converted.toFixed(2)}`;
    if (currency === 'INR') return `₹${converted.toFixed(0)}`;
    return `$${converted.toFixed(2)}`;
  };

  // fetch products combining api and custom products
  useEffect(() => {
    async function fetchDealProducts() {
      try {
        setIsLoading(true);
        const response = await axios.get("https://dummyjson.com/products?limit=30");
        const apiProducts = response.data.products || [];
        // format admin custom products
        const formattedCustom = customProducts
          .filter(p => !p.isDeleted)
          .map(p => ({
            id: `custom-${p.id}`,
            title: p.title,
            description: p.desc || "",
            price: parseFloat(p.price) || 0,
            discountPercentage: parseFloat(p.discountPercentage) || 15,
            thumbnail: p.image,
          }));
        // combine and filter products with discounts
        const combined = [...formattedCustom, ...apiProducts];
        setAllDeals(combined);
        if (combined.length > 0) {
          const validIndex = currentIndex % combined.length;
          setDealProduct(combined[validIndex]);
        }
      } catch (error) {
        console.error("Deal products not found", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDealProducts();
  }, [customProducts, currentIndex]);

  useEffect(() => {
    const getTargetTime = () => {
      const savedTarget = localStorage.getItem('dealTargetTime');
      const now = new Date().getTime();

      if (savedTarget && Number(savedTarget) > now) {
        return Number(savedTarget);
      } else {
        const newTarget = now + 24 * 60 * 60 * 1000;
        localStorage.setItem('dealTargetTime', newTarget);
        return newTarget;
      }
    };

    let targetTime = getTargetTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else if (allDeals.length > 0) {
        const nextIndex = (currentIndex + 1) % allDeals.length;
        setCurrentIndex(nextIndex);
        localStorage.setItem('dealCurrentIndex', nextIndex);
        const freshTarget = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('dealTargetTime', freshTarget);
        targetTime = freshTarget;
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, allDeals.length]);

  const formatTime = (time) => String(time).padStart(2, '0');
  const productSlug = dealProduct?.title 
    ? dealProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') 
    : '';

  return (
    <div className="bg-[#F7F5EB] my-16 lg:my-30">
      <Container className="px-4 lg:px-0">
        {isLoading || !dealProduct ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#80B500] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Flex className={"flex-col lg:flex-row items-center lg:items-start text-center lg:text-left pt-10 lg:pt-15 pb-10 lg:pb-7.5 gap-y-10 lg:gap-y-0 lg:gap-x-26.25"}>
            {/* left side */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <Images 
                imgSrc={dealProduct?.thumbnail || ""} 
                className="max-w-full h-87.5 md:h-105 object-contain mix-blend-multiply drop-shadow-md transition-all duration-500" 
              />
            </div>
            {/* right side */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
              <p className="text-[#80B500] font-nuni font-bold text-sm md:text-base">
                Todays Hot Deals
              </p>
              {/* product title */}
              <h3 className="text-3xl md:text-4xl lg:text-[42px] text-[#232323] font-bold font-int w-full max-w-128.75 leading-tight lg:leading-13 pt-2 pb-4 lg:pb-5">
                {dealProduct?.title || "Original Stock Honey Combo Package"}
              </h3>
              {/* product description */}
              <p className="text-sm md:text-base text-[#546375] font-nuni w-full max-w-102.5 line-clamp-3">
                {dealProduct?.description || "Cur tantas regiones barbarorum obiit, tot maria transmist summo bono fruitur id est voluptate barbarorum"}
              </p>
              {/* countdown timer */}
              <Flex className={"pt-6 pb-7.5 gap-x-4 sm:gap-x-8 justify-center lg:justify-start"}>
                <div className="flex flex-col items-center">
                  <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer shadow-sm">
                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                      {formatTime(timeLeft.days)}
                    </p>
                  </div>
                  <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                    Days
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer shadow-sm">
                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                      {formatTime(timeLeft.hours)}
                    </p>
                  </div>
                  <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                    Hours
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer shadow-sm">
                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                      {formatTime(timeLeft.minutes)}
                    </p>
                  </div>
                  <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                    Minutes
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer shadow-sm">
                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                      {formatTime(timeLeft.seconds)}
                    </p>
                  </div>
                  <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                    Seconds
                  </p>
                </div>
              </Flex>
              <Flex className={"gap-x-4 items-center flex-col sm:flex-row gap-y-4 sm:gap-y-0"}>
                <Link to={`/product/${productSlug}`} className="w-full sm:w-auto block">
                  <Button btnText={"Shop Now"} className="w-full sm:w-auto cursor-pointer" />
                </Link>
                <Link to={`/product/${productSlug}`}>
                  <u className="text-[#80B500] text-sm md:text-base font-bold font-nuni cursor-pointer hover:text-[#6a9600] transition-colors">
                    Deal of The Day ({formatPrice(dealProduct?.price || 32.00)})
                  </u>
                </Link>
              </Flex>
            </div>
          </Flex>
        )}
      </Container>
    </div>
  );
};

export default DailyDeals;