import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import One from "/src/assets/vegOne.png";
import Two from "/src/assets/vegTwo.png";
import Thr from "/src/assets/vegThr.png";
import For from "/src/assets/vegFor.png";

const CompLogo = () => {
  return (
    <div className="lg:relative">
      <Container className="bg-white lg:px-[110px] py-12 shadow-blog w-full lg:absolute lg:-bottom-18 lg:left-1/2 lg:-translate-x-1/2">
        <div className={"flex flex-col lg:flex-row items-center gap-y-10 lg:justify-between px-3 lg:px-0"}>
          <Flex className={"gap-x-3.5"}>
            <Images imgSrc={One} />
            <div className="">
              <h5 className="text-[#223645] text-[18px] font-int font-bold pb-2">
                Curated Products
              </h5>
              <p className="text-[#666E77] text-[12px] font-nuni">
                From handpicked sellers
              </p>
            </div>
          </Flex>
          <Flex className={"gap-x-3.5"}>
            <Images imgSrc={Two} />
            <div className="">
              <h5 className="text-[#223645] text-[18px] font-int font-bold pb-2">
                Handmade
              </h5>
              <p className="text-[#666E77] text-[12px] font-nuni">
                From handpicked sellers
              </p>
            </div>
          </Flex>
          <Flex className={"gap-x-3.5"}>
            <Images imgSrc={Thr} />
            <div className="">
              <h5 className="text-[#223645] text-[18px] font-int font-bold pb-2">
                100% Natural
              </h5>
              <p className="text-[#666E77] text-[12px] font-nuni">
                From handpicked sellers
              </p>
            </div>
          </Flex>
          <Flex className={"gap-x-3.5"}>
            <Images imgSrc={For} />
            <div className="">
              <h5 className="text-[#223645] text-[18px] font-int font-bold pb-2">
                Shipping
              </h5>
              <p className="text-[#666E77] text-[12px] font-nuni">
                From handpicked sellers
              </p>
            </div>
          </Flex>
        </div>
      </Container>
    </div>
  );
};

export default CompLogo;
