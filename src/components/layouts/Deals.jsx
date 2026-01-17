import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Deal from "/src/assets/deal.png";

const Deals = () => {
  return (
    <div className="bg-[#F7F5EB] my-30">
      <Container>
        <Flex className={"pt-[60px] pb-[30px] gap-x-[105px]"}>
          <Images imgSrc={Deal} />
          <div className="">
            <p className="text-[#80B500] font-nuni font-bold text-base ">
              Todays Hot Deals
            </p>
            <h3 className="text-[50px] text-[#232323] font-bold font-int w-[515px] leading-[60px] pt-1.5 pb-5">
              Original Stock Honey Combo Package
            </h3>
            <p className="text-base text-[#546375] font-nuni w-[410px]">
              Cur tantas regiones barbarorum obiit, tot maria transmist summo
              bono fruitur id est voluptate barbarorum
            </p>
            <Flex className={"pt-6 pb-7.5 gap-x-8"}>
              <div className="">
                <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[18px] font-bold font-nuni w-14 h-14 rounded-full">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    02
                  </p>
                </div>
                <p className="pt-2 text-sm text-[#223645] font-int  pl-2.5">
                  Days
                </p>
              </div>
              <div className="">
                <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[18px] font-bold font-nuni w-14 h-14 rounded-full">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    14
                  </p>
                </div>
                <p className="pt-2 text-sm text-[#223645] font-int pl-1">
                  Houres
                </p>
              </div>
              <div className="">
                <div className="text-[#80B500] relative hover:text-white hover:bg-[#80B500] bg-white text-[18px] font-bold font-nuni w-14 h-14 rounded-full">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    42
                  </p>
                </div>
                <p className="pt-2 text-sm text-[#223645] font-int  pl-1.5">
                  Minutes
                </p>
              </div>
              <div className="w-[65px]">
                <div className="relative text-[#80B500] hover:text-white hover:bg-[#80B500] bg-white text-[18px] font-bold font-nuni  w-14 h-14 rounded-full">
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    59
                  </p>
                </div>
                <p className="pt-2 text-sm text-[#223645] font-int ">
                  Seconds
                </p>
              </div>
            </Flex>
            <Flex className={"gap-x-4"}>
              <Button btnText={"Shop Now"} />
              <u className="text-[#80B500] text-base font-bold font-nuni">
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
