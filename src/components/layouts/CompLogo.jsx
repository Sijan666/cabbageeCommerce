import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import One from "/src/assets/vegOne.png";
import Two from "/src/assets/vegTwo.png";
import Thr from "/src/assets/vegThr.png";
import For from "/src/assets/vegFor.png";

const CompLogo = () => {
  return (
    <div className="relative">
      <Container className="bg-white px-[110px] py-12 shadow-blog w-full absolute -bottom-18 left-1/2 -translate-x-1/2">
        <Flex className={"justify-between"}>
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
        </Flex>
      </Container>
    </div>
  );
};

export default CompLogo;
