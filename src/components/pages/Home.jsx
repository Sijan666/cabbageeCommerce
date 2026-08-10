import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(mainRef.current.children).slice(2);
            sections.forEach((section, index) => {
                gsap.set(section, { 
                    zIndex: sections.length - index,
                    position: "relative"
                });
                gsap.fromTo(
                    section,
                    { 
                        opacity: 0, 
                        y: 60 
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none none" 
                        },
                        clearProps: "all" 
                    }
                );
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef}>
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