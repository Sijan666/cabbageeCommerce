import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Deal from "/src/assets/deal.png";

const Deals = () => {
  return (
    <div className="bg-[#F7F5EB] my-16 lg:my-30">
      <Container className="px-4 lg:px-0">
        <Flex className={"flex-col lg:flex-row items-center lg:items-start text-center lg:text-left pt-10 lg:pt-[60px] pb-10 lg:pb-[30px] gap-y-10 lg:gap-y-0 lg:gap-x-[105px]"}>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Images imgSrc={Deal} className="max-w-full h-auto object-contain" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <p className="text-[#80B500] font-nuni font-bold text-sm md:text-base">
              Todays Hot Deals
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-[50px] text-[#232323] font-bold font-int w-full max-w-[515px] leading-tight lg:leading-[60px] pt-2 pb-4 lg:pb-5">
              Original Stock Honey Combo Package
            </h3>
            <p className="text-sm md:text-base text-[#546375] font-nuni w-full max-w-[410px]">
              Cur tantas regiones barbarorum obiit, tot maria transmist summo
              bono fruitur id est voluptate barbarorum
            </p>
            <Flex className={"pt-6 pb-7.5 gap-x-4 sm:gap-x-8 justify-center lg:justify-start"}>
              <div className="flex flex-col items-center">
                <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    02
                  </p>
                </div>
                <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                  Days
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    14
                  </p>
                </div>
                <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                  Hours
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    42
                  </p>
                </div>
                <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                  Minutes
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[16px] md:text-[18px] font-bold font-nuni w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors duration-300 cursor-pointer">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    59
                  </p>
                </div>
                <p className="pt-2 text-xs md:text-sm text-[#223645] font-int">
                  Seconds
                </p>
              </div>
            </Flex>
            <Flex className={"gap-x-4 items-center flex-col sm:flex-row gap-y-4 sm:gap-y-0"}>
              <Button btnText={"Shop Now"} className="w-full sm:w-auto" />
              <u className="text-[#80B500] text-sm md:text-base font-bold font-nuni cursor-pointer hover:text-[#6a9600] transition-colors">
                Deal of The Day
              </u>
            </Flex>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Deals;