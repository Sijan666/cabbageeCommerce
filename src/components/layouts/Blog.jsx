import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Flex from "../Flex";
import { FaRegUser, FaArrowRight } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Reasons to Switch to Organic Vegetables Today",
      excerpt: "Discover the amazing health benefits of organic farming and why you should make the switch for your family's daily meals.",
      category: "Health & Nutrition",
      date: "August 12, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/vegetables,organic?lock=1"
    },
    {
      id: 2,
      title: "How to Store Fresh Fruits to Make Them Last Longer",
      excerpt: "Tired of your fresh produce going bad too quickly? Follow these simple storage hacks to keep your fruits fresh for weeks.",
      category: "Tips & Tricks",
      date: "August 05, 2026",
      author: "Sarah Jane",
      image: "https://loremflickr.com/800/600/fruits,fresh?lock=2"
    },
    {
      id: 3,
      title: "The Ultimate Guide to a Healthy Green Salad",
      excerpt: "Learn how to build the perfect, nutrient-packed green salad using our daily fresh arrivals and homemade dressings.",
      category: "Recipes",
      date: "July 28, 2026",
      author: "Chef Mike",
      image: "https://loremflickr.com/800/600/salad,healthy?lock=3"
    },
    {
      id: 4,
      title: "Why Farm-to-Table is Changing the Food Industry",
      excerpt: "Explore how sourcing food directly from local farmers is improving food quality and supporting local communities.",
      category: "Lifestyle",
      date: "July 20, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/farm,food?lock=4"
    },
    {
      id: 5,
      title: "Top 5 Superfoods You Need in Your Daily Diet",
      excerpt: "Boost your immunity and energy levels with these top 5 easily accessible superfoods available in our store.",
      category: "Health & Nutrition",
      date: "July 15, 2026",
      author: "Dr. Emily",
      image: "https://loremflickr.com/800/600/superfood,diet?lock=5"
    },
    {
      id: 6,
      title: "A Beginner's Guide to Vegan Cooking at Home",
      excerpt: "Thinking about trying a plant-based diet? Here is everything you need to know to start cooking delicious vegan meals.",
      category: "Recipes",
      date: "July 02, 2026",
      author: "Sarah Jane",
      image: "https://loremflickr.com/800/600/vegan,cooking?lock=6"
    },
    {
      id: 7,
      title: "The Benefits of a Gluten-Free Diet Uncovered",
      excerpt: "Is a gluten-free lifestyle right for you? We break down the science, the myths, and how to transition smoothly.",
      category: "Health & Nutrition",
      date: "June 25, 2026",
      author: "Dr. Emily",
      image: "https://loremflickr.com/800/600/glutenfree,food?lock=7"
    },
    {
      id: 8,
      title: "5 Easy Ways to Reduce Food Waste at Home",
      excerpt: "Learn practical and creative ways to utilize leftovers, compost scraps, and reduce your environmental footprint.",
      category: "Sustainability",
      date: "June 18, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/kitchen,vegetables?lock=8"
    },
    {
      id: 9,
      title: "Exploring the World of Exotic Tropical Fruits",
      excerpt: "From Dragon Fruit to Rambutan, expand your palate by exploring the nutritional powerhouses from the tropics.",
      category: "Lifestyle",
      date: "June 10, 2026",
      author: "Chef Mike",
      image: "https://loremflickr.com/800/600/tropical,fruits?lock=9"
    },
    {
      id: 10,
      title: "The Secret to the Perfect Homemade Pasta",
      excerpt: "Ditch the boxed stuff. We show you how to make authentic, mouth-watering pasta using only 3 organic ingredients.",
      category: "Recipes",
      date: "June 03, 2026",
      author: "Sarah Jane",
      image: "https://loremflickr.com/800/600/pasta,homemade?lock=10"
    },
    {
      id: 11,
      title: "Why Hydration is the Key to Glowing Skin",
      excerpt: "It's not just about creams and serums. Discover how eating water-rich fruits and veggies can transform your skin.",
      category: "Tips & Tricks",
      date: "May 28, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/water,fresh?lock=11"
    },
    {
      id: 12,
      title: "Understanding Food Labels: What to Look For",
      excerpt: "Navigate the grocery aisles like a pro by learning how to decode confusing nutrition labels and ingredient lists.",
      category: "Health & Nutrition",
      date: "May 20, 2026",
      author: "Dr. Emily",
      image: "https://loremflickr.com/800/600/grocery,healthy?lock=12"
    }
  ];
  // eslint-disable-next-line react-hooks/purity
  const displayedBlogs = [...blogPosts].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="pt-20 md:pt-28 pb-24 md:pb-40 bg-[#F9FBF5]">
      <Container className={"px-4 lg:px-0"}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-[#80B500]/50 transition-colors duration-500 flex flex-col group shadow-sm hover:shadow-md">
              {/* Image Section */}
              <Link to={`/blogs/${post.id}`} className="w-full h-56 rounded-2xl overflow-hidden mb-6 block bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
              </Link>
              {/* Content Section */}
              <div className="flex flex-col grow">
                <div className="flex items-center gap-3 mb-4 text-[#546375]">
                  <span className="bg-[#80B500]/10 text-[#80B500] px-3 py-1 rounded-full text-xs font-bold font-nuni uppercase tracking-wider">
                    {post.category}
                  </span>
                  <Flex className="items-center gap-2">
                    <FaRegCalendarDays className="text-gray-400 text-xs" />
                    <p className="text-xs font-nuni">{post.date}</p>
                  </Flex>
                </div>
                <Link to={`/blogs/${post.id}`}>
                  <h3 className="text-xl md:text-2xl font-bold font-int text-[#232323] leading-snug mb-4 hover:text-[#80B500] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-[#546375] font-nuni leading-relaxed mb-6 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                {/* Footer Section */}
                <Flex className="items-center justify-between text-[#232323] mt-auto pt-5 border-t border-gray-100">
                  <Flex className="items-center gap-2 text-[#546375]">
                    <FaRegUser className="text-[#80B500] text-sm" />
                    <p className="text-sm font-nuni font-semibold">{post.author}</p>
                  </Flex>
                  <Link to={`/blogs/${post.id}`} className="flex items-center gap-2 text-sm font-bold font-nuni uppercase tracking-widest text-[#232323] hover:text-[#80B500] transition-colors duration-300">
                    Read <FaArrowRight />
                  </Link>
                </Flex>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;