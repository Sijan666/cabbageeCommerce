import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Harb from "/src/assets/herb.png";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dotsClass: "slick-dots slider",
  };

  return (
    <div className="slider-container w-full overflow-hidden">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="bg-[url(/src/assets/banner.png)] py-20 md:py-32 lg:py-52 bg-no-repeat bg-cover bg-center">
          <Container className="px-4 lg:px-0">
            <Flex className={"gap-x-1.5 items-center"}>
              <Images imgSrc={Harb} className={"pb-1 w-5 md:w-auto"} />
              <p className="text-[#232323] text-sm md:text-[18px] font-nuni">
                100% genuine Products
              </p>
            </Flex>
            <h1 className="w-full md:w-[535px] text-[#232323] font-bold font-int text-4xl sm:text-5xl md:text-[70px] leading-tight md:leading-[75px] pt-2.5 pb-6 md:pb-9">
              Tasty & Healthy organic Food
            </h1>
            <Button
              btnText={
                <span className="flex items-center gap-x-2 text-sm md:text-base">
                  Explore Products
                  <FaArrowRightLong />
                </span>
              }
            />
          </Container>
        </div>
        {/* Slide 2 */}
        <div className="bg-[url(/src/assets/slider.png)] py-20 md:py-32 lg:py-52 bg-no-repeat bg-cover bg-center">
          <Container className="px-4 lg:px-0">
            <Flex className={"gap-x-1.5 items-center"}>
              <Images imgSrc={Harb} className={"pb-1 w-5 md:w-auto"} />
              <p className="text-[#232323] text-sm md:text-[18px] font-nuni">
                100% genuine Products
              </p>
            </Flex>
            <h1 className="w-full md:w-[535px] text-[#232323] font-bold font-int text-4xl sm:text-5xl md:text-[70px] leading-tight md:leading-[75px] pt-2.5 pb-6 md:pb-9">
              Tasty & Healthy organic Food
            </h1>
            <Button
              btnText={
                <span className="flex items-center gap-x-2 text-sm md:text-base">
                  Explore Products
                  <FaArrowRightLong />
                </span>
              }
            />
          </Container>
        </div>
        {/* Slide 3 */}
        <div className="bg-[url(/src/assets/banner.png)] py-20 md:py-32 lg:py-52 bg-no-repeat bg-cover bg-center">
          <Container className="px-4 lg:px-0">
            <Flex className={"gap-x-1.5 items-center"}>
              <Images imgSrc={Harb} className={"pb-1 w-5 md:w-auto"} />
              <p className="text-[#232323] text-sm md:text-[18px] font-nuni">
                100% genuine Products
              </p>
            </Flex>
            <h1 className="w-full md:w-[535px] text-[#232323] font-bold font-int text-4xl sm:text-5xl md:text-[70px] leading-tight md:leading-[75px] pt-2.5 pb-6 md:pb-9">
              Tasty & Healthy organic Food
            </h1>
            <Button
              btnText={
                <span className="flex items-center gap-x-2 text-sm md:text-base">
                  Explore Products
                  <FaArrowRightLong />
                </span>
              }
            />
          </Container>
        </div>
        {/* Slide 4 */}
        <div className="bg-[url(/src/assets/slider.png)] py-20 md:py-32 lg:py-52 bg-no-repeat bg-cover bg-center">
          <Container className="px-4 lg:px-0">
            <Flex className={"gap-x-1.5 items-center"}>
              <Images imgSrc={Harb} className={"pb-1 w-5 md:w-auto"} />
              <p className="text-[#232323] text-sm md:text-[18px] font-nuni">
                100% genuine Products
              </p>
            </Flex>
            <h1 className="w-full md:w-[535px] text-[#232323] font-bold font-int text-4xl sm:text-5xl md:text-[70px] leading-tight md:leading-[75px] pt-2.5 pb-6 md:pb-9">
              Tasty & Healthy organic Food
            </h1>
            <Button
              btnText={
                <span className="flex items-center gap-x-2 text-sm md:text-base">
                  Explore Products
                  <FaArrowRightLong />
                </span>
              }
            />
          </Container>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;