import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Button from "../Button";
import Logo from "/src/assets/logo.png";
import { useStore } from "../../store/useStore";
// icons
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, wishlist, currency, setCurrency } = useStore();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = ["Home", "About", "Shop", "Blogs", "Contact"];
  return (
    <>
      {/* main navigation */}
      <div
        className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#051117]/85 backdrop-blur-xl border-white/10 py-3 shadow-2xl shadow-black/50"
            : "bg-[#051117]/60 backdrop-blur-md border-transparent py-5"
        }`}>
        <Container className="px-5 lg:px-0">
          <Flex className="justify-between items-center">
            <Link to="/">
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
            </Link>
            {/* desktop nav links */}
            <div className="hidden lg:block">
              <ul className="flex gap-x-10 items-center font-nuni text-[14px] font-bold text-white/80 uppercase tracking-widest">
                {navLinks.map((item, index) => (
                  <li key={index} className="relative cursor-pointer group py-2 transition-colors duration-300 hover:text-white">
                    <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                      {item}
                    </Link>
                    <span className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 bg-[#80B500] rounded-full opacity-0 transform -translate-x-1/2 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_#80B500]"></span>
                  </li>
                ))}
              </ul>
            </div>
            {/* icons and action button */}
            <Flex className="items-center gap-x-5 md:gap-x-7">
              {/* desktop action icons */}
              <Flex className="hidden sm:flex gap-x-3 items-center">
                {/* multi currency dropdown desktop */}
                <div className="flex items-center border-r border-white/20 pr-4 mr-1">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-transparent text-white/80 font-nuni text-[14px] font-bold uppercase tracking-widest outline-none cursor-pointer hover:text-[#80B500] transition-colors"
                  >
                    <option value="USD" className="bg-[#051117] text-white">USD</option>
                    <option value="BDT" className="bg-[#051117] text-white">BDT</option>
                    <option value="EUR" className="bg-[#051117] text-white">EUR</option>
                    <option value="INR" className="bg-[#051117] text-white">INR</option>
                  </select>
                </div>
                {/* wishlist icon */}
                <Link to="/wishlist" className="group relative flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#80B500]/50 hover:bg-[#80B500]/10 h-10 w-10 rounded-full text-white/70 hover:text-[#80B500] transition-colors duration-300 cursor-pointer">
                  <MdFavoriteBorder className="text-[19px]" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#80B500] text-white text-[10px] font-extrabold h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(128,181,0,0.6)]">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                {/* user icon */}
                <Link to="/login" className="group flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#80B500]/50 hover:bg-[#80B500]/10 h-10 w-10 rounded-full text-white/70 hover:text-[#80B500] transition-colors duration-300 cursor-pointer">
                  <FaRegUser className="text-[16px]" />
                </Link>
                {/* cart icon */}
                <Link to="/cart" className="group relative flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#80B500]/50 hover:bg-[#80B500]/10 h-10 w-10 rounded-full text-white/70 hover:text-[#80B500] transition-colors duration-300 cursor-pointer">
                  <BsCart3 className="text-[18px]" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#80B500] text-white text-[10px] font-extrabold h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(128,181,0,0.6)]">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </Flex>
              {/* get quote button desktop */}
              <div className="hidden md:block">
                <Link to="/quote">
                  <Button
                    btnText="GET A QUOTE"
                    className="font-bold text-[13px] tracking-widest uppercase py-3 px-8 rounded-full bg-[#80B500] text-[#030a0e] shadow-[0_4px_20px_-5px_rgba(128,181,0,0.5)] hover:shadow-[0_8px_25px_-5px_rgba(128,181,0,0.7)] transition-shadow duration-300 cursor-pointer"
                  />
                </Link>
              </div>
              {/* hamburger mobile */}
              <div
                className="lg:hidden text-2xl text-white cursor-pointer hover:text-[#80B500] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
              </div>
            </Flex>
          </Flex>
          {/* mobile dropdown menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-125 opacity-100 mt-5" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-5 border-t border-white/10">
              <ul className="flex flex-col gap-y-4 font-nuni text-[15px] font-bold text-white/80 uppercase tracking-wider pt-5 px-2">
                {navLinks.map((item, index) => (
                  <li key={index} className="hover:text-[#80B500] transition-colors cursor-pointer">
                    <Link 
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                {/* multi currency dropdown mobile */}
                <li className="pt-4 mt-2 border-t border-white/10">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-transparent text-white font-nuni text-[15px] font-bold uppercase tracking-wider outline-none w-full cursor-pointer hover:text-[#80B500] transition-colors"
                  >
                    <option value="USD" className="bg-[#051117] text-white">USD ($)</option>
                    <option value="BDT" className="bg-[#051117] text-white">BDT (৳)</option>
                    <option value="EUR" className="bg-[#051117] text-white">EUR (€)</option>
                    <option value="INR" className="bg-[#051117] text-white">INR (₹)</option>
                  </select>
                </li>
              </ul>
              {/* mobile action icons */}
              <Flex className="mt-6 pt-6 border-t border-white/10 gap-x-5 justify-center sm:hidden">
                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="relative">
                  <MdFavoriteBorder className="text-2xl text-white/60 hover:text-[#80B500] transition-colors" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#80B500] text-[#030a0e] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                {/* user icon mobile */}
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <FaRegUser className="text-2xl text-white/60 hover:text-[#80B500] transition-colors cursor-pointer" />
                </Link>
                {/* cart icon mobile */}
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="relative">
                  <BsCart3 className="text-2xl text-white/60 hover:text-[#80B500] transition-colors" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#80B500] text-[#030a0e] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </Flex>
              {/* mobile quote button */}
              <div className="mt-6 md:hidden">
                <Link to="/quote" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    btnText="GET A QUOTE"
                    className="w-full justify-center py-3.5 rounded-md bg-[#80B500] text-[#030a0e] font-bold tracking-widest shadow-[0_0_15px_rgba(128,181,0,0.3)] cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
export default Header;