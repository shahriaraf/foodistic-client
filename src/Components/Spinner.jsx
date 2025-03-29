// Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-amber-700 rounded-full animate-spin"></div>

        {/* Inner Dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce"></div>
        </div>

        {/* Rotating Bars */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-6 bg-amber-600 rounded-full"
              style={{
                transform: `rotate(${index * 30}deg) translate(0, -50%)`,
                animation: "fade 1.2s linear infinite",
                animationDelay: `${index * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom Spinner Animation */}
      <style>
        {`
          @keyframes fade {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
