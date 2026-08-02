import React from "react";
import Container from "../Container";
import Flex from "../Flex";
import { FaRegEye } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const Blog = () => {

  const blogData = [
    {
      id: 1,
      category: "Health & Wellness",
      title: "The Surprising Health Benefits of Eating Fresh Organic Greens",
      excerpt: "Discover how incorporating fresh, pesticide-free greens into your daily diet can boost your energy levels and improve your overall well-being. From farm directly to your table, our organic approach ensures you get the maximum nutrition.",
      views: "238 Views",
      date: "July 25, 2026",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      category: "Farm to Table",
      title: "How We Source Our Organic Vegetables",
      views: "185 Views",
      date: "July 18, 2026",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      category: "Recipes",
      title: "5 Delicious Ways to Cook Organic Cabbage",
      views: "342 Views",
      date: "July 10, 2026",
      image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="pt-20 md:pt-28 pb-24 md:pb-40 bg-[#F9FBF5]">
      <Container className={"px-4 lg:px-0"}>
        {/* header */}
        <div className="flex flex-col md:flex-row items-end justify-between border-b border-gray-200 pb-8 md:pb-10 mb-10 md:mb-14">
          <div className="w-full md:w-2/3">
            <span className="text-[#80B500] font-nuni font-bold tracking-[0.2em] uppercase text-sm mb-3 block">
              Our Insights
            </span>
            <h3 className="text-4xl md:text-[50px] font-bold text-[#232323] font-int leading-tight">
              Latest Articles
            </h3>
          </div>
          <div className="w-full md:w-1/3 text-left md:text-right mt-4 md:mt-0">
            <p className="text-sm md:text-base text-[#546375] font-nuni leading-relaxed">
              Read our latest articles on organic farming, healthy recipes, and tips for a sustainable lifestyle.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* featured */}
          <div className="lg:col-span-2 lg:row-span-2 bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-[#80B500]/50 transition-colors duration-500 cursor-pointer flex flex-col group">
            {/* image */}
            <div className="w-full h-75 md:h-100">
              <img 
                src={blogData[0].image} 
                alt={blogData[0].title} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* content */}
            <div className="p-8 md:p-10 flex flex-col grow">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-[#80B500]/10 text-[#80B500] border border-[#80B500]/20 px-3 py-1 rounded-full text-xs font-bold font-nuni uppercase tracking-wider">
                  {blogData[0].category}
                </span>
                <Flex className="items-center gap-2 text-[#546375]">
                  <FaRegCalendarDays className="text-[#80B500] text-sm" />
                  <p className="text-sm font-nuni">{blogData[0].date}</p>
                </Flex>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-int text-[#232323] leading-tight mb-4 group-hover:text-[#80B500] transition-colors duration-300">
                {blogData[0].title}
              </h3>
              <p className="text-[#546375] font-nuni leading-relaxed mb-8 max-w-2xl">
                {blogData[0].excerpt}
              </p>
              <Flex className="items-center justify-between text-[#232323] mt-auto border-t border-gray-200 pt-6">
                <Flex className="items-center gap-2 text-[#546375]">
                  <FaRegEye className="text-[#80B500] text-lg" />
                  <p className="text-sm font-nuni">{blogData[0].views}</p>
                </Flex>
                <Flex className="items-center gap-2 font-bold font-nuni text-sm uppercase tracking-widest group-hover:text-[#80B500] transition-colors duration-300">
                  Read Article <FaArrowRight />
                </Flex>
              </Flex>
            </div>
          </div>
          {/* card 1 */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 hover:border-[#80B500]/50 transition-colors duration-500 cursor-pointer flex flex-col group">
            <div className="w-full h-45 rounded-xl overflow-hidden mb-6">
              <img 
                src={blogData[1].image} 
                alt={blogData[1].title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-4 text-[#546375]">
              <span className="text-[#80B500] text-xs font-bold font-nuni uppercase tracking-wider">
                {blogData[1].category}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <p className="text-xs font-nuni">{blogData[1].date}</p>
            </div>
            <h3 className="text-xl font-bold font-int text-[#232323] leading-snug mb-6 group-hover:text-[#80B500] transition-colors duration-300">
              {blogData[1].title}
            </h3>
            <Flex className="items-center justify-between text-[#232323] mt-auto pt-4 border-t border-gray-200">
              <Flex className="items-center gap-2 text-[#546375]">
                <FaRegEye className="text-[#80B500] text-sm" />
                <p className="text-xs font-nuni">{blogData[1].views}</p>
              </Flex>
              <FaArrowRight className="group-hover:text-[#80B500] transition-colors duration-300" />
            </Flex>
          </div>
          {/* Card 2 */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 hover:border-[#80B500]/50 transition-colors duration-500 cursor-pointer flex flex-col group">
            <div className="w-full h-45 rounded-xl overflow-hidden mb-6">
              <img 
                src={blogData[2].image} 
                alt={blogData[2].title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-4 text-[#546375]">
              <span className="text-[#80B500] text-xs font-bold font-nuni uppercase tracking-wider">
                {blogData[2].category}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <p className="text-xs font-nuni">{blogData[2].date}</p>
            </div>
            <h3 className="text-xl font-bold font-int text-[#232323] leading-snug mb-6 group-hover:text-[#80B500] transition-colors duration-300">
              {blogData[2].title}
            </h3>
            <Flex className="items-center justify-between text-[#232323] mt-auto pt-4 border-t border-gray-200">
              <Flex className="items-center gap-2 text-[#546375]">
                <FaRegEye className="text-[#80B500] text-sm" />
                <p className="text-xs font-nuni">{blogData[2].views}</p>
              </Flex>
              <FaArrowRight className="group-hover:text-[#80B500] transition-colors duration-300" />
            </Flex>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;