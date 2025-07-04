import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Package, StickyNote, Star, Sparkles } from 'lucide-react';

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockFeaturedFoods = [
    {
      _id: '1',
      foodName: 'Gourmet Pizza Margherita',
      foodImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      foodQuantity: '2 Large Pizzas',
      pickupLocation: 'Downtown Restaurant, 123 Main St',
      expiredDate: '2025-07-05T18:00:00Z',
      additionalNotes: 'Freshly made with organic ingredients, perfect for dinner!'
    },
    {
      _id: '2',
      foodName: 'Artisan Bread Selection',
      foodImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      foodQuantity: '5 Loaves',
      pickupLocation: 'Bakery Corner, 456 Oak Ave',
      expiredDate: '2025-07-06T08:00:00Z',
      additionalNotes: 'Variety of sourdough, whole wheat, and rye bread'
    },
    {
      _id: '3',
      foodName: 'Fresh Fruit Medley',
      foodImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
      foodQuantity: '3 Baskets',
      pickupLocation: 'Organic Market, 789 Green Blvd',
      expiredDate: '2025-07-07T20:00:00Z',
      additionalNotes: 'Mix of seasonal fruits including apples, oranges, and berries'
    },
    {
      _id: '4',
      foodName: 'Homemade Pasta Dishes',
      foodImage: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
      foodQuantity: '4 Portions',
      pickupLocation: 'Italian Bistro, 321 Pasta Lane',
      expiredDate: '2025-07-05T21:00:00Z',
      additionalNotes: 'Includes carbonara, marinara, and pesto varieties'
    },
    {
      _id: '5',
      foodName: 'Vegetable Stir Fry',
      foodImage: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
      foodQuantity: '6 Servings',
      pickupLocation: 'Healthy Eats, 555 Wellness Way',
      expiredDate: '2025-07-06T19:00:00Z',
      additionalNotes: 'Colorful mix of seasonal vegetables with Asian-inspired flavors'
    },
    {
      _id: '6',
      foodName: 'Dessert Platter',
      foodImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      foodQuantity: '1 Large Platter',
      pickupLocation: 'Sweet Dreams Bakery, 888 Sugar St',
      expiredDate: '2025-07-07T16:00:00Z',
      additionalNotes: 'Assorted cakes, cookies, and pastries perfect for sharing'
    }
  ];

  useEffect(() => {
    const fetchFeaturedFoods = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFeaturedFoods(mockFeaturedFoods);
      } catch (error) {
        console.error('Error fetching featured foods:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedFoods();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.ceil((date - now) / (1000 * 60 * 60));
    if (diffInHours < 24) return `${diffInHours}h remaining`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getUrgencyColor = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.ceil((date - now) / (1000 * 60 * 60));
    if (diffInHours < 6) return 'text-red-400 bg-red-500/20';
    if (diffInHours < 24) return 'text-orange-400 bg-orange-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-gray-800/3 via-transparent to-gray-600/3 rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-gray-700/3 via-transparent to-gray-500/3 -rotate-12 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto max-w-[90rem] px-2 sm:px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-gray-400 animate-pulse" />
              <div className="absolute inset-0 blur-sm">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Featured Foods
            </h2>
            <div className="relative">
              <Star className="w-8 h-8 text-gray-400 animate-pulse" />
              <div className="absolute inset-0 blur-sm">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover amazing food items ready for pickup. Help reduce waste while enjoying delicious meals!
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-3xl p-6 animate-pulse">
                <div className="h-48 bg-gradient-to-br from-gray-700/20 to-gray-600/20 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-700/10 to-gray-600/10 rounded-lg"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700/10 to-gray-600/10 rounded-lg w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredFoods.map((food, index) => (
              <div key={food._id} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/20 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/5 via-transparent to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative overflow-hidden">
                    <img src={food.foodImage} alt={food.foodName} className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(food.expiredDate)} backdrop-blur-sm`}>
                      {formatDate(food.expiredDate)}
                    </div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                      {food.foodName}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium"><span className="text-gray-400">Quantity:</span> {food.foodQuantity}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium"><span className="text-gray-400">Location:</span> {food.pickupLocation}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium"><span className="text-gray-400">Expires:</span> {new Date(food.expiredDate).toLocaleString()}</span>
                      </div>
                      <div className="flex items-start gap-3 text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <StickyNote className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium"><span className="text-gray-400">Notes:</span></span>
                          <p className="text-sm text-gray-400 mt-1 leading-relaxed">{food.additionalNotes}</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-6 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25 hover:scale-105 active:scale-95">
                      Request Pickup
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16 md:mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-full backdrop-blur-sm border border-gray-500/30">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <span className="text-gray-200 font-medium">More delicious items coming soon!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFoods;