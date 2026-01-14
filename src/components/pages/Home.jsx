import Banner from "../layouts/Banner";
import About from "./About";
import Service from "./Service";
import Blog from "./Blog";
// import ContactUs from "./Contact";
import Deals from "../layouts/Deals";
import Faciliti from "../layouts/Faciliti";
import Review from "../layouts/Review";
import Member from "../layouts/Member";
import Contact from "../layouts/Contact";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Service />
      <Blog />
      <Deals />
      <Faciliti />
      <Review />
      <Member />
      <Contact />
    </>
  );
};

export default Home;
