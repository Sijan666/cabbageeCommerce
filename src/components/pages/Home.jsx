import React from "react";
import { Helmet } from "react-helmet-async";

// Layouts
import Ads from "../layouts/Ads";
import Banner from "../layouts/Banner";
import Contact from "../layouts/Contact";
import Deals from "../layouts/Deals";
import Faciliti from "../layouts/Faciliti";
import Featuredproduct from "../layouts/Featuredproduct";
import Member from "../layouts/Member";
import Review from "../layouts/Review";
import Ourproduct from "../layouts/Ourproducts";
import Topcategories from "../layouts/Topcategories";
import Faq from "../layouts/Faq";
import Counter from "../layouts/Counter";
import Blog from "../layouts/Blog";
import CompLogo from "../layouts/CompLogo";

const Home = () => {
    return (
        <main>
            <Helmet>
                <title>Home | Cabbage eCommerce</title>
                <meta name="description" content="Welcome to our website. Discover our best deals, featured products, and top categories." />
                <meta name="keywords" content="ecommerce, shop, best products, deals" />
            </Helmet>
            <Banner />
            <Ads />
            <Featuredproduct />
            <Deals />
            <Ourproduct />
            <Topcategories />
            <Faciliti />
            <Review />
            <Member />
            <Contact />
            <Faq />
            <Counter />
            <Blog />
            <CompLogo />
        </main>
    );
}

export default Home;