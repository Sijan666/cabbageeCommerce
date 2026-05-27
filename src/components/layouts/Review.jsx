import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Rev from "/src/assets/review.png";
import logo from "/src/assets/log.png";
import { useState } from "react";

const Review = () => {

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="bg-[#F7F5EB] py-10 md:py-16">
      <Container className="px-4 lg:px-0">
        <Flex className={"flex-col lg:flex-row justify-between items-center lg:items-start gap-y-10 lg:gap-y-0 lg:gap-x-10"}>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Images imgSrc={Rev} className="w-full max-w-[400px] lg:max-w-full object-contain" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-[#80B500] text-sm md:text-base font-nuni font-bold">
              Product Review
            </p>
            <h3 className="text-[#232323] text-[35px] md:text-[50px] font-bold font-int pt-1.5 pb-3 md:pb-4 leading-tight">
              Savon Herbal Oil
            </h3>
            <p className="text-[16px] md:text-[18px] text-[#80B500] font-bold font-nuni">
              $30.00 - $40.00
            </p>
            <Flex className={"py-3 gap-x-2 items-center"}>
              <p className="text-sm md:text-base text-[#232323] font-int">BRAND:</p>
              <div className="border border-[#D8D4D4] bg-white px-2 md:px-3 py-1.5 md:py-2">
                <Images imgSrc={logo} className="w-[60px] md:w-auto" />
              </div>
            </Flex>
            <p className="w-full lg:w-[500px] leading-6 font-nuni text-sm md:text-base text-[#546375]">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought
            </p>
            <Flex className={"pt-4 md:pt-5 pb-6 md:pb-8 items-center flex-wrap gap-y-3 justify-center lg:justify-start"}>
              <p className="text-sm md:text-base mr-2 md:mr-0">WEIGHT:</p>
              <div className="border border-[#D8D4D4] bg-white p-1.5 md:p-2 text-[#232323] font-nuni text-xs md:text-sm mx-1 md:ml-2 md:mr-2 cursor-pointer hover:border-[#80B500] transition-colors">
                1kg
              </div>
              <div className="border border-[#D8D4D4] bg-white p-1.5 md:p-2 text-[#232323] font-nuni text-xs md:text-sm mx-1 md:mr-1.5 cursor-pointer hover:border-[#80B500] transition-colors">
                5kg
              </div>
              <div className="border border-[#D8D4D4] bg-white p-1.5 md:p-2 text-[#232323] font-nuni text-xs md:text-sm mx-1 md:mx-0 cursor-pointer hover:border-[#80B500] transition-colors">
                250g
              </div>
            </Flex>
            <Flex className="items-center flex-wrap justify-center lg:justify-start gap-y-4">
              <Button btnText={"ADD TO CART"} className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base" />
              <div className="border ml-3 md:ml-3.5 mr-1 border-[#D8D4D4] bg-white px-3 md:px-4 py-2 md:py-2.5 text-[#232323] font-nuni text-[16px] md:text-[18px] font-bold">
                {count}
              </div>
              <div className="flex flex-col">
                <div onClick={handleIncrement} className="border border-[#D8D4D4] bg-white px-2 md:px-3 py-0.5 text-black font-nuni text-xs md:text-sm font-bold mb-1 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center">
                  +
                </div>
                <div onClick={handleDecrement} className="border border-[#D8D4D4] bg-white px-2 md:px-3 py-0.5 text-black font-nuni text-xs md:text-sm font-bold cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center">
                  -
                </div>
              </div>
            </Flex>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Review;