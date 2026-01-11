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
      <div className="bg-[#0A472E] py-4.5">
        <Container>
          <Flex className={"justify-between"}>
            <Flex>
              <SlLocationPin className="text-[#80B500] text-base" />
              <p className=" border-r-2 border-white/60 pr-2 text-white font-nuni text-base px-1.5 mr-2">
                254 Lillian, Holbrook
              </p>
              <MdMailOutline className=" text-[#80B500] text-[18px] " />
              <p className="text-white font-nuni text-base pl-1.5">
                info@santizex-site.com
              </p>
            </Flex>
            <Flex>
              <p className="text-white font-nuni text-base pr-8  border-e-2 border-white/60 mr-4">
                facebook - behance - interest
              </p>
              <Images imgSrc={uk} />
              <p className="text-white font-nuni text-sm pl-1">EN </p>
            </Flex>
          </Flex>
        </Container>
      </div>
      <div className="">
        <Container className="py-7">
          <Flex className={"justify-between items-center"}>
            <Flex>
              <Images imgSrc={Logo} />
              <h3 className="pl-1 text-3xl text-[#232323] font-bold font-int">
                Cabbage
              </h3>
            </Flex>
            <div className="ml-[110px]">
              <ul className="flex gap-x-11 items-center font-nuni text-base font-bold ">
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
            <Flex className={"gap-x-5 ml-7.5 mr-1"}>
              <div className="duration-300 bg-[#80B500]/15 hover:bg-[#80B500] h-9 w-9 rounded-full text-[#80B500] hover:text-white relative">
                <MdFavoriteBorder className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  text-xl" />
              </div>
              <div className="duration-300 bg-[#80B500]/15 hover:bg-[#80B500] h-9 w-9 rounded-full text-[#80B500] hover:text-white relative">
                <FaRegUser className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl" />
              </div>
              <div className="duration-300 bg-[#80B500]/15 hover:bg-[#80B500] h-9 w-9 rounded-full text-[#80B500] hover:text-white relative">
                <BsCart3 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl" />
              </div>
            </Flex>
            <Button btnText={"GET A QUATE"} />
          </Flex>
        </Container>
      </div>
    </>
  );
};

export default Header;
