import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../Container";
import Flex from "../Flex";
import Product from "../Product";
import Images from "../Images";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useStore } from "../../store/useStore"; 

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customProducts } = useStore();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://dummyjson.com/products?limit=12&sortBy=id&order=desc");
        const apiProducts = response.data.products || [];
        const formattedCustom = customProducts
          .filter(p => !p.isDeleted)
          .map(p => ({
            id: `custom-${p.id}`,
            title: p.title,
            description: p.desc || "Freshly added item from admin panel.",
            price: parseFloat(p.price) || 0,
            discountPercentage: parseFloat(p.discountPercentage) || 10,
            rating: parseFloat(p.rating) || 5,
            thumbnail: p.image,
            stock: parseInt(p.stock) || 50,
            category: p.category || 'new-arrival',
          }));
        const combined = [...formattedCustom, ...apiProducts].slice(0, 8);
        setNewArrivals(combined);
      } catch (error) {
        console.error("Failed to fetch new arrival products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, [customProducts]);

  const getOriginalPrice = (price, discount) => { 
    return `$${(price / (1 - discount / 100)).toFixed(2)}`; 
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<FaStar key={i} className="text-[#FFB800] text-[11px] sm:text-[13px]" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(<FaStarHalfAlt key={i} className="text-[#FFB800] text-[11px] sm:text-[13px]" />);
        } else {
            stars.push(<FaStar key={i} className="text-[#e5e7eb] text-[11px] sm:text-[13px]" />);
        }
    }
    return (
        <Flex className="items-center gap-x-2">
            <Flex className="items-center gap-x-0.5">{stars}</Flex>
            <span className="text-[#80B500] bg-[#f0f8eb] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">(15)</span>
        </Flex>
    );
  };

  return (
    <div className="bg-[#F7F5EB] py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-white opacity-40 blur-[120px] rounded-full pointer-events-none"></div>
      <Container className="px-4 lg:px-0 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#232323] font-int relative inline-block">
            New Arrivals
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#80B500] rounded-full"></span>
          </h3>
          <p className="text-sm md:text-base text-[#546375] font-nuni mt-6 max-w-2xl mx-auto">
            Discover our latest additions, fresh stocks, and trending products handpicked for you.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#80B500] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div key={product.id}>
                <Product 
                  productId={product.id}
                  imgString={product.thumbnail}
                  productImg={
                    <Images 
                      imgSrc={product.thumbnail} 
                      alt={product.title} 
                      className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 mix-blend-multiply p-4" 
                    />
                  }
                  productTitle={product.title}
                  productPrice={`$${product.price.toFixed(2)}`}
                  productOffer={product.discountPercentage ? getOriginalPrice(product.price, product.discountPercentage) : null}
                  badge={`NEW`}
                  productRatings={renderStars(product.rating || 5)}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewArrivals;