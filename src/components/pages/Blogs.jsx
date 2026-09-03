import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container"; 
import Flex from "../Flex";
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Blogs = () => {

  const blogPosts = [
    {
      id: 1,
      title: "10 Reasons to Switch to Organic Vegetables Today",
      excerpt: "Discover the amazing health benefits of organic farming and why you should make the switch for your family's daily meals.",
      category: "Health & Nutrition",
      date: "August 12, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/vegetables?lock=1"
    },
    {
      id: 2,
      title: "How to Store Fresh Fruits to Make Them Last Longer",
      excerpt: "Tired of your fresh produce going bad too quickly? Follow these simple storage hacks to keep your fruits fresh for weeks.",
      category: "Tips & Tricks",
      date: "August 05, 2026",
      author: "Sarah Jane",
      image: "https://loremflickr.com/800/600/fruits?lock=2"
    },
    {
      id: 3,
      title: "The Ultimate Guide to a Healthy Green Salad",
      excerpt: "Learn how to build the perfect, nutrient-packed green salad using our daily fresh arrivals and homemade dressings.",
      category: "Recipes",
      date: "July 28, 2026",
      author: "Chef Mike",
      image: "https://loremflickr.com/800/600/salad?lock=3"
    },
    {
      id: 4,
      title: "Why Farm-to-Table is Changing the Food Industry",
      excerpt: "Explore how sourcing food directly from local farmers is improving food quality and supporting local communities.",
      category: "Lifestyle",
      date: "July 20, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/farming?lock=4"
    },
    {
      id: 5,
      title: "Top 5 Superfoods You Need in Your Daily Diet",
      excerpt: "Boost your immunity and energy levels with these top 5 easily accessible superfoods available in our store.",
      category: "Health & Nutrition",
      date: "July 15, 2026",
      author: "Dr. Emily",
      image: "https://loremflickr.com/800/600/superfood?lock=5"
    },
    {
      id: 6,
      title: "A Beginner's Guide to Vegan Cooking at Home",
      excerpt: "Thinking about trying a plant-based diet? Here is everything you need to know to start cooking delicious vegan meals.",
      category: "Recipes",
      date: "July 02, 2026",
      author: "Sarah Jane",
      image: "https://loremflickr.com/800/600/vegan?lock=6"
    },
    {
      id: 7,
      title: "The Benefits of a Gluten-Free Diet Uncovered",
      excerpt: "Is a gluten-free lifestyle right for you? We break down the science, the myths, and how to transition smoothly.",
      category: "Health & Nutrition",
      date: "June 25, 2026",
      author: "Dr. Emily",
      image: "https://loremflickr.com/800/600/glutenfree?lock=7"
    },
    {
      id: 8,
      title: "5 Easy Ways to Reduce Food Waste at Home",
      excerpt: "Learn practical and creative ways to utilize leftovers, compost scraps, and reduce your environmental footprint.",
      category: "Sustainability",
      date: "June 18, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/kitchen?lock=8"
    },
    {
      id: 9,
      title: "Exploring the World of Exotic Tropical Fruits",
      excerpt: "From Dragon Fruit to Rambutan, expand your palate by exploring the nutritional powerhouses from the tropics.",
      category: "Lifestyle",
      date: "June 10, 2026",
      author: "Chef Mike",
      image: "https://loremflickr.com/800/600/tropical?lock=9"
    },
    {
      id: 10,
      title: "The Secret to the Perfect Homemade Pasta",
      excerpt: "Ditch the boxed stuff. We show you how to make authentic, mouth-watering pasta using only 3 organic ingredients.",
      category: "Recipes",
      date: "June 03, 2026",
      author: "Sarah Jane",
      image: "https://loremflickr.com/800/600/pasta?lock=10"
    },
    {
      id: 11,
      title: "Why Hydration is the Key to Glowing Skin",
      excerpt: "It's not just about creams and serums. Discover how eating water-rich fruits and veggies can transform your skin.",
      category: "Tips & Tricks",
      date: "May 28, 2026",
      author: "Admin",
      image: "https://loremflickr.com/800/600/water?lock=11"
    },
    {
      id: 12,
      title: "Understanding Food Labels: What to Look For",
      excerpt: "Navigate the grocery aisles like a pro by learning how to decode confusing nutrition labels and ingredient lists.",
      category: "Health & Nutrition",
      date: "May 20, 2026",
      author: "Dr. Emily",
      image: "https://loremflickr.com/800/600/grocery?lock=12"
    }
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Safe Image Fallback System
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = "https://placehold.co/800x600/F4F7F0/80B500?text=Cabbage+Blog";
  };

  return (
    <div className="bg-[#F7F9F2] min-h-screen py-16 md:py-24 font-nuni">
      <Container className="px-4 lg:px-0 max-w-300 mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#80B500]/10 border border-[#80B500]/20 text-[#80B500] font-nuni font-bold tracking-[0.2em] text-xs mb-4 uppercase cursor-default">
            <span className="w-2 h-2 rounded-full bg-[#80B500] mr-2"></span>
            News & Articles
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-int text-[#232323] mb-4 tracking-tight">
            Read Our Latest <span className="text-[#80B500]">Blogs</span>
          </h2>
          <p className="text-base font-nuni text-[#546375] leading-relaxed">
            Stay updated with the latest trends in healthy eating, farm-fresh recipes, and tips to maintain a sustainable lifestyle.
          </p>
        </div>
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-4xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(128,181,0,0.1)] hover:-translate-y-2 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden shrink-0 bg-[#F4F7F0]">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-[#80B500] uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
                <Link to={`/blogs/${post.id}`} className="block w-full h-full">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    onError={handleImageError} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {/* Content Section */}
              <div className="p-8 flex flex-col grow">
                <Flex className="items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  <Flex className="items-center gap-1.5">
                    <Calendar className="text-[#80B500] w-3.5 h-3.5" />
                    {post.date}
                  </Flex>
                  <Flex className="items-center gap-1.5">
                    <User className="text-[#80B500] w-3.5 h-3.5" />
                    {post.author}
                  </Flex>
                </Flex>
                <h3 className="text-xl md:text-2xl font-black font-int text-[#232323] leading-tight mb-4 group-hover:text-[#80B500] transition-colors duration-300 line-clamp-2">
                  <Link to={`/blogs/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-[#546375] text-sm leading-relaxed mb-6 line-clamp-3 grow">
                  {post.excerpt}
                </p>
                <div className="border-t border-gray-100 pt-5 mt-auto">
                  <Link 
                    to={`/blogs/${post.id}`} 
                    className="inline-flex items-center gap-2 text-[#232323] font-black font-nuni text-sm uppercase tracking-widest hover:text-[#80B500] transition-colors duration-300 group/link"
                  >
                    Read More 
                    <ArrowRight className="text-[#80B500] w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dynamic Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-3">
            {/* Previous Button */}
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                currentPage === 1 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-gray-200 text-gray-500 hover:border-[#80B500] hover:text-[#80B500] hover:bg-[#80B500]/5 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer ${
                  currentPage === index + 1
                  ? 'bg-[#80B500] text-white shadow-md border border-[#80B500]'
                  : 'border border-gray-200 text-[#232323] hover:border-[#80B500] hover:text-[#80B500] hover:bg-[#80B500]/5'
                }`}
              >
                {index + 1}
              </button>
            ))}
            {/* Next Button */}
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                currentPage === totalPages 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-gray-200 text-gray-500 hover:border-[#80B500] hover:text-[#80B500] hover:bg-[#80B500]/5 cursor-pointer'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Blogs;