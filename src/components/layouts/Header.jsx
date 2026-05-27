import Container from "../Container";
import { SlLocationPin } from "react-icons/sl";
import Flex from "../Flex";
import { MdMailOutline } from "react-icons/md";
import Images from "../Images";
import uk from "/src/assets/uk.png";
import Logo from "/src/assets/logo.png";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import Button from "../Button";

const Header = () => {
  return (
    <>
      <div className="bg-[#0A472E] py-3 md:py-4.5">
        <Container className="px-4 lg:px-0">
          <Flex className={"flex-col lg:flex-row justify-between items-center gap-y-3 lg:gap-y-0"}>
            <Flex className={"items-center justify-center flex-wrap gap-y-1"}>
              <SlLocationPin className="text-[#80B500] text-sm md:text-base" />
              <p className="border-r-2 border-white/60 pr-2 text-white font-nuni text-[13px] md:text-base px-1.5 mr-2">
                254 Lillian, Holbrook
              </p>
              <MdMailOutline className="text-[#80B500] text-[16px] md:text-[18px] ml-1 md:ml-0" />
              <p className="text-white font-nuni text-[13px] md:text-base pl-1.5">
                info@santizex-site.com
              </p>
            </Flex>
            <Flex className={"items-center justify-center flex-wrap"}>
              <p className="text-white font-nuni text-[13px] md:text-base pr-4 md:pr-8 border-e-2 border-white/60 mr-2 md:mr-4">
                facebook - behance - interest
              </p>
              <Images imgSrc={uk} className="w-4 md:w-auto" />
              <p className="text-white font-nuni text-xs md:text-sm pl-1">EN </p>
            </Flex>
          </Flex>
        </Container>
      </div>
      <div className="">
        <Container className="py-5 md:py-7 px-4 lg:px-0">
          <Flex className={"flex-col lg:flex-row justify-between items-center gap-y-5 lg:gap-y-0"}>
            <Flex className={"items-center justify-center"}>
              <Images imgSrc={Logo} className="w-8 md:w-auto" />
              <h3 className="pl-1 text-2xl md:text-3xl text-[#232323] font-bold font-int">
                Cabbage
              </h3>
            </Flex>
            <div className="lg:ml-[110px] w-full lg:w-auto">
              <ul className="flex flex-wrap justify-center lg:justify-start gap-x-4 md:gap-x-8 lg:gap-x-11 gap-y-2 items-center font-nuni text-sm md:text-base font-bold">
                <li className="hover:text-[#80B500] text-[#0A2C3D] duration-300 cursor-pointer">
                  Home
                </li>
                <li className="hover:text-[#80B500] text-[#0A2C3D] duration-300 cursor-pointer">
                  About
                </li>
                <li className="hover:text-[#80B500] text-[#0A2C3D] duration-300 cursor-pointer">
                  Shop
                </li>
                <li className="hover:text-[#80B500] text-[#0A2C3D] duration-300 cursor-pointer">
                  Pages
                </li>
                <li className="hover:text-[#80B500] text-[#0A2C3D] duration-300 cursor-pointer">
                  Blog
                </li>
                <li className="hover:text-[#80B500] text-[#0A2C3D] duration-300 cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
            <Flex className={"gap-x-3 md:gap-x-5 lg:ml-7.5 lg:mr-1 items-center justify-center"}>
              <div className="duration-300 bg-[#80B500]/15 hover:bg-[#80B500] h-8 w-8 md:h-9 md:w-9 rounded-full text-[#80B500] hover:text-white relative cursor-pointer">
                <MdFavoriteBorder className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg md:text-xl" />
              </div>
              <div className="duration-300 bg-[#80B500]/15 hover:bg-[#80B500] h-8 w-8 md:h-9 md:w-9 rounded-full text-[#80B500] hover:text-white relative cursor-pointer">
                <FaRegUser className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg md:text-xl" />
              </div>
              <div className="duration-300 bg-[#80B500]/15 hover:bg-[#80B500] h-8 w-8 md:h-9 md:w-9 rounded-full text-[#80B500] hover:text-white relative cursor-pointer">
                <BsCart3 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg md:text-xl" />
              </div>
            </Flex>
            <div className="w-full sm:w-auto text-center lg:text-left mt-2 lg:mt-0">
              <Button btnText={"GET A QUATE"} className="w-full sm:w-auto justify-center flex text-sm md:text-base py-3 px-6" />
            </div>
          </Flex>
        </Container>
      </div>
    </>
  );
};

export default Header;