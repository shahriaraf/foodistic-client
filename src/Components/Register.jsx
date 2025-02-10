import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Authprovider";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // For navigation after login

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Reset error and success messages
    setError("");
    setSuccessMessage("");

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUser(email, password, name, photo)
      .then((result) => {
        setSuccessMessage("Registration successful! Please log in.");
        navigate("/");

        // Reset the form after successful user creation
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setError("Error creating account. Please try again.");
      });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); // Navigate to home page after successful login
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setError("Failed to authenticate with Google. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen pt-32 pb-6 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/wrNS803N/4.jpg')" }}
    >
      <div className="absolute -inset-52 bg-black opacity-45 z-0"></div>
      <div className="w-72 md:w-full max-w-md p-8 bg-transparent backdrop-blur-md rounded-lg border-gray-600 border-[1px] z-10">
        <h1 className="text-3xl font-bold text-center text-amber-800">
          <i className="fa-sharp fa-solid fa-utensils"></i>omeBite
        </h1>
        <p className="mt-2 text-center font-semibold text-gray-500">
          Join us and explore the world of foods!
        </p>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Display success message */}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          {/* Name, Email, Photo, Password fields */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-500 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-500 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm text-gray-500 font-medium">
              Photo
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Enter Photo URL"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-500 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-500 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-950 hover:bg-[#451a036b] py-3 rounded-lg font-semibold text-gray-400 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link className="text-gray-400 hover:underline" to="/login">
              Log in
            </Link>
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-slate-700 hover:bg-slate-800 transition-colors py-3 rounded-lg font-semibold text-gray-400 shadow-md"
          >
            Sign in with Google <i className="fa-brands fa-google"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
