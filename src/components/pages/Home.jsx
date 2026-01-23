import Ads from "../layouts/Ads";
import Banner from "../layouts/Banner";
import Contact from "../layouts/Contact";
import Deals from "../layouts/Deals";
import Faciliti from "../layouts/Faciliti";
import Featuredproduct from "../layouts/Featuredproduct"
import Member from "../layouts/Member";
import Review from "../layouts/Review";
import Ourproduct from "../layouts/Ourproducts";
import Topcategories from "../layouts/Topcategories";
import Topslider from "../layouts/Topslider";
import Faq from "../layouts/Faq";
import Counter from "../layouts/Counter";


const Home = () => {
    return (
        <>
        <Banner/>
        <Ads/>
        <Featuredproduct/>
        <Deals/>
        <Ourproduct/>
        <Topcategories/>
        <Topslider/>
        <Faciliti />
        <Review />
        <Member />
        <Contact />
        <Faq/>
        <Counter/>
        </>
    )
}

export default Home;
