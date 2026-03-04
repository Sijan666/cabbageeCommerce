import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import con from "/src/assets/contact.png";

const Contact = () => {
  return (
    <div className="bg-[url(/src/assets/video.png)] bg-no-repeat bg-center bg-cover py-20 lg:py-17.5">
      <Container className={'px-3 lg:px-0'}>
        <div className="flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="">
            <p className="text-[#80B500] text-base font-bold font-nuni text-center lg:text-left">
              VISIT OUR SHOP
            </p>
            <h3 className="lg:w-[445px] text-[30px] lg:text-[50px] text-white font-bold font-int lg:leading-[70px] pt-1.5 pb-5 text-center lg:text-left">
              Need Any Organic Fresh Food ?
            </h3>
            <p className="text-white  text-base font-nuni lg:w-[410px] lg:leading-[30px] mb-7 text-center lg:text-left">
              Cur tantas regiones barbarorum obiit, tot maria transmist summo
              bono fruitur id est voluptate barbarorum
            </p>
            <Button btnText={"Contact Us"} />
          </div>
          <Images imgSrc={con} className={'hidden md:block'}/>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
