import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyFoodRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await axios.get('https://assignment-11-server-jet-one.vercel.app/my-food-requests', { withCredentials: true });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching food requests:', error);
      }
    };

    fetchMyRequests();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 pt-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-16 text-gray-800 mb-6">
        My Food Requests
      </h1>
      {
        requests.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No food request available    </p>
        ) : ( <div className="overflow-x-auto">
          <table className="min-w-full sm:w-[272px] border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base font-semibold text-gray-700 w-1/6">
                  Food Name
                </th>
                <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base font-semibold text-gray-700 w-1/6">
                  Pickup Location
                </th>
                <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base font-semibold text-gray-700 w-1/6">
                  Expire Date
                </th>
                <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base font-semibold text-gray-700 w-1/6">
                  Request Date
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-800 truncate">
                    {request.foodName}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-600 truncate">
                    {request.pickupLocation}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-500 truncate">
                    {new Date(request.expiredDate).toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-500 truncate">
                    {new Date(request.requestedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)
      }
     
    </div>
  );
};

export default MyFoodRequests;
