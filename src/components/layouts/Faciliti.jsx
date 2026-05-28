import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import Fac from "/src/assets/fac.png";
import Fac1 from "/src/assets/fac1.png";
import Fac2 from "/src/assets/fac2.png";
import Fac3 from "/src/assets/fac3.png";
import Fac4 from "/src/assets/fac4.png";
import Fac5 from "/src/assets/fac5.png";
import Fac6 from "/src/assets/fac6.png";

const Faciliti = () => {
  const leftFeatures = [
    { img: Fac1, title: "Eat Healthy Food" },
    { img: Fac2, title: "Pesticide Free" },
    { img: Fac3, title: "Sweet Exotic Food" },
  ];

  const rightFeatures = [
    { img: Fac4, title: "Order Flexibility" },
    { img: Fac5, title: "Variety & Selection" },
    { img: Fac6, title: "Livestock Product" },
  ];

  return (
    <div className="mt-55 lg:mt-75  mb-16 lg:mb-24">
      <Container className="px-4 md:px-8 lg:px-0">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232323] font-int">
            Product Facilities
          </h3>
          <p className="text-sm md:text-base text-[#546375] font-nuni mt-3 md:mt-5 max-w-2xl mx-auto">
            A highly efficient slip-ring scanner for today's diagnostic requirements.
          </p>
        </div>
        {/* Main Content Layout */}
        <Flex className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-y-12 lg:gap-y-0 lg:gap-x-8">
          {/* Left Features */}
          <div className="w-full lg:w-1/3 flex flex-col gap-y-8 md:gap-y-12">
            {leftFeatures.map((item, index) => (
              <Flex key={index} className="flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-y-4 sm:gap-y-0 sm:gap-x-5">
                <Images imgSrc={item.img} className="shrink-0 w-[60px] md:w-[70px] lg:w-auto" />
                <div className="w-full">
                  <h5 className="text-[#223645] text-xl md:text-[22px] font-bold font-int">
                    {item.title}
                  </h5>
                  <p className="text-[#666E77] text-sm md:text-base font-nuni w-full sm:max-w-[260px] mt-2 leading-relaxed md:leading-7 mx-auto sm:mx-0">
                    Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                  </p>
                </div>
              </Flex>
            ))}
          </div>
          {/* Center Image */}
          <div className="w-full lg:w-1/3 flex justify-center order-first lg:order-0 mb-8 lg:mb-0">
            <Images 
              imgSrc={Fac} 
              className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[90%] xl:w-full max-w-[350px] lg:max-w-none object-contain" 
            />
          </div>
          {/* Right Features */}
          <div className="w-full lg:w-1/3 flex flex-col gap-y-8 md:gap-y-12">
            {rightFeatures.map((item, index) => (
              <Flex key={index} className="flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-y-4 sm:gap-y-0 sm:gap-x-5">
                <Images imgSrc={item.img} className="shrink-0 w-[60px] md:w-[70px] lg:w-auto" />
                <div className="w-full">
                  <h5 className="text-[#223645] text-xl md:text-[22px] font-bold font-int">
                    {item.title}
                  </h5>
                  <p className="text-[#666E77] text-sm md:text-base font-nuni w-full sm:max-w-[260px] mt-2 leading-relaxed md:leading-7 mx-auto sm:mx-0">
                    Est ante in nibh mauris. Ullamcor morbi tincidunt ornare massa
                  </p>
                </div>
              </Flex>
            ))}
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Faciliti;