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
    <div className="container mx-auto p-6 pt-44">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-center md:mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-500 bg-black text-gray-500 rounded-lg p-2 text-lg w-1/2"
        />

        {/* Sorting Dropdown */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border border-gray-500 text-gray-500 bg-black rounded-lg p-2 text-lg mb-5 md:mb-0"
        >
          <option value="expiredDate">Sort by Expiry Date</option>
          <option value="foodName">Sort by Food Name</option>
        </select>

        {/* Layout Toggle Button */}
        <button
          onClick={() => setIsThreeColumnLayout(!isThreeColumnLayout)}
          className="hidden md:inline text-gray-500 uppercase font-semibold px-4 py-2 rounded-lg button focus:outline-none"
        >
          Change Layout
        </button>
      </div>

      {/* Food Cards */}
      <div
        className={`grid gap-6 ${isThreeColumnLayout ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
          }`}
      >
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
          >
            <div className="relative">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-56 object-cover"
              />
              <h3 className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm md:text-base font-semibold">
                {food.foodName}
              </h3>
            </div>

            <div className="p-4">
              <p className="text-gray-400 text-sm mb-1">
                <span className="font-medium">{food.pickupLocation}</span>
              </p>
              <p className="text-gray-400 text-sm mb-2">
                Expires on:{" "}
                <span className="font-medium">
                  {new Date(food.expiredDate).toLocaleString()}
                </span>
              </p>

              <p className="text-gray-500 text-sm mb-2">Added by:</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-7 h-7 rounded-full border border-gray-600"
                    src={food.donatorImage}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <p className="text-gray-400 text-xs md:text-sm">
                      {food.donatorEmail}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm hidden md:block">
                      {food.donatorName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                {user ? (
                  <Link to={`/food/${food._id}`}>
                    <button style={{ boxShadow: "0px 0px 6px 0.5px #888" }}  className="bg-gray-900 text-gray-300 hover:bg-gray-700 py-2 px-4 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors duration-200">
                      View Details
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button style={{ boxShadow: "0px 0px 6px 0.5px #888" }}  className="bg-gray-900 text-gray-300 hover:bg-gray-700 py-2 px-4 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors duration-200">
                      View Details
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
