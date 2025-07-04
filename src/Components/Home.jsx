

import Banner from "./Banner";
import FeaturedFoods from "./FeaturedFoods";
import 'swiper/css';
import 'swiper/css/pagination';
import Testimonial from "./Testimonial";
import HowItWorks from "./HowIt";


const Home = () => {
  return (
    <div className="bg-black">
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
      <HowItWorks></HowItWorks>
      <Testimonial></Testimonial>


    </div>
  );
};

export default Home;
