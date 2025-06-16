import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);

  useEffect(() => {
    const fetchFeaturedFoods = async () => {
      try {
        const response = await axios.get('https://assignment-11-server-jet-one.vercel.app/featured-foods', {
          withCredentials: true,
        });
        setFeaturedFoods(response.data);
      } catch (error) {
        console.error('Error fetching featured foods:', error);
      }
    };

    fetchFeaturedFoods();
  }, []);

  return (
    <div className="container bg-black mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">Featured Foods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredFoods.map((food) => (
          <Tilt
            key={food._id}
            glareEnable={true}
            glareMaxOpacity={0.3}
            scale={1.05}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            className="bg-gradient-to-br from-gray-900 to-slate-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full opacity-65 h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-400">{food.foodName}</h3><br />
              <p className="text-gray-500 text-sm">
                <strong className='text-gray-400'>Quantity:</strong> {food.foodQuantity}
              </p>
              <p className="text-gray-500 text-sm">
                <strong className='text-gray-400'>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p className="text-gray-500 text-sm">
                <strong className='text-gray-400'>Expire Date:</strong> {new Date(food.expiredDate).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm truncate">
                <strong className='text-gray-400'>Notes:</strong> {food.additionalNotes}
              </p>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFoods;
