import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";
import { BsCart3 } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { useStore } from "../../store/useStore";

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart } = useStore();

    // empty wishlist state
    if (wishlist.length === 0) {
        return (
            <div className="bg-[#F9FBF5] min-h-[70vh] py-24 flex items-center justify-center">
                <Container className="px-4 lg:px-0">
                    <Flex className="flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-gray-300 border border-gray-100">
                            <MdFavoriteBorder className="text-5xl" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black font-int text-[#232323] mb-3">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-[#546375] font-nuni text-base mb-8 max-w-md">
                            You haven't saved any items yet. Start exploring our collection and save your favorites here for later.
                        </p>
                        <Link to="/shop">
                            <button className="cursor-pointer bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold font-nuni uppercase tracking-widest py-3.5 px-8 rounded-full transition-all duration-300">
                                Explore Products
                            </button>
                        </Link>
                    </Flex>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-[#F9FBF5] min-h-[70vh] py-20 pb-24">
            <Container className="px-4 lg:px-0">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black font-int text-[#232323] mb-2">
                        My Wishlist
                    </h2>
                    <p className="text-[#546375] font-nuni text-sm">
                        Review your favorite items and add them to your cart.
                    </p>
                </div>
                {/* wishlist */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="bg-white border border-[#e5e5e5] rounded-xl p-5 flex flex-col group hover:border-[#80B500] transition-colors duration-300">
                            {/* image */}
                            <div className="relative w-full h-45 rounded-xl overflow-hidden mb-5 bg-[#f4f6f8] flex items-center justify-center">
                                <Images 
                                    imgSrc={item.image} 
                                    className="w-auto h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                {/* delete button */}
                                <button 
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-3 right-3 bg-red-50 text-red-500 p-2.5 rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                >
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>
                            {/* details */}
                            <h4 className="text-lg font-bold font-int text-[#232323] mb-2 line-clamp-1">
                                {item.title}
                            </h4>
                            <Flex className="items-center justify-between mb-6">
                                <span className="text-[#80B500] font-black text-xl font-nuni">
                                    ${item.price.toFixed(2)}
                                </span>
                            </Flex>
                            {/* action */}
                            <button 
                                onClick={() => addToCart(item)}
                                className="cursor-pointer w-full py-3 rounded-md font-bold font-nuni uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 bg-[#f4f6f8] text-[#232323] hover:bg-[#80B500] hover:text-white"
                            >
                                <BsCart3 className="text-lg" /> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Wishlist;