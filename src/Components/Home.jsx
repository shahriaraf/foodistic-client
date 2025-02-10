

import Banner from "./Banner";
import FeaturedFoods from "./FeaturedFoods";

const Home = () => {
  return (
    <div className="bg-black">
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>

      {/* How It Works Section */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-gray-900 shadow-lg rounded-lg">
            <img
              src="https://i.ibb.co.com/xGLGqVF/360-F-279757414-o2-KNn-B8f-Z2eah-IK6-Sqyd-L4t-GFk-O5-RDH5.jpg"
              alt="Step 1"
              className="w-full opacity-65 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Discover</h3>
            <p className="text-gray-500">
              Browse through a wide selection of fresh food donations available near you.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-900 shadow-lg rounded-lg">
            <img
              src="https://i.ibb.co.com/P9C7pGp/online-ordering-business.jpg"
              alt="Step 2"
              className="w-full opacity-65 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Request</h3>
            <p className="text-gray-500">
              Easily request food items that suit your needs with just a few clicks.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-900 shadow-lg rounded-lg">
            <img
              src="https://i.ibb.co.com/PQtMkPL/1697434513833.jpg"
              alt="Step 3"
              className="w-full opacity-65 h-max mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Pickup</h3>
            <p className="text-gray-500">
              Collect your food from the specified location and enjoy your meal!
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <p className="text-gray-500 italic mb-4">
              "This platform has been a lifesaver! The food I received was fresh and exactly what I
              needed."
            </p>
            <h3 className="text-lg font-bold text-gray-800">- Sarah M.</h3>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <p className="text-gray-500 italic mb-4">
              "I’m amazed at how easy it is to use. It feels good knowing I’m helping reduce food
              waste."
            </p>
            <h3 className="text-lg font-bold text-gray-800">- John D.</h3>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <p className="text-gray-500 italic mb-4">
              "The food is always fresh, and the process is so simple. Thank you for this
              initiative!"
            </p>
            <h3 className="text-lg font-bold text-gray-800">- Emily R.</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
