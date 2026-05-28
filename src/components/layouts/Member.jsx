import Container from "../Container";
import hMem from "/src/assets/hMember.png";
import Flex from "../Flex";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Images from "../Images";

const Member = () => {
  return (
    <div className="py-16 lg:py-35">
      <Container className={'px-4 lg:px-0'}>
        <div className="text-center mb-1">
          <h3 className="text-[30px] md:text-4xl lg:text-5xl font-bold text-[#232323] font-int">
            Team Member
          </h3>
          <p className="text-sm md:text-base text-[#546375] font-nuni mt-3 md:mt-5 max-w-2xl mx-auto">
            A highly efficient slip-ring scanner for today's diagnostic
            requirements.
          </p>
          <div className={"flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-y-12 lg:gap-y-0 mt-10 lg:mt-[55px]"}>
            {/* first member */}
            <div className="w-full sm:w-[80%] md:w-1/2 lg:w-[31%] flex flex-col items-center">
              <div className="w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] rounded-full bg-[#C8CACF] mx-auto"></div>
              <div className="mt-5 text-center">
                <h5 className="text-[24px] xl:text-[28px] text-[#232323] font-int font-bold">
                  John Abraham
                </h5>
                <p className="text-lg xl:text-xl text-[#80B500] font-nuni pt-1 xl:pt-2 pb-4 xl:pb-5">
                  Consultant
                </p>
                <Flex className={"gap-x-4 justify-center"}>
                  <div className="group cursor-pointer duration-300  hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaTwitter className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaFacebookF className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaInstagram className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaTwitter className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                </Flex>
              </div>
            </div>
            {/* second member */}
            <div className="w-full sm:w-[80%] md:w-1/2 lg:w-[31%] flex flex-col items-center">
              <div className="w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] rounded-full bg-[#C8CACF] mx-auto flex justify-center items-center overflow-hidden">
                <Images imgSrc={hMem} className="w-full h-full object-cover" />
              </div>
              <div className="mt-5 text-center">
                <h5 className="text-[24px] xl:text-[28px] text-[#232323] font-int font-bold">
                  John Abraham
                </h5>
                <p className="text-lg xl:text-xl text-[#80B500] font-nuni pt-1 xl:pt-2 pb-4 xl:pb-5">
                  Consultant
                </p>
                <Flex className={"gap-x-4 justify-center"}>
                  <div className="group cursor-pointer duration-300  hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaTwitter className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaFacebookF className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaInstagram className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaTwitter className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                </Flex>
              </div>
            </div>
            {/* third member */}
            <div className="w-full sm:w-[80%] md:w-1/2 lg:w-[31%] flex flex-col items-center">
              <div className="w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] rounded-full bg-[#C8CACF] mx-auto"></div>
              <div className="mt-5 text-center">
                <h5 className="text-[24px] xl:text-[28px] text-[#232323] font-int font-bold">
                  John Abraham
                </h5>
                <p className="text-lg xl:text-xl text-[#80B500] font-nuni pt-1 xl:pt-2 pb-4 xl:pb-5">
                  Consultant
                </p>
                <Flex className={"gap-x-4 justify-center"}>
                  <div className="group cursor-pointer duration-300  hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaTwitter className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaFacebookF className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaInstagram className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                  <div className="group cursor-pointer duration-300 hover:bg-[#80B500] relative h-[35px] w-[35px] rounded-full bg-[#80B500]/20">
                    <FaTwitter className="group-hover:text-white absolute text-[#232323] text-sm left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Member;