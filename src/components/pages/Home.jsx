import Banner from "../layouts/Banner";
import About from "./About";
import Service from "./Service";
import Blog from "./Blog";
import ContactUs from "./Contact";
import Deals from "../layouts/Deals";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Service />
      <Blog />
      <ContactUs />
      <Deals />
    </>
  );
};

export default Home;
