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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="w-full h-56 bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-7 h-7 bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-8 bg-gray-700 rounded w-full mt-6"></div>
      </div>
    </div>
  );

  const isExpiringSoon = (expiredDate) => {
    const today = new Date();
    const expiry = new Date(expiredDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 3 && daysDiff > 0;
  };

  const isExpired = (expiredDate) => {
    const today = new Date();
    const expiry = new Date(expiredDate);
    return expiry < today;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="container mx-auto p-6 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-600 mb-4 relative">
            Available Foods
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-600 rounded-full"></div>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover fresh food donations from generous community members
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-amber-800/20">
          <div className="flex flex-col lg:flex-row gap-6 lg:justify-between lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search for delicious food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-800/20 text-gray-300 placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 text-lg transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
                className="appearance-none bg-gray-900/50 border border-gray-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-800/20 text-gray-300 rounded-xl px-4 py-3 pr-10 text-lg transition-all duration-300 backdrop-blur-sm cursor-pointer"
              >
                <option value="expiredDate">Sort by Expiry Date</option>
                <option value="foodName">Sort by Food Name</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-chevron-down text-gray-400"></i>
              </div>
            </div>

            {/* Layout Toggle Button */}
            <button
              onClick={() => setIsThreeColumnLayout(!isThreeColumnLayout)}
              className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-amber-600 bg-gray-900/50 hover:bg-amber-800/10 border border-gray-600 hover:border-amber-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              <i className={`fa-solid ${isThreeColumnLayout ? 'fa-grip' : 'fa-list'}`}></i>
              <span>{isThreeColumnLayout ? 'Grid View' : 'List View'}</span>
            </button>
          </div>

          {/* Results Counter */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              <span className="text-amber-600 font-semibold">{filteredFoods.length}</span> 
              {filteredFoods.length === 1 ? ' food item' : ' food items'} available
              {searchQuery && (
                <span> matching "<span className="text-amber-600">{searchQuery}</span>"</span>
              )}
            </p>
          </div>
        </div>

        {/* Food Cards */}
        {isLoading ? (
          <div className={`grid gap-6 ${isThreeColumnLayout ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {[...Array(6)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-600 mb-4">
              <i className="fa-solid fa-utensils"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No food found</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search terms' : 'No food donations available at the moment'}
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${isThreeColumnLayout ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {filteredFoods.map((food) => (
              <div
                key={food._id}
                className="group bg-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-700 hover:border-amber-800/50"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  {isExpired(food.expiredDate) ? (
                    <div className="absolute top-3 right-3 bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                      <i className="fa-solid fa-exclamation-triangle mr-1"></i>
                      Expired
                    </div>
                  ) : isExpiringSoon(food.expiredDate) ? (
                    <div className="absolute top-3 right-3 bg-yellow-600/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                      <i className="fa-solid fa-clock mr-1"></i>
                      Expiring Soon
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-green-600/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                      <i className="fa-solid fa-check mr-1"></i>
                      Fresh
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg md:text-xl font-bold mb-2 line-clamp-2">
                      {food.foodName}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <i className="fa-solid fa-location-dot text-amber-600 w-4"></i>
                      <span className="text-sm font-medium">{food.pickupLocation}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400">
                      <i className="fa-solid fa-calendar-days text-amber-600 w-4"></i>
                      <span className="text-sm">
                        Expires: <span className="font-medium">
                          {new Date(food.expiredDate).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Donator Info */}
                  <div className="flex items-center gap-3 mb-6 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full border-2 border-amber-600 object-cover"
                        src={food.donatorImage}
                        alt={food.donatorName}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm font-medium truncate">
                        {food.donatorName}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {food.donatorEmail}
                      </p>
                    </div>
                    <div className="text-amber-600">
                      <i className="fa-solid fa-heart text-sm"></i>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    {user ? (
                      <Link to={`/food/${food._id}`}>
                        <button className="group w-full bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                          <span>View Details</span>
                          <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                        </button>
                      </Link>
                    ) : (
                      <Link to="/login">
                        <button className="group w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-amber-700 hover:to-amber-700 text-gray-300 hover:text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                          <i className="fa-solid fa-sign-in-alt"></i>
                          <span>Login to View</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (if needed) */}
        {filteredFoods.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-800/50 hover:bg-amber-800/20 text-gray-400 hover:text-amber-800 border border-gray-600 hover:border-amber-800 px-8 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm">
              Load More Foods
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;