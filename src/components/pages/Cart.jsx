import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Flex from "../Flex";
import { BsCartX } from "react-icons/bs"; 

const Cart = () => {
    return (
        <div className="bg-[#F9FBF5] min-h-[70vh] py-24 flex items-center justify-center">
            <Container className="px-4 lg:px-0">
                <Flex className="flex-col items-center justify-center text-center">
                    {/* Empty */}
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-gray-300 border border-gray-100">
                        <BsCartX className="text-5xl" />
                    </div>
                    {/* Text */}
                    <h2 className="text-3xl md:text-4xl font-black font-int text-[#232323] mb-3">
                        Your Cart is Empty
                    </h2>
                    <p className="text-[#546375] font-nuni text-base mb-8 max-w-md">
                        Looks like you haven't added anything to your cart yet. Browse our products and find something you love!
                    </p>
                    {/* Action Button */}
                    <Link to="/shop">
                        <button className="cursor-pointer bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold font-nuni uppercase tracking-widest py-3.5 px-8 rounded-full transition-all duration-300">
                        Return to Shop
                        </button>
                    </Link>
                </Flex>
            </Container>
        </div>
    );
};

export default Cart;