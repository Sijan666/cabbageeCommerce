import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Fac from "/src/assets/fac.png";
import Fac1 from "/src/assets/fac1.png";
import Fac2 from "/src/assets/fac2.png";
import Fac3 from "/src/assets/fac3.png";
import Fac4 from "/src/assets/fac4.png";
import Fac5 from "/src/assets/fac5.png";
import Fac6 from "/src/assets/fac6.png";

const Faciliti = () => {
  return (
    <div className="mt-75 mb-25">
      <Container>
        <div className="text-center mb-1">
          <h3 className="text-5xl font-bold text-[#232323] font-int">
            Product Facilities
          </h3>
          <p className="text-base text-[#546375] font-nuni mt-5">
            A highly efficient slip-ring scanner for today's diagnostic
            requirements.
          </p>
        </div>
        <Flex className={"justify-between"}>
          <div className="">
            <Flex className={"items-baseline"}>
              <Images imgSrc={Fac1} />
              <div className="-ml-3">
                <h5 className="text-[#223645] text-[22px] font-bold font-int">
                  Eat Healthy Food
                </h5>
                <p className="text-[#666E77] text-base font-nuni w-[236px] mt-3 leading-7">
                  Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                </p>
              </div>
            </Flex>
            <Flex className={"items-baseline my-12"}>
              <Images imgSrc={Fac2} />
              <div className="-ml-3">
                <h5 className="text-[#223645] text-[22px] font-bold font-int">
                  Pesticide Free
                </h5>
                <p className="text-[#666E77] text-base font-nuni w-[236px] mt-3 leading-7">
                  Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                </p>
              </div>
            </Flex>
            <Flex className={"items-baseline"}>
              <Images imgSrc={Fac3} />
              <div className="-ml-3">
                <h5 className="text-[#223645] text-[22px] font-bold font-int">
                  Sweet Exotic Food
                </h5>
                <p className="text-[#666E77] text-base font-nuni w-[236px] mt-3 leading-7">
                  Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                </p>
              </div>
            </Flex>
          </div>
          <Images imgSrc={Fac} />
          <div className="">
            <Flex className={"items-baseline"}>
              <Images imgSrc={Fac4} />
              <div className="-ml-3">
                <h5 className="text-[#223645] text-[22px] font-bold font-int">
                  Order Flexibility
                </h5>
                <p className="text-[#666E77] text-base font-nuni w-[236px] mt-3 leading-7">
                  Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                </p>
              </div>
            </Flex>
            <Flex className={"items-baseline my-12"}>
              <Images imgSrc={Fac5} />
              <div className="-ml-3">
                <h5 className="text-[#223645] text-[22px] font-bold font-int">
                  Variety & Selection
                </h5>
                <p className="text-[#666E77] text-base font-nuni w-[236px] mt-3 leading-7">
                  Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                </p>
              </div>
            </Flex>
            <Flex className={"items-baseline"}>
              <Images imgSrc={Fac6} />
              <div className="-ml-3">
                <h5 className="text-[#223645] text-[22px] font-bold font-int">
                  Livestock Product
                </h5>
                <p className="text-[#666E77] text-base font-nuni w-[236px] mt-3 leading-7">
                  Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                </p>
              </div>
            </Flex>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Faciliti;
