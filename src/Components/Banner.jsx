import { useState, useEffect } from "react";

const movies = [
  {
    title: "Welcome to Foodie Delight!",
    subtitle: "Enjoy the best Burger in town.",
    image: "https://i.ibb.co.com/dJ761Pqg/about1.jpg",
  },
  {
    title: "Savor the Flavor!",
    subtitle: "Authentic Italian Pasta.",
    image: "https://i.ibb.co.com/wrNS803N/4.jpg",
  },
  {
    title: "Deliciously Grilled!",
    subtitle: "The Best Grilled Chicken.",
    image: "https://i.ibb.co.com/JRr7BDxh/3.jpg",
  },
  {
    title: "Hot & Cheesy!",
    subtitle: "Irresistible Pizza for everyone.",
    image: "https://i.ibb.co.com/C30Tb4C6/1.jpg",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative w-full overflow-hidden shadow-lg">
     

      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex-none w-full relative"
            style={{ height: "100vh" }} // Base height for banner
          >
            {/* Movie Image */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover transform scale-100 transition-transform duration-[2000ms] ease-in-out"
              style={{
                animation:
                  currentIndex === index
                    ? "zoomIn 3s ease-in-out"
                    : "none",
              }}
            />
            {/* Movie Details */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent text-center">
              <h2
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-white animate-fadeIn"
                style={{
                  animation:
                    currentIndex === index
                      ? "fadeIn 2s ease-in-out"
                      : "none",
                }}
              >
                {movie.title}
              </h2>
              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4 animate-slideUp"
                style={{
                  animation:
                    currentIndex === index
                      ? "slideUp 2.5s ease-in-out"
                      : "none",
                }}
              >
                {movie.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {movies.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 md:w-4 md:h-4 rounded-full ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
