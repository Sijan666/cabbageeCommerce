import React from "react";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { SiVimeo } from "react-icons/si";
import { PiPinterestLogo } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay, FaGooglePay } from "react-icons/fa6";
import Container from "../Container";
import Images from "../Images";
import Button from "../Button";
import footerlogo from '../../assets/footerlogo.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-[url('/src/assets/footer.png')] py-20 lg:py-27.5 bg-no-repeat bg-center bg-cover relative">
        <div className="absolute inset-0 bg-[#0B1120]/80 pointer-events-none"></div>
        <Container className="px-4 lg:px-0 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
            {/* about us */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-bold text-[22px] font-int mb-6">
                About Us
              </h4>
              <p className="font-nuni text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                Corporate clients and leisure travelers have been relying on Cabbage for dependable, safe, and professional service across major cities worldwide.
              </p>
              {/* social icons */}
              <div className="flex gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#80B500] group cursor-pointer transition-colors duration-300">
                  <FaFacebook className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#80B500] group cursor-pointer transition-colors duration-300">
                  <BsTwitter className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#80B500] group cursor-pointer transition-colors duration-300">
                  <SiVimeo className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#80B500] group cursor-pointer transition-colors duration-300">
                  <PiPinterestLogo className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </div>
            {/* useful links */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-bold text-[22px] font-int mb-6">
                Useful Links
              </h4>
              <ul className="space-y-3">
                {["About", "News", "Partners", "Shop", "Gallery", "Contacts"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm md:text-base text-gray-300 hover:text-[#80B500] font-nuni transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* help */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-bold text-[22px] font-int mb-6">
                Help
              </h4>
              <ul className="space-y-3">
                {["FAQ", "Term & Conditions", "Reporting", "Documentation", "Support Policy", "Privacy"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm md:text-base text-gray-300 hover:text-[#80B500] font-nuni transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* newsletter & contact */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <Images imgSrc={footerlogo} className="mx-auto lg:mx-0 mb-4" />
              <p className="text-sm md:text-base text-gray-300 font-nuni mb-6 leading-relaxed">
                We are a team of designers and developers creating high-quality organic solutions.
              </p>
              <div className="flex items-center gap-x-3 mb-6 justify-center lg:justify-start">
                <LuMapPin className="text-[#80B500] text-xl shrink-0" />
                <p className="text-sm md:text-base text-gray-300 font-nuni">
                  254 Lillian Blvd, Holbrook
                </p>
              </div>
              {/* Newsletter */}
              <div className="w-full max-w-[320px] bg-white flex items-center justify-between p-1 rounded-md shadow-sm">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="text-[#232323] bg-transparent px-3 py-2.5 w-full outline-none text-sm font-nuni placeholder:text-gray-400"
                />
                <Button btnText={'Subscribe'} className={'py-2.5! px-4! text-xs font-bold'} />
              </div>
            </div>
          </div>
        </Container>
      </footer>
      {/* Copyright */}
      <div className="bg-[#070C17] py-5 border-t border-white/5">
        <Container className="px-4 lg:px-0">
          <div className="flex flex-col sm:flex-row lg:justify-between justify-center items-center gap-y-4 text-center">
            {/* Copyright Text */}
            <p className="text-sm font-nuni text-gray-400">
              © Cabbage 2026 All rights reserved.
            </p>
            {/* payment method icons */}
            <div className="flex items-center gap-3 text-2xl text-gray-400">
              <FaCcVisa className="hover:text-white transition-colors duration-300 cursor-pointer" title="Visa" />
              <FaCcMastercard className="hover:text-white transition-colors duration-300 cursor-pointer" title="MasterCard" />
              <FaCcPaypal className="hover:text-white transition-colors duration-300 cursor-pointer" title="PayPal" />
              <FaCcApplePay className="hover:text-white transition-colors duration-300 cursor-pointer" title="Apple Pay" />
              <FaGooglePay className="hover:text-white transition-colors duration-300 cursor-pointer text-3xl" title="Google Pay" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;