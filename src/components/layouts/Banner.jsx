import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Harb from "/src/assets/herb.png";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoDotFill } from "react-icons/go";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slider-container ">
      <Slider {...settings}>
        <div className="bg-[url(/src/assets/banner.png)] py-52 bg-no-repeat bg-cover bg-center">
          <Container>
            <Flex className={"gap-x-1.5"}>
              <Images imgSrc={Harb} className={"pb-1"} />
              <p className="text-[#232323] text-[18px] font-nuni">
                100% genuine Products
              </p>
            </Flex>
            <h1 className="w-[535px] text-[#232323] font-bold font-int text-[70px] leading-[75px] pt-2.5 pb-9">
              Tasty & Healthy organic Food
            </h1>
            <Button
              btnText={
                <span className="flex items-center gap-x-2">
                  Explore Products
                  <FaArrowRightLong />
                </span>
              }
            />
          </Container>
        </div>
        <div className="bg-[url(/src/assets/slider.png)] py-52 bg-no-repeat bg-cover bg-center">
          <Container>
            <Flex className={"gap-x-1.5"}>
              <Images imgSrc={Harb} className={"pb-1"} />
              <p className="text-[#232323] text-[18px] font-nuni">
                100% genuine Products
              </p>
            </Flex>
            <h1 className="w-[535px] text-[#232323] font-bold font-int text-[70px] leading-[75px] pt-2.5 pb-9">
              Tasty & Healthy organic Food
            </h1>
            <Button
              btnText={
                <span className="flex items-center gap-x-2">
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
