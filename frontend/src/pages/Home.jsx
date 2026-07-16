import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Deals from "../components/home/Deals";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Deals />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;