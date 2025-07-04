import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Calendar, MapPin, UtensilsCrossed, ChefHat } from 'lucide-react';

const ManageMyFoods = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockFoods = [
      {
        _id: '1',
        foodName: 'Fresh Vegetables',
        pickupLocation: 'Downtown Market',
        expiredDate: '2025-07-15',
        foodImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'
      },
      {
        _id: '2',
        foodName: 'Homemade Pasta',
        pickupLocation: 'Italian Restaurant',
        expiredDate: '2025-07-10',
        foodImage: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400'
      },
      {
        _id: '3',
        foodName: 'Fresh Bread',
        pickupLocation: 'Local Bakery',
        expiredDate: '2025-07-08',
        foodImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
      }
    ];
    setFoods(mockFoods);
  }, []);

  const handleDelete = async (id) => {
    // Mock confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this food item?');
    if (confirmed) {
      try {
        // Mock delete API call
        setFoods(foods.filter((food) => food._id !== id));
        alert('Food item deleted successfully!');
      } catch (error) {
        console.error('Error deleting food:', error);
        alert('Failed to delete the food item. Please try again.');
      }
    }
  };

  const handleEditClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleUpdateFood = async () => {
    setIsLoading(true);

    try {
      // Mock update API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFoods(
        foods.map((food) =>
          food._id === selectedFood._id
            ? {
              ...food,
              foodName: selectedFood.foodName,
              pickupLocation: selectedFood.pickupLocation,
              expiredDate: selectedFood.expiredDate,
            }
            : food
        )
      );

      setIsModalOpen(false);
      alert('Food information updated successfully!');
    } catch (error) {
      console.error('Error updating food:', error);
      alert('Failed to update food information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Simple Photo Banner */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop" 
          alt="Food Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            Manage My Foods
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {foods.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-slate-700">
              <UtensilsCrossed className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No Foods Available</h3>
              <p className="text-slate-400">Start by adding your first food item to get organized!</p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Food Image
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Food Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Pickup Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Expiration Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {foods.map((food) => (
                    <tr key={food._id} className="hover:bg-slate-700/30 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <img 
                          src={food.foodImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"} 
                          alt={food.foodName}
                          className="w-16 h-16 object-cover rounded-lg border border-slate-600"
                        />
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        {food.foodName}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{food.pickupLocation}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(food.expiredDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEditClick(food)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105"
                            title="Edit food"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(food._id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105"
                            title="Delete food"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="relative max-w-md w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-75"></div>
            
            <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-700">
              <div className="text-center mb-6">
                <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Edit Food Information</h2>
                <p className="text-slate-400">Update your food item details below</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Food Name</label>
                  <input
                    type="text"
                    value={selectedFood?.foodName || ''}
                    onChange={(e) =>
                      setSelectedFood({ ...selectedFood, foodName: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    placeholder="Enter food name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Pickup Location</label>
                  <input
                    type="text"
                    value={selectedFood?.pickupLocation || ''}
                    onChange={(e) =>
                      setSelectedFood({ ...selectedFood, pickupLocation: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    placeholder="Enter pickup location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Expiration Date</label>
                  <input
                    type="date"
                    value={selectedFood?.expiredDate || ''}
                    onChange={(e) => setSelectedFood({ ...selectedFood, expiredDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateFood}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;