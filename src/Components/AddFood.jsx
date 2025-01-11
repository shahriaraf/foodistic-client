import React, { useState } from 'react';
import axios from 'axios';

const AddFood = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodQuantity: '',
    pickupLocation: '',
    expiredDate: '',
    additionalNotes: '',
    donatorName: '',
    donatorEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add-food', formData);
      alert('Food added successfully!');
      // Optionally, clear the form after submission or redirect to another page
      setFormData({
        foodName: '',
        foodImage: '',
        foodQuantity: '',
        pickupLocation: '',
        expiredDate: '',
        additionalNotes: '',
        donatorName: '',
        donatorEmail: '',
      });
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Failed to add food');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-24 mb-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Add Food</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="foodName" className="block text-sm font-semibold text-gray-600">Food Name</label>
          <input
            type="text"
            name="foodName"
            id="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Food Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="foodImage" className="block text-sm font-semibold text-gray-600">Food Image URL</label>
          <input
            type="text"
            name="foodImage"
            id="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Food Image URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="foodQuantity" className="block text-sm font-semibold text-gray-600">Food Quantity</label>
          <input
            type="number"
            name="foodQuantity"
            id="foodQuantity"
            value={formData.foodQuantity}
            onChange={handleChange}
            placeholder="Food Quantity"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pickupLocation" className="block text-sm font-semibold text-gray-600">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            id="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Pickup Location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="expiredDate" className="block text-sm font-semibold text-gray-600">Expired Date/Time</label>
          <input
            type="datetime-local"
            name="expiredDate"
            id="expiredDate"
            value={formData.expiredDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-600">Additional Notes</label>
          <textarea
            name="additionalNotes"
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Additional Notes"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="donatorName" className="block text-sm font-semibold text-gray-600">Your Name</label>
          <input
            type="text"
            name="donatorName"
            id="donatorName"
            value={formData.donatorName}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="donatorEmail" className="block text-sm font-semibold text-gray-600">Your Email</label>
          <input
            type="email"
            name="donatorEmail"
            id="donatorEmail"
            value={formData.donatorEmail}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-500 text-black font-semibold rounded-lg shadow-md hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
