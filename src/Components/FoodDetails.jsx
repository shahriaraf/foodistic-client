import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/food/${id}`);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleRequest = async () => {
    try {
      const userEmail = 'user@example.com'; // Replace with logged-in user's email
      const response = await axios.post(`http://localhost:5000/request-food/${id}`, {
        additionalNotes,
        userEmail,
      });
      alert('Food requested successfully!');
    } catch (error) {
      console.error('Error requesting food:', error);
      alert('Failed to request food');
    }
  };

  if (!food) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">{food.foodName}</h1>

      <div className="flex justify-center mb-4">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="text-center mb-4">
        <p className="text-lg text-gray-700">{food.pickupLocation}</p>
        <p className="text-sm text-gray-500">Expires on: {new Date(food.expiredDate).toLocaleString()}</p>
      </div>

      {food.additionalNotes && (
        <div className="mb-4 text-gray-600">
          <h3 className="text-xl font-semibold">Additional Notes:</h3>
          <p>{food.additionalNotes}</p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Request This Food</h3>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Add any additional notes for your request"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="4"
        />
        <div className="flex justify-center">
          <button
            onClick={handleRequest}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
