import Ads from "../layouts/Ads";
import Banner from "../layouts/Banner";
import Contact from "../layouts/Contact";
import Deals from "../layouts/Deals";
import Faciliti from "../layouts/Faciliti";
import Featuredproduct from "../layouts/Featuredproduct"
import Member from "../layouts/Member";
import Review from "../layouts/Review";
import Ourproduct from "../layouts/Ourproducts";


const Home = () => {
    return (
        <>
        <Banner/>
        <Ads/>
        <Featuredproduct/>
        <Deals/>
        <Ourproduct/>
        <Faciliti />
        <Review />
        <Member />
        <Contact />
        </>
    )
}

export default Home;
