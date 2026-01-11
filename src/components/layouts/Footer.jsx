import { FaFacebook } from "react-icons/fa"
import Container from "../Container"
import Flex from "../Flex"
import { BsTwitter } from "react-icons/bs"
import { CgVercel } from "react-icons/cg"
import { PiPinterestLogo } from "react-icons/pi"
import Images from "../Images"
import footerlogo from '../../assets/footerlogo.png'
import { LuMapPin } from "react-icons/lu"
import Button from "../Button"
import f from '../../assets/f.png'



const Footer = () => {
  return (
    <>
    <div className="bg-[url('/src/assets/footer.png')] py-[172px] bg-no-repeat bg-center bg-cover">
      <div className="">
        <Container>
          <Flex className={'justify-between items-start'}>
            {/* about us start */}
            <div className="">
              <h4 className="text-white font-bold text-[22px] font-int">About Us.</h4>
              <p className="py-7.5 font-nuni text-base text-white w-[309px]">orporate clients and leisure travelers has been relying on Groundlink for dependable safe, and professional chauffeured car service in major cities across World. Indeed it has been more than one decade and five years that Groundlink</p>
              <div className="socialIcons flex items-center gap-x-2.5">
                <div className="flex gap-4">
                  {/* Facebook */}
                  <div className="p-4 bg-[#E2E2EB] rounded-full hover:bg-[#80B500] group cursor-pointer transition-all duration-300">
                    <FaFacebook className="text-[15px] text-[#6A7695] duration-300 group-hover:text-[#FBFBFD]" />
                  </div>
                  {/* Twitter */}
                  <div className="p-4 bg-[#E2E2EB] rounded-full hover:bg-[#80B500] group cursor-pointer transition-all duration-300">
                    <BsTwitter className="text-[15px] text-[#6A7695] duration-300 group-hover:text-[#FBFBFD]" />
                  </div>
                  {/* Vercel */}
                  <div className="p-4 bg-[#E2E2EB] rounded-full hover:bg-[#80B500] group cursor-pointer transition-all duration-300">
                    <CgVercel className="text-[15px] text-[#6A7695] duration-300 group-hover:text-[#FBFBFD]" />
                  </div>
                  {/* Pinterest */}
                  <div className="p-4 bg-[#E2E2EB] rounded-full hover:bg-[#80B500] group cursor-pointer transition-all duration-300">
                    <PiPinterestLogo className="text-[15px] text-[#6A7695] duration-300 group-hover:text-[#FBFBFD]" />
                  </div>
                </div>
              </div>
            </div>
            {/* about us end */}
            {/* useful link start */}
            <div className="">
              <h4 className="text-white font-bold text-[22px] font-int">Useful Links</h4>
              <ul>
                <li className="text-base text-white font-nuni pb-4.5 pt-7.5">About</li>
                <li className="text-base text-white font-nuni pb-4.5">News</li>
                <li className="text-base text-white font-nuni pb-4.5">Partners</li>
                <li className="text-base text-white font-nuni pb-4.5">Room Details</li>
                <li className="text-base text-white font-nuni pb-4.5">Gallery</li>
                <li className="text-base text-white font-nuni pb-4.5">Contacts</li>
              </ul>
            </div>
            {/* useful link end */}
            {/* help start */}
            <div className="">
              <h4 className="text-white font-bold text-[22px] font-int">Help?</h4>
              <ul>
                <li className="text-base text-white font-nuni pb-4.5 pt-7.5">FAQ</li>
                <li className="text-base text-white font-nuni pb-4.5">Term & conditions</li>
                <li className="text-base text-white font-nuni pb-4.5">Reporting</li>
                <li className="text-base text-white font-nuni pb-4.5">Documentation</li>
                <li className="text-base text-white font-nuni pb-4.5">Support Policy</li>
                <li className="text-base text-white font-nuni pb-4.5">Privacy</li>
              </ul>
            </div>
            {/* help end */}
            {/* logo start */}
            <div className="w-[312px]">
              <Images imgSrc={footerlogo}/>
              <p className="pt-6 pb-6.25 text-base text-white font-nuni w-[312px]">We are a team of designers and developers create high quality Magento, Prestashop, </p>
              <Flex className={'gap-x-4 items-center pb-7'}>
                <LuMapPin className="text-white"/>
                <p className="pt-6 pb-6.25 text-base text-white font-nuni w-[312px]">254 Lillian Blvd, Holbrook</p>
              </Flex>
              <Flex className={'bg-white w-[312px] justify-between items-center p-1 rounded-sm'}>
                <input type="email" placeholder="Enter email address" className="text-[#42518B] bg-white px-4.5 py-3.5 w-full outline-none "/>
                <Button btnText={'Subscribe'} className={'py-3!'}/>
              </Flex>
            </div>
            {/* logo end */}
          </Flex>
        </Container>
      </div>
    </div>
    <div className="bg-[#2b2b49c2] py-5.5">
      <Container>
        <Flex className={'justify-between'}>
          <p className="text-base font-nuni text-white">© TunaThemes 2024 All rights reserved.</p>
          <Images imgSrc={f}/>
        </Flex>
      </Container>
    </div>
    </>
  )
}

export default Footer
