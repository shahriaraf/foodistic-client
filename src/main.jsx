import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';
import Error from './Components/Error';
import Home from './Components/Home';
import AuthProvider from './Components/Authprovider';
import Login from './Components/Login';
import Register from './Components/Register';
import FoodDetails from './Components/FoodDetails';
import MyFoodRequests from './Components/MyFoodRequests';
import AddFood from './Components/AddFood';
import ManageMyFoods from './Components/ManageMyFoods';
import AvailableFoods from './Components/AvailableFoods';
import PrivateRoute from './Components/PrivateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create the QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>, // Assuming Root is a layout or wrapper component
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "food/:id",
        element: <FoodDetails></FoodDetails>
      },
      {
        path: "my-food-requests",
        element: <PrivateRoute><MyFoodRequests></MyFoodRequests></PrivateRoute>
      },
      {
        path: "add-foods",
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path: "manage-foods",
        element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>
      },
      {
        path: "available-foods",
        element: <AvailableFoods></AvailableFoods>
      },
    ]
  },
  {
    path: "*",
    element: <Error></Error>, // Home is the main page
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Pass the queryClient instance to the QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
