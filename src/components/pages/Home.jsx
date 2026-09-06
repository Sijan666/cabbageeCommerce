import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../layouts/Banner";
import Faq from "../layouts/Faq";
import Counter from "../layouts/Counter";
import Blog from "../layouts/Blog";
import CompLogo from "../layouts/CompLogo";
import PromoBanners from "../layouts/PromoBanners";
import FeaturedProducts from "../layouts/FeaturedProducts";
import DailyDeals from "../layouts/DailyDeals";
import ProductCollection from "../layouts/ProductCollection";
import ProductSpotlight from "../layouts/ProductSpotlight";
import NewArrivals from "../layouts/NewArrivals";
import BestSellers from "../layouts/BestSellers";
import TopCategories from "../layouts/Topcategories";

const Home = () => {
    return (
        <main>
            <Helmet>
                <title>Home | Cabbage eCommerce</title>
                <meta 
                    name="description" 
                    content="Welcome to our website. Discover our best deals, featured products, and top categories." 
                />
                <meta 
                    name="keywords" 
                    content="ecommerce, shop, best products, deals" 
                />
            </Helmet>
            <Banner />
            <PromoBanners />
            <FeaturedProducts />
            <DailyDeals />
            <ProductCollection />
            <TopCategories />
            <ProductSpotlight />
            <NewArrivals />
            <BestSellers />
            <Faq />
            <Counter />
            <Blog />
            <CompLogo />
        </main>
    );
};

export default Home;