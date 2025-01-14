import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageMyFoods = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null); // State to store the food being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle the modal

  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const response = await axios.get('https://assignment-11-server-jet-one.vercel.app/manage-my-foods', { withCredentials: true });
        setFoods(response.data); // Update the state with fetched data
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
          await axios.delete(`https://assignment-11-server-jet-one.vercel.app/delete-food/${id}`, { withCredentials: true });
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
    setSelectedFood(food); // Set the selected food for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdateFood = async () => {
    try {
      await axios.put(
        `https://assignment-11-server-jet-one.vercel.app/update-food/${selectedFood._id}`,
        selectedFood,
        { withCredentials: true }
      );
      Swal.fire('Updated!', 'Food information has been updated.', 'success');
      setFoods(
        foods.map((food) => (food._id === selectedFood._id ? selectedFood : food))
      );
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error updating food:', error);
      Swal.fire('Failed!', 'Failed to update the food. Please try again.', 'error');
    }
  };

  return (
    <div className="container mx-auto p-6 pt-24">
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
                    onClick={() => handleEditClick(food)}
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

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Food Information</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              value={selectedFood.foodName}
              onChange={(e) => setSelectedFood({ ...selectedFood, foodName: e.target.value })}
              className="w-full mb-4 border border-gray-300 rounded-lg p-2"
            />
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Expired Date
            </label>
            <input
              type="datetime-local"
              value={new Date(selectedFood.expiredDate).toISOString().slice(0, -8)}
              onChange={(e) =>
                setSelectedFood({ ...selectedFood, expiredDate: new Date(e.target.value).toISOString() })
              }
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
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
