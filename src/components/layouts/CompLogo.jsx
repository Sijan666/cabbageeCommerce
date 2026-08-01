import React from "react";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import One from "/src/assets/vegOne.png";
import Two from "/src/assets/vegTwo.png";
import Thr from "/src/assets/vegThr.png";
import For from "/src/assets/vegFor.png";

const CompLogo = () => {
  const features = [
    {
      id: 1,
      img: One,
      title: "Curated Products",
      desc: "From handpicked sellers",
    },
    {
      id: 2,
      img: Two,
      title: "Handmade",
      desc: "Crafted with love & care",
    },
    {
      id: 3,
      img: Thr,
      title: "100% Natural",
      desc: "No synthetic additives",
    },
    {
      id: 4,
      img: For,
      title: "Fast Shipping",
      desc: "Safe & secure delivery",
    },
  ];

  return (
    <div className="lg:relative z-20">
      {/* Banner */}
      <Container className="bg-white lg:px-12 xl:px-27.5 py-10 lg:py-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 rounded-2xl w-full lg:absolute lg:-bottom-18 lg:left-1/2 lg:-translate-x-1/2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 px-4 lg:px-0">
          {features.map((feature) => (
            <Flex key={feature.id} className="items-center gap-x-4 lg:justify-center group cursor-pointer">
              <div className="w-14 h-14 shrink-0 bg-[#F9FBF5] rounded-full flex justify-center items-center group-hover:bg-[#80B500]/10 transition-colors duration-300">
                <Images imgSrc={feature.img} className="w-8 h-8 object-contain" />
              </div>
              {/* Text */}
              <div>
                <h5 className="text-[#232323] text-[18px] font-int font-bold pb-1 group-hover:text-[#80B500] transition-colors duration-300">
                  {feature.title}
                </h5>
                <p className="text-[#546375] text-[13px] font-nuni">
                  {feature.desc}
                </p>
              </div>
            </Flex>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CompLogo;