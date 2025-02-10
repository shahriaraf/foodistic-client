import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "./Authprovider";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    const foodData = {
      ...data,
      donatorName: user.displayName || "",
      donatorEmail: user.email || "",
      donatorImage: user.photoURL || "",
    };

    try {
      await axios.post("https://assignment-11-server-jet-one.vercel.app/add-food", foodData);

      Swal.fire({
        icon: "success",
        title: "Food Added!",
        text: "Your food donation has been listed.",
        confirmButtonColor: "#6d165D",
      });
    } catch (error) {
      console.error("Error adding food:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add food. Please try again.",
        confirmButtonColor: "#ECA511",
      });
    }
  };

  return (
    <div
      className="min-h-screen pt-36 pb-14 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co.com/C30Tb4C6/1.jpg')" }}
    >
      <div className="absolute -inset-64 bg-black opacity-45 z-0"></div>
      <div className="w-72 md:w-full max-w-md p-8 bg-transparent backdrop-blur-md rounded-lg border-gray-600 border-[1px]">
        <h1 className="text-3xl font-bold text-center text-amber-800">
          Add Food
        </h1>
        <p className="mt-2 text-center font-semibold text-gray-500">
          Help others by donating surplus food!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Food Name */}
          <div>
            <label className="block text-sm text-gray-500 font-medium">Food Name</label>
            <input
              {...register("foodName", { required: "Food Name is required" })}
              type="text"
              placeholder="Enter food name"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
            {errors.foodName && <p className="text-red-500">{errors.foodName.message}</p>}
          </div>

          {/* Food Image URL */}
          <div>
            <label className="block text-sm text-gray-500 font-medium">Food Image URL</label>
            <input
              {...register("foodImage", { required: "Image URL is required" })}
              type="text"
              placeholder="Enter image URL"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
            {errors.foodImage && <p className="text-red-500">{errors.foodImage.message}</p>}
          </div>

          {/* Food Quantity */}
          <div>
            <label className="block text-sm text-gray-500 font-medium">Quantity</label>
            <input
              {...register("foodQuantity", { required: "Quantity is required" })}
              type="number"
              placeholder="Enter quantity"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
            {errors.foodQuantity && <p className="text-red-500">{errors.foodQuantity.message}</p>}
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm text-gray-500 font-medium">Pickup Location</label>
            <input
              {...register("pickupLocation", { required: "Pickup location is required" })}
              type="text"
              placeholder="Enter pickup location"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
            {errors.pickupLocation && <p className="text-red-500">{errors.pickupLocation.message}</p>}
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-sm text-gray-500 font-medium">Expiration Date</label>
            <input
              {...register("expiredDate", { required: "Expiration date is required" })}
              type="datetime-local"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
            {errors.expiredDate && <p className="text-red-500">{errors.expiredDate.message}</p>}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm text-gray-500 font-medium">Additional Notes</label>
            <textarea
              {...register("additionalNotes")}
              placeholder="Any extra information"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-950 hover:bg-[#451a036b] py-3 rounded-lg font-semibold text-gray-400 shadow-md"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
