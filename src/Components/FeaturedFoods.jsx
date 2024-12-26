import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);

  useEffect(() => {
    const fetchFeaturedFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/featured-foods');
        setFeaturedFoods(response.data);
      } catch (error) {
        console.error('Error fetching featured foods:', error);
      }
    };

    fetchFeaturedFoods();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Featured Foods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{food.foodName}</h3>
              <p className="text-gray-600 text-sm">
                <strong>Quantity:</strong> {food.foodQuantity}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Expire Date:</strong> {new Date(food.expiredDate).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm truncate">
                <strong>Notes:</strong> {food.additionalNotes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFoods;
