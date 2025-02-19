import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import useForm from React Hook Form
import { AuthContext } from "./Authprovider";

const Login = () => {
  const { signInUser, error, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler for form submission
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInUser(email, password);
      navigate("/"); // Redirect to homepage after successful login
    } catch (err) {
      console.error("Login error", err);
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-6 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/wrNS803N/4.jpg')" }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-45"></div>
      <div className="w-72 md:w-full relative max-w-md p-8 bg-transparent backdrop-blur-md rounded-lg border-gray-600
      border-[1px]">
        <h1 className="text-3xl font-bold text-center text-amber-800"><i className="fa-sharp fa-solid fa-utensils"></i>omeBite</h1>
        <p className="mt-2 text-center font-semibold text-gray-500">Sign in to explore the world of foods!</p>

        {/* Error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-500 font-medium">
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
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-500 font-medium">
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
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 text-gray-500 bg-slate-800 rounded-lg shadow focus:outline-none focus:ring-[1px] focus:ring-gray-500"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-950 hover:bg-[#451a036b] py-3 rounded-lg font-semibold text-gray-400 shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Sign-up Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link className="text-gray-400 hover:underline" to="/register">
              Sign up
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

export default Login;
