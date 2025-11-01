import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "./Authprovider";
import { gsap } from "gsap";

const Login = () => {
  const { signInUser, error: authError, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [localError, setLocalError] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLocalError("");
    try {
      await signInUser(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login error", err);
      setLocalError("Invalid email or password.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setLocalError("Failed to authenticate with Google.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://i.ibb.co/wrNS803N/4.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-45"></div>

      {/* Login Card */}
      <div
        ref={cardRef}
        className="z-10 w-full max-w-md p-8 rounded-3xl bg-white bg-opacity-10 border border-gray-600 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
      >
        {/* Logo */}
        <h1 className="text-4xl font-semibold text-center text-amber-600 mb-4 flex items-center justify-center space-x-2">
          <i className="fa-sharp animate-bounce fa-solid fa-utensils"></i>
          <span>omeBite</span>
        </h1>
        <p className="text-center mb-6 text-gray-300 font-semibold">
          Sign in to explore the world of foods!
        </p>

        {/* Error */}
        {(authError || localError) && (
          <p className="text-red-500 text-center mb-4">
            {authError || localError}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-2xl bg-white bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-2xl bg-white bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded-lg font-semibold text-gray-800 shadow-md transform hover:scale-105 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Don’t have an account?{" "}
            <Link className="underline hover:text-amber-500" to="/register">
              Sign up
            </Link>
          </p>
        </div>

        {/* Google Sign-In */}
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

export default Login;
