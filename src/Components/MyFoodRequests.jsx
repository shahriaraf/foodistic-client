import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyFoodRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await axios.get('https://assignment-11-server-jet-one.vercel.app/my-food-requests', {withCredentials: true});
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching food requests:', error);
      }
    };

    fetchMyRequests();
  }, []);

  return (
    <div className="container mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Food Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Food Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Pickup Location</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Expire Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Request Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{request.foodName}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{request.pickupLocation}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{new Date(request.expiredDate).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{new Date(request.requestedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodRequests;
