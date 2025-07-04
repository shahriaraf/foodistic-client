import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarDays, MapPin, ChefHat } from 'lucide-react';

const MyFoodRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await axios.get(
          'https://assignment-11-server-jet-one.vercel.app/my-food-requests',
          { withCredentials: true }
        );
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching food requests:', error);
      }
    };

    fetchMyRequests();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=400&fit=crop"
          alt="Food Requests Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl text-center sm:text-6xl font-bold text-white">
            My Food Requests
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {requests.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-slate-700">
              <ChefHat className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No Requests Found
              </h3>
              <p className="text-slate-400">
                You haven't requested any food items yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Food Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Pickup Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Expiration Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 border-b border-slate-700">
                      Request Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {requests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-slate-700/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {request.foodName}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{request.pickupLocation}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center space-x-2">
                          <CalendarDays className="w-4 h-4" />
                          <span>{new Date(request.expiredDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center space-x-2">
                          <CalendarDays className="w-4 h-4" />
                          <span>{new Date(request.requestedAt).toLocaleDateString()}</span>
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
    </div>
  );
};

export default MyFoodRequests;
