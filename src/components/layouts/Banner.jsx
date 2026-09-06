import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Harb from "/src/assets/herb.png";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import gsap from "gsap";
import { useStore } from "../../store/useStore";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { currency, exchangeRates } = useStore();

  // dynamic price formatter
  const formatPrice = (price) => {
    const converted = price * exchangeRates[currency];
    if (currency === 'BDT') return `৳${converted.toFixed(0)}`;
    if (currency === 'EUR') return `€${converted.toFixed(2)}`;
    if (currency === 'INR') return `₹${converted.toFixed(0)}`;
    return `$${converted.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchPremiumBanners = async () => {
      try {
        setIsLoading(true);
        const catResponse = await axios.get("https://dummyjson.com/products/categories");
        const topCategories = catResponse.data.slice(0, 4); 
        const bannerPromises = topCategories.map(async (cat) => {
          try {
            const slug = cat.slug || cat;
            const name = cat.name || cat;
            const productRes = await axios.get(`https://dummyjson.com/products/category/${slug}?limit=1`);
            const product = productRes.data.products[0];
            return {
              slug: slug,
              name: name,
              image: product ? product.images[0] || product.thumbnail : "", 
              price: product ? product.price : 0,
              productName: product ? product.title : "Premium Collection"
            };
          } catch (innerError) {
            console.error(`Failed to fetch category: ${cat.name || cat}`, innerError.message);
            return null; 
          }
        });

        const completedBanners = await Promise.all(bannerPromises);
        const successfulBanners = completedBanners.filter(banner => banner !== null);
        setBannerData(successfulBanners);
      } catch (error) {
        console.error("Failed to fetch banner data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPremiumBanners();
  }, []);

  const handleRoute = (categorySlug) => { navigate(`/category/${categorySlug}`); };

  const animateActiveSlide = () => {
    gsap.killTweensOf(".hero-elem, .hero-image, .hero-watermark");
    gsap.set(".hero-elem", { y: 25, opacity: 0 });
    gsap.set(".hero-image", { opacity: 0, rotation: -2 }); 
    gsap.set(".hero-watermark", { opacity: 0 }); 
    gsap.to(".swiper-slide-active .hero-watermark", { opacity: 0.03, duration: 1.0, ease: "power2.out" });
    gsap.to(".swiper-slide-active .hero-elem", { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out", delay: 0.08 });
    gsap.to(".swiper-slide-active .hero-image", { opacity: 1, rotation: 0, duration: 0.75, ease: "power3.out", delay: 0.15 });
  };

  return (
    <div className="w-full bg-[#F9FAFB] overflow-hidden relative">
      {isLoading ? (
        <div className="w-full h-112.5 sm:h-137.5 lg:h-187.5 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#80B500] rounded-full animate-spin"></div>
        </div>
      ) : bannerData.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect={"fade"}
          loop={true}
          speed={700}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ type: "progressbar" }}
          style={{ "--swiper-pagination-color": "#80B500", "--swiper-pagination-progressbar-bg-color": "#EAEAEA", "--swiper-pagination-progressbar-size": "4px" }}
          className="w-full relative group"
          onInit={() => setTimeout(animateActiveSlide, 50)}
          onSlideChangeTransitionStart={animateActiveSlide}
        >
          {bannerData.map((data, index) => {
            const titleWords = data.productName.split(' ');
            const halfIndex = Math.ceil(titleWords.length / 2);
            const firstPart = titleWords.slice(0, halfIndex).join(' ');
            const secondPart = titleWords.slice(halfIndex).join(' ') || "Edition";

            return (
              <SwiperSlide key={index}>
                <div className="relative w-full min-h-137.5 sm:min-h-150 lg:h-187.5 flex items-center justify-center overflow-hidden bg-[#F9FAFB] py-12 lg:py-0">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
                    <h1 className="hero-watermark text-[25vw] sm:text-[20vw] font-black font-int text-gray-900 opacity-0 uppercase whitespace-nowrap tracking-tighter">
                      {data.name.replace('-', '')}
                    </h1>
                  </div>
                  <Container className="px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center">
                    <Flex className="flex-col-reverse lg:flex-row items-center justify-between gap-y-8 lg:gap-y-0 h-full">
                      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10">
                        <div className="hero-elem flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5 opacity-0">
                          <Images imgSrc={Harb} className="w-4 sm:w-5 lg:w-6 object-contain pb-1" />
                          <p className="text-[#80B500] text-xs sm:text-sm lg:text-base font-bold font-nuni uppercase tracking-[0.155em] sm:tracking-[0.2em]">
                            100% Genuine {data.name.replace('-', ' ')}
                          </p>
                        </div>
                        <h2 className="hero-elem opacity-0 text-[#232323] font-int font-extrabold text-3xl sm:text-5xl lg:text-[70px] xl:text-[80px] leading-[1.15] lg:leading-[1.1] tracking-tight mb-4 sm:mb-6 capitalize drop-shadow-sm">
                          <span className="block text-[#223645]">{firstPart}</span>
                          <span className="text-[#80B500]">{secondPart}</span>
                        </h2>
                        <p className="hero-elem opacity-0 text-[#546375] font-nuni text-sm sm:text-base lg:text-lg xl:text-xl max-w-md lg:max-w-lg mb-6 sm:mb-8 font-medium leading-relaxed px-4 lg:px-0">
                          Upgrade your lifestyle with our premium <span className="font-bold text-[#223645]">{data.productName}</span>. Starting from <span className="font-bold text-[#80B500] text-lg sm:text-xl lg:text-2xl">{formatPrice(data.price)}</span>
                        </p>
                        <div className="hero-elem opacity-0">
                          <button onClick={() => handleRoute(data.slug)} className="cursor-pointer group flex items-center justify-center gap-2 sm:gap-3 bg-[#80B500] hover:bg-[#223645] text-white px-7 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 rounded-full font-nuni text-xs sm:text-sm lg:text-base font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_10px_30px_rgba(128,181,0,0.3)] hover:-translate-y-1">
                            Explore Now
                            <HiOutlineArrowLongRight className="text-xl sm:text-2xl group-hover:translate-x-2 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 flex justify-center items-center relative h-62.5 sm:h-80 lg:h-full">
                        <div className="absolute w-50 h-50 sm:w-87.5 sm:h-87.5 lg:w-112.5 lg:h-112.5 bg-[#80B500] opacity-[0.04] rounded-full blur-[50px] lg:blur-[60px] pointer-events-none"></div>
                        <div onClick={() => handleRoute(data.slug)} className="hero-image opacity-0 relative z-10 w-[65%] sm:w-[70%] lg:w-[85%] lg:max-w-150 flex justify-center items-center cursor-pointer group">
                          <Images imgSrc={data.image} className="max-h-55 sm:max-h-75 md:max-h-95 lg:max-h-137.5 object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-500" />
                        </div>
                      </div>
                    </Flex>
                  </Container>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </div>
  );
};

export default Banner;