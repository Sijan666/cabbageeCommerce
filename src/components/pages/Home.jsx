import Banner from "../layouts/Banner";
import About from "./About";
import Service from "./Service";
// import ContactUs from "./Contact";
import Deals from "../layouts/Deals";
import Faciliti from "../layouts/Faciliti";
import Review from "../layouts/Review";
import Member from "../layouts/Member";
import Contact from "../layouts/Contact";
import Blog from "../layouts/Blog";
import CompLogo from "../layouts/CompLogo";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Service />
      <Deals />
      <Faciliti />
      <Review />
      <Member />
      <Contact />
      <Blog />
      <CompLogo />
    </>
  );
};

export default Home;
