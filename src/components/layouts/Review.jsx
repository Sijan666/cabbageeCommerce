import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Rev from "/src/assets/review.png";
import logo from "/src/assets/log.png";

const Review = () => {
  return (
    <div className="bg-[#F7F5EB] py-6">
      <Container>
        <Flex className={"justify-between"}>
          <Images imgSrc={Rev} />
          <div className="">
            <p className="text-[#80B500] text-base font-nuni font-bold">
              Product Review
            </p>
            <h3 className="text-[#232323] text-[50px] font-bold font-int pt-1.5 pb-4">
              Savon Herbal Oil
            </h3>
            <p className="text-[18px] text-[#80B500] font-bold font-nuni">
              $30.00 - $40.00
            </p>
            <Flex className={"py-3 gap-x-1"}>
              <p className="text-base text-[#232323] font-int">BRAND:</p>
              <div className="border border-[#D8D4D4] bg-white px-3 py-2">
                <Images imgSrc={logo} />
              </div>
            </Flex>
            <p className="w-[500px] leading-6 font-nuni text-base text-[#546375]">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought
            </p>
            <Flex className={"pt-5 pb-8"}>
              <p>WEIGHT:</p>
              <div className="border border-[#D8D4D4] bg-white p-2 text-[#232323] font-nuni text-sm ml-1 mr-2">
                1kg
              </div>
              <div className="border border-[#D8D4D4] bg-white p-2 text-[#232323] font-nuni text-sm mr-1.5">
                5kg
              </div>
              <div className="border border-[#D8D4D4] bg-white p-2 text-[#232323] font-nuni text-sm ">
                250g
              </div>
            </Flex>
            <Flex>
              <Button btnText={"ADD TO CART"} />
              <div className="border ml-3.5 mr-1 border-[#D8D4D4] bg-white px-3 py-2.5 text-[#232323] font-nuni text-[18px] font-bold ">
                1
              </div>
              <div className="">
                <div className="border border-[#D8D4D4] bg-white px-3 py-.5 text-black font-nuni text-sm font-bold mb-1">
                  +
                </div>
                <div className="border border-[#D8D4D4] bg-white px-3 py-.5 text-black font-nuni text-sm font-bold ">
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
