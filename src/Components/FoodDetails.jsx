import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './Authprovider';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Spinner from './Spinner';

// Fetch food details function
const fetchFoodDetails = async (id) => {
  const response = await axios.get(`https://assignment-11-server-jet-one.vercel.app/food/${id}`, { withCredentials: true });
  return response.data;
};

// Request food function (mutation)
const requestFood = async ({ id, additionalNotes, userEmail }) => {
  const response = await axios.post(`https://assignment-11-server-jet-one.vercel.app/request-food/${id}`, {
    additionalNotes,
    userEmail,
  }, { withCredentials: true });
  return response.data;
};

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [additionalNotes, setAdditionalNotes] = useState('');
  const navigate = useNavigate();

  // Using Tanstack Query for fetching food details
  const { data: food, isLoading, isError } = useQuery({
    queryKey: ['foodDetails', id],
    queryFn: () => fetchFoodDetails(id),
    enabled: !!id, // Ensures the query doesn't run until id is available
  });

  // Using Tanstack Mutation for requesting food
  const { mutate: requestFoodMutation, isLoading: isRequestLoading } = useMutation({
    mutationFn: (requestData) => requestFood(requestData),
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Your food request was submitted successfully.',
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => {
        navigate('/available-foods'); // Navigate after the user confirms the SweetAlert
      });
      
    },
    onError: () => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit your food request. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    },
  });

  const handleRequest = () => {
    if (!user) {
      Swal.fire({
        title: 'Not Logged In',
        text: 'You must be logged in to request food.',
        icon: 'warning',
        confirmButtonText: 'Login',
      });
      return;
    }

    const userEmail = user.email; // Assuming 'user' contains the logged-in user's email
    requestFoodMutation({ id, additionalNotes, userEmail });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isError) {
    return <div className="text-center text-xl text-red-500">Error fetching food details</div>;
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
            className="bg-amber-500 text-black py-2 px-6 rounded-lg shadow-md hover:bg-amber-700 hover:text-white focus:outline-none transition duration-200"
            disabled={isRequestLoading}
          >
            {isRequestLoading ? 'Requesting...' : 'Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
