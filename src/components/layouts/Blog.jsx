import Container from "../Container";
import Flex from "../Flex";
import { FaRegEye } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaChevronCircleRight } from "react-icons/fa";

const Blog = () => {
  return (
    <div className="pt-16 md:pt-26 pb-24 md:pb-48">
      <Container className={'px-4 lg:px-0'}>
        <div className="text-center pb-10 md:pb-14">
          <h3 className="text-3xl md:text-5xl font-bold text-[#232323] font-int">
            Leatest Blog
          </h3>
          <p className="text-sm md:text-base text-[#546375] font-nuni mt-3 md:mt-5">
            A highly efficient slip-ring scanner for today's diagnostic
            requirements.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7.5">
          {/* Blog Card 1 */}
          <div className="rounded-xl shadow-blog group overflow-hidden">
            <div className="mx-3 mt-3 h-[250px] md:h-[280px] bg-[#C8CACF] rounded-sm block"></div>
            <div className="px-4.5 pb-7">
              <Flex className={"pt-5.5 pb-3"}>
                <Flex className={"border-r-2 border-[#80B500]/35 pr-1.5"}>
                  <FaRegEye className="text-[#80B500]" />
                  <p className="pl-1.5 text-sm text-[#647589] font-nuni">
                    238 Views
                  </p>
                </Flex>
                <Flex className={"ml-2"}>
                  <FaRegCalendarDays className="text-[#80B500]" />
                  <p className="pl-1.5 text-sm text-[#647589] font-nuni">
                    July 27, 2020
                  </p>
                </Flex>
              </Flex>
              <h3 className="text-xl md:text-2xl text-[#232323] font-bold font-int w-full leading-8 md:leading-10 group-hover:underline hover:cursor-pointer">
                Pure is the most healthy and most nourishing food
              </h3>
              <p className="text-sm text-[#647589] font-nuni w-full leading-6 md:leading-7 py-4 md:py-5.5">
                Owt to do with me cracking goal arse over tit cup of tea brolly
                in my flat victoria sponge cup of
              </p>
              <Flex
                className={
                  "items-baseline text-[#232323] group-hover:text-[#80B500] duration-500"
                }
              >
                <p className="font-bold font-nuni text-sm md:text-base pr-2">Read More</p>
                <FaChevronCircleRight />
              </Flex>
            </div>
          </div>
          {/* Blog Card 2 */}
          <div className="rounded-xl shadow-blog group overflow-hidden">
            <div className="mx-3 mt-3 h-[250px] md:h-[280px] bg-[#C8CACF] rounded-sm block"></div>
            <div className="px-4.5 pb-7">
              <Flex className={"pt-5.5 pb-3"}>
                <Flex className={"border-r-2 border-[#80B500]/35 pr-1.5"}>
                  <FaRegEye className="text-[#80B500]" />
                  <p className="pl-1.5 text-sm text-[#647589] font-nuni">
                    238 Views
                  </p>
                </Flex>
                <Flex className={"ml-2"}>
                  <FaRegCalendarDays className="text-[#80B500]" />
                  <p className="pl-1.5 text-sm text-[#647589] font-nuni">
                    July 27, 2020
                  </p>
                </Flex>
              </Flex>
              <h3 className="text-xl md:text-2xl text-[#232323] font-bold font-int w-full leading-8 md:leading-10 group-hover:underline hover:cursor-pointer">
                Nature's Path Organic Food Blog is a place to find
              </h3>
              <p className="text-sm text-[#647589] font-nuni w-full leading-6 md:leading-7 py-4 md:py-5.5">
                Owt to do with me cracking goal arse over tit cup of tea brolly
                in my flat victoria sponge cup of
              </p>
              <Flex
                className={
                  "items-baseline text-[#232323] group-hover:text-[#80B500] duration-500"
                }
              >
                <p className="font-bold font-nuni text-sm md:text-base pr-2">Read More</p>
                <FaChevronCircleRight />
              </Flex>
            </div>
          </div>
          {/* Blog Card 3 */}
          <div className="rounded-xl shadow-blog group overflow-hidden">
            <div className="mx-3 mt-3 h-[250px] md:h-[280px] bg-[#C8CACF] rounded-sm block"></div>
            <div className="px-4.5 pb-7">
              <Flex className={"pt-5.5 pb-3"}>
                <Flex className={"border-r-2 border-[#80B500]/35 pr-1.5"}>
                  <FaRegEye className="text-[#80B500]" />
                  <p className="pl-1.5 text-sm text-[#647589] font-nuni">
                    238 Views
                  </p>
                </Flex>
                <Flex className={"ml-2"}>
                  <FaRegCalendarDays className="text-[#80B500]" />
                  <p className="pl-1.5 text-sm text-[#647589] font-nuni">
                    July 27, 2020
                  </p>
                </Flex>
              </Flex>
              <h3 className="text-xl md:text-2xl text-[#232323] font-bold font-int w-full leading-8 md:leading-10 group-hover:underline hover:cursor-pointer">
                Organics is a hair care brand known for its focus on inco
              </h3>
              <p className="text-sm text-[#647589] font-nuni w-full leading-6 md:leading-7 py-4 md:py-5.5">
                Owt to do with me cracking goal arse over tit cup of tea brolly
                in my flat victoria sponge cup of
              </p>
              <Flex
                className={
                  "items-baseline text-[#232323] group-hover:text-[#80B500] duration-500"
                }
              >
                <p className="font-bold font-nuni text-sm md:text-base pr-2">Read More</p>
                <FaChevronCircleRight />
              </Flex>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;