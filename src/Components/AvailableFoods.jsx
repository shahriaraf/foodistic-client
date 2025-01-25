import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './Authprovider';

const AvailableFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [sortBy, setSortBy] = useState('expiredDate'); // Default sorting by expired date
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [isThreeColumnLayout, setIsThreeColumnLayout] = useState(true); // State to toggle layout

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          `https://assignment-11-server-jet-one.vercel.app/available-foods-public?sortBy=${sortBy}`
        );

        setFoods(response.data);
        setFilteredFoods(response.data); // Initialize filteredFoods with fetched data
      } catch (error) {
        console.error('Error fetching foods:', error);
        // Handle the 401 Unauthorized error (if needed, redirect to login or show alert)
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access - please login.');
          console.log(user);
          // Optionally redirect to login page
        }
      }
    };

    fetchFoods();
  }, [sortBy, user]); // Re-run the fetch when sortBy or user changes

  useEffect(() => {
    // Filter foods based on the search query
    const results = foods.filter((food) =>
      food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFoods(results);
  }, [searchQuery, foods]); // Recalculate filteredFoods when searchQuery or foods change

  return (
    <div className="container mx-auto mt-16 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Available Foods</h1>
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-center md:mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by food name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-lg w-1/2"
        />

        {/* Sorting Dropdown */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border border-gray-100 bg-amber-100 rounded-lg p-2 text-lg mb-5 md:mb-0"
        >
          <option value="expiredDate">Sort by Expiry Date</option>
          <option value="foodName">Sort by Food Name</option>
        </select>

        {/* Layout Toggle Button */}
        <button
          onClick={() => setIsThreeColumnLayout(!isThreeColumnLayout)}
          className="hidden md:inline bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Change Layout
        </button>
      </div>

      {/* Food Cards */}
      <div
        className={`grid gap-6 ${
          isThreeColumnLayout ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-amber-50 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{food.foodName}</h3>
            <p className="text-gray-600 text-lg">{food.pickupLocation}</p>
            <p className="text-gray-500 text-sm">Expires on: {new Date(food.expiredDate).toLocaleString()}</p>

            <div className="mt-4 text-center">
              {user ? (
                <Link to={`/food/${food._id}`}>
                  <button className="bg-amber-500 text-black py-2 px-4 rounded-md hover:bg-amber-700 hover:text-white focus:outline-none">
                    View Details
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="bg-amber-500 text-black py-2 px-4 rounded-md hover:bg-amber-700 hover:text-white focus:outline-none">
                    View Details
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
