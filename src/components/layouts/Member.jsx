import Container from "../Container";
import hMem from "/src/assets/hMember.png";
import Flex from "../Flex";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Images from "../Images";

const Member = () => {
  return (
    <div className="py-35">
      <Container>
        <div className="text-center mb-1">
          <h3 className="text-5xl font-bold text-[#232323] font-int">
            Team Member
          </h3>
          <p className="text-base text-[#546375] font-nuni mt-5">
            A highly efficient slip-ring scanner for today's diagnostic
            requirements.
          </p>
          <Flex className={"justify-between items-baseline mt-[55px]"}>
            <div className="">
              <div className="w-[300px] h-[300px] rounded-full bg-[#C8CACF]"></div>
              <div className="mt-5 text-center">
                <h5 className="text-[28px] text-[#232323] font-int font-bold">
                  John Abraham
                </h5>
                <p className="text-xl text-[#80B500] font-nuni pt-2 pb-5">
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
            <div className="">
              <div className="rounded-full bg-[#C8CACF]">
                <Images imgSrc={hMem} />
              </div>

              <div className="mt-5 text-center">
                <h5 className="text-[28px] text-[#232323] font-int font-bold">
                  John Abraham
                </h5>
                <p className="text-xl text-[#80B500] font-nuni pt-2 pb-5">
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
            <div className="">
              <div className="w-[300px] h-[300px] rounded-full bg-[#C8CACF]"></div>
              <div className="mt-5 text-center">
                <h5 className="text-[28px] text-[#232323] font-int font-bold">
                  John Abraham
                </h5>
                <p className="text-xl text-[#80B500] font-nuni pt-2 pb-5">
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
          </Flex>
        </div>
      </Container>
    </div>
  );
};

export default Member;
