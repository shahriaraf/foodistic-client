import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMyFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manage-my-foods', {withCredentials: true});
        console.log(response.data); // Log the fetched data
        setFoods(response.data); // Update the state with fetched data
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchMyFoods();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this food?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/delete-food/${id}`, {withCredentials: true});
        alert('Food deleted successfully');
        setFoods(foods.filter((food) => food._id !== id));
      } catch (error) {
        console.error('Error deleting food:', error);
        alert('Failed to delete food');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage My Foods</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Food Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Expired Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{food.foodName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(food.expiredDate).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none transition duration-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyFoods;
