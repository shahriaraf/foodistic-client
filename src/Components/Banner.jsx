import { useState, useEffect } from "react";

const movies = [
  {
    title: "Burger",
    image: "https://i.ibb.co/7YJ2sVw/images-27.jpg",
  },
  {
    title: "Pasta",
    image: "https://i.ibb.co/0KWLgj5/610x350-Photo-4-862-How-to-Make-CHICKEN-PASTA-Like-an-Italian-V1.jpg",
  },
  {
    title: "Grilled Chicken",
    image: "https://i.ibb.co/sCZZZzq/Grilled-Chicken-Recipe-5-1200.jpg",
  },
  {
    title: "Pizza",
    image: "https://i.ibb.co/k5X1Bww/images-28.jpg",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative w-full overflow-hidden shadow-lg">
      {/* Slider */}
      <div
        className="flex transition-transform duration-700 pt-16"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex-none w-full relative"
            style={{ height: "80vh" }} // Base height for banner
          >
            {/* Movie Image */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {/* Movie Details */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white">
                {movie.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
