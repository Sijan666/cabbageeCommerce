import React, { useState, useEffect } from "react";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Button from "../Button";
import uk from "/src/assets/uk.png";
import Logo from "/src/assets/logo.png";

// Icons
import { SlLocationPin } from "react-icons/sl";
import { MdMailOutline, MdFavoriteBorder } from "react-icons/md";
import { FaRegUser, FaFacebookF, FaBehance, FaPinterestP } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dynamic Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Shop", "Pages", "Blog", "Contact"];

  return (
    <>
      <div className="bg-[#030a0e] py-2 border-b border-white/5">
        <Container className="px-5 lg:px-0">
          <Flex className="flex-col md:flex-row justify-between items-center gap-y-2 md:gap-y-0 text-white/60">
            {/* Left Side: Contact Info */}
            <Flex className="items-center justify-center flex-wrap gap-y-1 gap-x-5">
              <Flex className="items-center gap-x-2 group cursor-pointer">
                <SlLocationPin className="text-[#80B500] text-sm group-hover:text-[#96d400] transition-colors" />
                <p className="font-nuni text-xs tracking-wide group-hover:text-white transition-colors duration-300">
                  254 Lillian, Holbrook
                </p>
              </Flex>
              <div className="hidden md:block w-px h-3 bg-white/10"></div>
              <Flex className="items-center gap-x-2 group cursor-pointer">
                <MdMailOutline className="text-[#80B500] text-[15px] group-hover:text-[#96d400] transition-colors" />
                <p className="font-nuni text-xs tracking-wide group-hover:text-white transition-colors duration-300">
                  info@santizex-site.com
                </p>
              </Flex>
            </Flex>
            {/* Right Side: Socials & Language */}
            <Flex className="items-center justify-center gap-x-6">
              <Flex className="items-center gap-x-4">
                <FaFacebookF className="hover:text-[#80B500] hover:scale-110 text-[12px] cursor-pointer transition-all duration-300" />
                <FaBehance className="hover:text-[#80B500] hover:scale-110 text-[13px] cursor-pointer transition-all duration-300" />
                <FaPinterestP className="hover:text-[#80B500] hover:scale-110 text-[12px] cursor-pointer transition-all duration-300" />
              </Flex>
              <div className="w-px h-3 bg-white/10"></div>
              <Flex className="items-center gap-x-2 cursor-pointer group">
                <Images imgSrc={uk} className="w-4 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity" />
                <p className="group-hover:text-white font-nuni text-[11px] font-bold tracking-widest uppercase transition-colors">
                  EN
                </p>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </div>
      {/* Main Navigation */}
      <div
        className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#051117]/85 backdrop-blur-xl border-white/10 py-3 shadow-2xl shadow-black/50"
            : "bg-[#051117]/60 backdrop-blur-md border-transparent py-5"
        }`}>
        <Container className="px-5 lg:px-0">
          <Flex className="justify-between items-center">
            {/* Logo */}
            <Flex className="items-center cursor-pointer group">
              <div className="relative">
                <Images
                  imgSrc={Logo}
                  className="w-9 md:w-11 relative z-10 transform group-hover:rotate-360 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#80B500]/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="pl-3 text-2xl md:text-[28px] text-white font-black font-int tracking-tight">
                Cabbage<span className="text-[#80B500]">.</span>
              </h3>
            </Flex>
            {/* Desktop Nav Links */}
            <div className="hidden lg:block">
              <ul className="flex gap-x-10 items-center font-nuni text-[14px] font-bold text-white/80 uppercase tracking-widest">
                {navLinks.map((item, index) => (
                  <li
                    key={index}
                    className="relative cursor-pointer group py-2 transition-colors duration-300 hover:text-white"
                  >
                    {item}
                    {/* Glowing Accent Dot on Hover */}
                    <span className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 bg-[#80B500] rounded-full opacity-0 transform -translate-x-1/2 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_#80B500]"></span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Icons & Action Button */}
            <Flex className="items-center gap-x-5 md:gap-x-7">
              {/* Action Icons */}
              <Flex className="hidden sm:flex gap-x-3 items-center">
                <div className="group flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#80B500]/50 hover:bg-[#80B500]/10 h-10 w-10 rounded-full text-white/70 hover:text-[#80B500] transition-all duration-300 cursor-pointer">
                  <MdFavoriteBorder className="text-[19px]" />
                </div>
                <div className="group flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#80B500]/50 hover:bg-[#80B500]/10 h-10 w-10 rounded-full text-white/70 hover:text-[#80B500] transition-all duration-300 cursor-pointer">
                  <FaRegUser className="text-[16px]" />
                </div>
                <div className="group relative flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#80B500]/50 hover:bg-[#80B500]/10 h-10 w-10 rounded-full text-white/70 hover:text-[#80B500] transition-all duration-300 cursor-pointer">
                  <BsCart3 className="text-[18px]" />
                  {/* Glowing Notification Badge */}
                  <span className="absolute -top-1.5 -right-1.5 bg-[#80B500] text-white text-[10px] font-extrabold h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(128,181,0,0.6)]">
                    2
                  </span>
                </div>
              </Flex>
              {/* Get Quote Button */}
              <div className="hidden md:block">
                <Button
                  btnText="GET A QUOTE"
                  className="font-bold text-[13px] tracking-widest uppercase py-3 px-8 rounded-full bg-[#80B500] text-[#030a0e] shadow-[0_4px_20px_-5px_rgba(128,181,0,0.5)] hover:shadow-[0_8px_25px_-5px_rgba(128,181,0,0.7)] hover:-translate-y-1 transition-all duration-300"
                />
              </div>
              {/* Hamburger Menu Icon (Mobile) */}
              <div
                className="lg:hidden text-2xl text-white cursor-pointer hover:text-[#80B500] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
              </div>
            </Flex>
          </Flex>
          {/* Mobile Dropdown Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-[400px] opacity-100 mt-5" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-5 border-t border-white/10">
              <ul className="flex flex-col gap-y-4 font-nuni text-[15px] font-bold text-white/80 uppercase tracking-wider pt-5 px-2">
                {navLinks.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-[#80B500] hover:translate-x-2 transition-all cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {/* Mobile */}
              <Flex className="mt-6 pt-6 border-t border-white/10 gap-x-5 justify-center sm:hidden">
                <MdFavoriteBorder className="text-2xl text-white/60 hover:text-[#80B500]" />
                <FaRegUser className="text-2xl text-white/60 hover:text-[#80B500]" />
                <div className="relative">
                  <BsCart3 className="text-2xl text-white/60 hover:text-[#80B500]" />
                  <span className="absolute -top-2 -right-2 bg-[#80B500] text-[#030a0e] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    2
                  </span>
                </div>
              </Flex>
              <div className="mt-6 md:hidden">
                <Button
                  btnText="GET A QUOTE"
                  className="w-full justify-center py-3.5 rounded-md bg-[#80B500] text-[#030a0e] font-bold tracking-widest shadow-[0_0_15px_rgba(128,181,0,0.3)]"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;