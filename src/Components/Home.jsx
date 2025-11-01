

import Banner from "./Banner";
import FeaturedFoods from "./FeaturedFoods";
import 'swiper/css';
import 'swiper/css/pagination';
import Testimonial from "./Testimonial";
import HowItWorks from "./HowIt";
import GridFood from "./GridFood";


const Home = () => {
  return (
    <>
    <Banner></Banner>
        <div className="max-w-6xl mx-auto bg-black">
      <FeaturedFoods></FeaturedFoods>
      <GridFood></GridFood>
      <HowItWorks></HowItWorks>
      <Testimonial></Testimonial>

    </div>
    </>

  );
};

export default Home;
