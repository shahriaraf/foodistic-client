import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageMyFoods = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const response = await axios.get(
          'https://assignment-11-server-jet-one.vercel.app/manage-my-foods',
          { withCredentials: true }
        );
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchMyFoods();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://assignment-11-server-jet-one.vercel.app/delete-food/${id}`,
            { withCredentials: true }
          );
          Swal.fire('Deleted!', 'Your food has been deleted.', 'success');
          setFoods(foods.filter((food) => food._id !== id));
        } catch (error) {
          console.error('Error deleting food:', error);
          Swal.fire('Failed!', 'Failed to delete the food. Please try again.', 'error');
        }
      }
    });
  };

  const handleEditClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
    console.log(food);
  };

  const handleUpdateFood = async () => {
    setIsLoading(true);

    try {
      await axios.patch(
        `https://assignment-11-server-jet-one.vercel.app/manage-my-foods/${selectedFood._id}`,
        {
          foodName: selectedFood.foodName,
          pickupLocation: selectedFood.pickupLocation,
          expiredDate: selectedFood.expiredDate,
        },
        { withCredentials: true }
      );

      Swal.fire('Updated!', 'Food information has been updated.', 'success');

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
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'An unexpected error occurred. Please try again.';
      console.error('Error updating food:', errorMessage);
      Swal.fire('Failed!', errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage My Foods</h1>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No foods available.</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="table-fixed w-[272px] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">
                Food Name
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">
                Expired Date
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="border-t hover:bg-gray-50">
                <td className="px-2 sm:px-6 py-4 text-sm text-gray-800 w-1/5">
                  {food.foodName}
                </td>
                <td className="px-2 sm:px-6 py-4 text-sm text-gray-600 w-1/5">
                  {new Date(food.expiredDate).toLocaleString()}
                </td>
                <td className="px-2 sm:px-6 py-4 text-sm flex flex-wrap space-y-2">
                  <button
                    onClick={() => handleEditClick(food)}
                    className="bg-amber-500 text-white py-1 sm:py-1 px-2 sm:px-1 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none transition duration-200 mr-2"
                    aria-label={`Edit food: ${food.foodName}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 text-white py-1 sm:py-1 px-2 sm:px-1 rounded-lg shadow-md hover:bg-red-600 focus:outline-none transition duration-200"
                    aria-label={`Delete food: ${food.foodName}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Food Information</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">Food Name</label>
            <input
              type="text"
              value={selectedFood.foodName}
              onChange={(e) =>
                setSelectedFood({ ...selectedFood, foodName: e.target.value })
              }
              className="w-full mb-4 border border-gray-300 rounded-lg p-2"
            />
            <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={selectedFood.pickupLocation}
              onChange={(e) =>
                setSelectedFood({ ...selectedFood, pickupLocation: e.target.value })
              }
              className="w-full mb-4 border border-gray-300 rounded-lg p-2" />

            <label className="block mb-2 text-sm font-medium text-gray-700">Expired Date</label>
            <input
              type="date"
              value={selectedFood.expiredDate}
              onChange={(e) => setSelectedFood({ ...selectedFood, expiredDate: e.target.value })}
              placeholder="Enter expiration date"
              className="w-full mb-4 border border-gray-300 rounded-lg p-2"
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateFood}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
