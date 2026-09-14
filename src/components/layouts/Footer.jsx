import React from "react";
import { Link } from "react-router-dom";
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


const usefulLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About Us", path: "/about" },
  { name: "Blog", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const helpLinks = [
  { name: "My Account", path: "/profile" },
  { name: "Shopping Cart", path: "/cart" },
  { name: "Wishlist", path: "/wishlist" },
];

const socialIcons = [
  { id: 1, label: "Facebook", component: <FaFacebook className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" aria-hidden="true" /> },
  { id: 2, label: "Twitter", component: <BsTwitter className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" aria-hidden="true" /> },
  { id: 3, label: "Vimeo", component: <SiVimeo className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" aria-hidden="true" /> },
  { id: 4, label: "Pinterest", component: <PiPinterestLogo className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" aria-hidden="true" /> },
];

const paymentIcons = [
  { id: 1, title: "Visa", component: <FaCcVisa className="hover:text-white transition-colors duration-300 cursor-pointer" title="Visa" aria-label="Pay with Visa" /> },
  { id: 2, title: "MasterCard", component: <FaCcMastercard className="hover:text-white transition-colors duration-300 cursor-pointer" title="MasterCard" aria-label="Pay with MasterCard" /> },
  { id: 3, title: "PayPal", component: <FaCcPaypal className="hover:text-white transition-colors duration-300 cursor-pointer" title="PayPal" aria-label="Pay with PayPal" /> },
  { id: 4, title: "Apple Pay", component: <FaCcApplePay className="hover:text-white transition-colors duration-300 cursor-pointer" title="Apple Pay" aria-label="Pay with Apple Pay" /> },
  { id: 5, title: "Google Pay", component: <FaGooglePay className="hover:text-white transition-colors duration-300 cursor-pointer text-3xl" title="Google Pay" aria-label="Pay with Google Pay" /> },
];


const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-[url('/src/assets/footer.png')] py-20 lg:py-27.5 bg-no-repeat bg-center bg-cover relative" aria-label="Site Footer">
        <div className="absolute inset-0 bg-[#0B1120]/80 pointer-events-none" aria-hidden="true"></div>
        <Container className="px-4 lg:px-0 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
            {/* about us */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-bold text-[22px] font-int mb-6">About Us</h4>
              <p className="font-nuni text-sm md:text-base text-gray-300 leading-relaxed mb-6">Corporate clients and leisure travelers have been relying on Cabbage for dependable, safe, and professional service across major cities worldwide.</p>
              {/* social icons map */}
              <div className="flex gap-3 justify-center lg:justify-start" aria-label="Social media links">
                {socialIcons.map((social) => (
                  <a href="#" key={social.id} aria-label={social.label} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#80B500] group cursor-pointer transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#80B500]">
                    {social.component}
                  </a>
                ))}
              </div>
            </div>
            {/* useful links */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-bold text-[22px] font-int mb-6">Useful Links</h4>
              <ul className="space-y-3" aria-label="Useful Links">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-sm md:text-base text-gray-300 hover:text-[#80B500] font-nuni transition-colors duration-300 outline-none focus-visible:text-[#80B500]">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* help */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-bold text-[22px] font-int mb-6">Help</h4>
              <ul className="space-y-3" aria-label="Help Links">
                {helpLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-sm md:text-base text-gray-300 hover:text-[#80B500] font-nuni transition-colors duration-300 outline-none focus-visible:text-[#80B500]">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* newsletter and contact */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <Images imgSrc={footerlogo} alt="Cabbage Logo" className="mx-auto lg:mx-0 mb-4" />
              <p className="text-sm md:text-base text-gray-300 font-nuni mb-6 leading-relaxed">We are a team of designers and developers creating high-quality organic solutions.</p>
              <div className="flex items-center gap-x-3 mb-6 justify-center lg:justify-start">
                <LuMapPin className="text-[#80B500] text-xl shrink-0" aria-hidden="true" />
                <p className="text-sm md:text-base text-gray-300 font-nuni">254 Lillian Blvd, Holbrook</p>
              </div>
              {/* newsletter input */}
              <form className="w-full max-w-[320px] bg-white flex items-center justify-between p-1 rounded-md shadow-sm" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter email address" aria-label="Email address for newsletter subscription" required className="text-[#232323] bg-transparent px-3 py-2.5 w-full outline-none text-sm font-nuni placeholder:text-gray-400" />
                <Button btnText={'Subscribe'} className={'py-2.5! px-4! text-xs font-bold'} />
              </form>
            </div>
          </div>
        </Container>
      </footer>
      {/* copyright */}
      <div className="bg-[#070C17] py-5 border-t border-white/5">
        <Container className="px-4 lg:px-0">
          <div className="flex flex-col sm:flex-row lg:justify-between justify-center items-center gap-y-4 text-center">
            <p className="text-sm font-nuni text-gray-400">© Cabbage {currentYear} All rights reserved.</p>
            {/* payment method icons map */}
            <div className="flex items-center gap-3 text-2xl text-gray-400" aria-label="Accepted payment methods">
              {paymentIcons.map((payment) => (
                <React.Fragment key={payment.id}>
                  {payment.component}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
export default Footer;