import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";

const Deals = () => {
  const [dealProduct, setDealProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dealProductIds = [15, 18, 22, 25, 30];
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

  // fetch product
  useEffect(() => {
    async function fetchDealProduct() {
      try {
        setIsLoading(true);
        const currentId = dealProductIds[currentIndex];
        const response = await axios.get(`https://dummyjson.com/products/${currentId}`);
        setDealProduct(response.data);
      } catch (error) {
        console.error("Deal product not found", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDealProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

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
      } else {
        const nextIndex = (currentIndex + 1) % dealProductIds.length;
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
  }, [currentIndex, dealProductIds.length]);

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="bg-[#F7F5EB] my-16 lg:my-30">
      <Container className="px-4 lg:px-0">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#80B500] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Flex className={"flex-col lg:flex-row items-center lg:items-start text-center lg:text-left pt-10 lg:pt-[60px] pb-10 lg:pb-[30px] gap-y-10 lg:gap-y-0 lg:gap-x-[105px]"}>
            {/* left side: API product image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <Images 
                imgSrc={dealProduct?.thumbnail || ""} 
                className="max-w-full h-[350px] md:h-[420px] object-contain mix-blend-multiply drop-shadow-md transition-all duration-500" 
              />
            </div>
            {/* right side: product details & countdown */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
              <p className="text-[#80B500] font-nuni font-bold text-sm md:text-base">
                Todays Hot Deals
              </p>
              {/* product title */}
              <h3 className="text-3xl md:text-4xl lg:text-[42px] text-[#232323] font-bold font-int w-full max-w-[515px] leading-tight lg:leading-[52px] pt-2 pb-4 lg:pb-5">
                {dealProduct?.title || "Original Stock Honey Combo Package"}
              </h3>
              {/* product description */}
              <p className="text-sm md:text-base text-[#546375] font-nuni w-full max-w-[410px] line-clamp-3">
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
                <Button btnText={"Shop Now"} className="w-full sm:w-auto cursor-pointer" />
                <u className="text-[#80B500] text-sm md:text-base font-bold font-nuni cursor-pointer hover:text-[#6a9600] transition-colors">
                  Deal of The Day (${dealProduct?.price || "32.00"})
                </u>
              </Flex>
            </div>
          </Flex>
        )}
      </Container>
    </div>
  );
};

export default Deals;