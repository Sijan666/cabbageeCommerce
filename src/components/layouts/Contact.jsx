import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import con from "/src/assets/contact.png";

const Contact = () => {
  return (
    <div className="bg-[url(/src/assets/video.png)] bg-no-repeat bg-cover py-17.5">
      <Container>
        <Flex className={"justify-between"}>
          <div className="">
            <p className="text-[#80B500] text-base font-bold font-nuni">
              VISIT OUR SHOP
            </p>
            <h3 className="w-[445px] text-[50px] text-white font-bold font-int leading-[70px] pt-1.5 pb-5">
              Need Any Organic Fresh Food ?
            </h3>
            <p className="text-white text-base font-nuni w-[410px] leading-[30px] mb-7">
              Cur tantas regiones barbarorum obiit, tot maria transmist summo
              bono fruitur id est voluptate barbarorum
            </p>
            <Button btnText={"Contact Us"} />
          </div>
          <Images imgSrc={con} />
        </Flex>
      </Container>
    </div>
  );
};

export default Contact;
