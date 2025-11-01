import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Authprovider";
import { gsap } from "gsap";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const cardRef = useRef(null);

  useEffect(() => {
    // Animate card on load
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    setError("");
    setSuccessMessage("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUser(email, password, name, photo)
      .then(() => {
        setSuccessMessage("Registration successful! Please log in.");
        navigate("/");
        e.target.reset();
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        setError("Error creating account. Please try again.");
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setError("Failed to authenticate with Google. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://i.ibb.co/wrNS803N/4.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-45"></div>

      {/* Animated Card */}
      <div
        ref={cardRef}
        className="z-10 w-full mt-20 max-w-md p-8 rounded-3xl bg-white bg-opacity-10 border border-gray-600 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
      >
        {/* Title / Logo */}
        <h1 className="text-4xl font-semibold text-center text-amber-600 mb-4 flex items-center justify-center space-x-2">
          <i className="fa-sharp animate-bounce fa-solid fa-utensils"></i>
          <span>omeBite</span>
        </h1>
        <p className="text-center mb-6 text-gray-300 font-semibold">
          Join us and explore the world of foods!
        </p>

        {/* Error & Success */}
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2 text-center">{successMessage}</p>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-3 rounded-2xl bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-2xl bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Photo
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter Photo URL"
              className="w-full p-3 rounded-2xl bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-2xl bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-3 rounded-2xl bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Submit Button with animation */}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded-lg font-semibold text-gray-800 shadow-md transform hover:scale-105 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link className="underline hover:text-amber-500" to="/login">
              Log in
            </Link>
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-white/90 hover:bg-white/70 rounded-lg font-semibold text-gray-800 hover:scale-105 hover:shadow-lg transform transition duration-300"
          >
            Sign in with Google <i className="text-amber-600 fab fa-google"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;