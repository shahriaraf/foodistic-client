import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [sortBy, setSortBy] = useState('expiredDate'); // Default sorting by expired date

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/available-foods?sortBy=${sortBy}`);
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, [sortBy]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Foods</h1>

      <div className="mb-4 flex justify-center">
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border border-gray-300 rounded-lg p-2 text-lg"
        >
          <option value="expiredDate">Sort by Expiry Date</option>
          <option value="foodName">Sort by Food Name</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-amber-50 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <img src={food.foodImage} alt={food.foodName} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{food.foodName}</h3><br />
            <p className="text-gray-600 text-lg">{food.pickupLocation}</p>
            <p className="text-gray-500 text-sm">Expires on: {new Date(food.expiredDate).toLocaleString()}</p>

            <div className="mt-4 text-center">
              <Link to={`/food/${food._id}`}>
                <button className="bg-amber-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
