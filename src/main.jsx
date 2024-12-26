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
        element: <MyFoodRequests></MyFoodRequests>
      },
      {
        path: "add-foods",
        element: <AddFood></AddFood>
      },
      {
        path: "add-foods",
        element: <AddFood></AddFood>
      },
      {
        path: "manage-foods",
        element: <ManageMyFoods></ManageMyFoods>
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);