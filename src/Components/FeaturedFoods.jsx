import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Package, StickyNote, Star, Sparkles } from 'lucide-react';

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockFeaturedFoods = [
    {
      _id: '1',
      foodName: 'Gourmet Pizza Margherita',
      foodImage: 'razieh-bakhtom-QyyN-XKiGeM-unsplash.jpg',
      foodQuantity: '2 Large Pizzas',
      pickupLocation: 'Downtown Restaurant, 123 Main St',
      expiredDate: '2025-07-05T18:00:00Z',

    },
    {
      _id: '2',
      foodName: 'Artisan Bread Selection',
      foodImage: 'cecilia-chew-llXDbKi9D5M-unsplash.jpg',
      foodQuantity: '5 Loaves',
      pickupLocation: 'Bakery Corner, 456 Oak Ave',
      expiredDate: '2025-07-06T08:00:00Z',
 
    },
    {
      _id: '3',
      foodName: 'Fresh Fruit Medley',
      foodImage: 'powell-rasull-7YFfGE26kbs-unsplash.jpg',
      foodQuantity: '3 Baskets',
      pickupLocation: 'Organic Market, 789 Green Blvd',
      expiredDate: '2025-07-07T20:00:00Z',
  
    },
    {
      _id: '4',
      foodName: 'Homemade Pasta Dishes',
      foodImage: 'carmen-laezza-8f93r4Ql4xI-unsplash.jpg',
      foodQuantity: '4 Portions',
      pickupLocation: 'Italian Bistro, 321 Pasta Lane',
      expiredDate: '2025-07-05T21:00:00Z',

    },
    {
      _id: '5',
      foodName: 'Vegetable Stir Fry',
      foodImage: 'simona-sergi-QXzUcPen7QM-unsplash.jpg',
      foodQuantity: '6 Servings',
      pickupLocation: 'Healthy Eats, 555 Wellness Way',
      expiredDate: '2025-07-06T19:00:00Z',

    },
    {
      _id: '6',
      foodName: 'Dessert Platter',
      foodImage: 'jordane-mathieu-NzCAZwseOUo-unsplash.jpg',
      foodQuantity: '1 Large Platter',
      pickupLocation: 'Sweet Dreams Bakery, 888 Sugar St',
      expiredDate: '2025-07-07T16:00:00Z',

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
    <div className="min-h-screen py-10 bg-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full -top-1/2 -left-1/2 bg-gradient-to-br from-gray-800/3 via-transparent to-gray-600/3 rotate-12 animate-pulse"></div>
        <div className="absolute w-full h-full delay-1000 -bottom-1/2 -right-1/2 bg-gradient-to-tl from-gray-700/3 via-transparent to-gray-500/3 -rotate-12 animate-pulse"></div>
      </div>

      <div className="container mx-auto max-w-[90rem] px-2 sm:px-4 relative z-10">
        <div className="mb-12 text-center md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            
            <h2 className="text-3xl tracking-widest text-transparent font-extralight sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text">
              Featured Foods
            </h2>
         
          </div>
          <p className="max-w-2xl mx-auto text-sm text-gray-400 sm:text-base md:text-xl font-extralight">
            Discover amazing food items ready for pickup. Help reduce waste while enjoying delicious meals!
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 bg-gray-900/50 rounded-3xl animate-pulse">
                <div className="h-48 mb-4 bg-gradient-to-br from-gray-700/20 to-gray-600/20 rounded-2xl"></div>
                <div className="h-6 mb-3 rounded-lg bg-gradient-to-r from-gray-700/20 to-gray-600/20"></div>
                <div className="space-y-2">
                  <div className="h-4 rounded-lg bg-gradient-to-r from-gray-700/10 to-gray-600/10"></div>
                  <div className="w-3/4 h-4 rounded-lg bg-gradient-to-r from-gray-700/10 to-gray-600/10"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {featuredFoods.map((food, index) => (
              <div key={food._id} className="relative group" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative overflow-hidden transition-all duration-500 border bg-gray-900/50 backdrop-blur-sm rounded-3xl border-gray-700/50 hover:border-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/20 hover:-translate-y-2">
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-gray-700/5 via-transparent to-gray-600/5 group-hover:opacity-100"></div>
                  <div className="relative overflow-hidden">
                    <img src={food.foodImage} alt={food.foodName} className="object-cover w-full h-56 transition-transform duration-700 sm:h-64 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-extralight ${getUrgencyColor(food.expiredDate)} backdrop-blur-sm`}>
                      {formatDate(food.expiredDate)}
                    </div>
                    <div className="absolute flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-full opacity-0 cursor-pointer bottom-4 right-4 bg-gradient-to-r from-gray-700 to-gray-600 group-hover:opacity-100 hover:scale-110">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="p-5 space-y-4 sm:p-6">
                    <h3 className="text-lg text-white transition-colors duration-300 font-extralight sm:text-xl md:text-2xl group-hover:text-gray-200">
                      {food.foodName}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-gray-700/20 to-gray-600/20">
                          <Package className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-extralight"><span className="text-gray-400">Quantity:</span> {food.foodQuantity}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-gray-700/20 to-gray-600/20">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-extralight"><span className="text-gray-400">Location:</span> {food.pickupLocation}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-gray-700/20 to-gray-600/20">
                          <Clock className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-extralight"><span className="text-gray-400">Expires:</span> {new Date(food.expiredDate).toLocaleString()}</span>
                      </div>
                  
                    </div>

                    <button className="w-full px-6 py-3 mt-6 text-white transition-all duration-300 font-extralight bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-500 hover:shadow-lg hover:shadow-gray-500/25 hover:scale-105 active:scale-95">
                      Request Pickup
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center md:mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 border rounded-full bg-gradient-to-r from-gray-700/20 to-gray-600/20 backdrop-blur-sm border-gray-500/30">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <span className="text-gray-200 font-extralight">More delicious items coming soon!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFoods;