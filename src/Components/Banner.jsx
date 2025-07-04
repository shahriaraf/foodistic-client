import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Star, Clock, Users } from "lucide-react";

const movies = [
  {
    title: "Savor the Flavor!",
    subtitle: "Authentic Italian Pasta.",
    image: "https://i.ibb.co.com/wrNS803N/4.jpg",
    rating: 4.8,
    prepTime: "20 min",
    serves: "2-3 people",
  },
  {
    title: "Deliciously Grilled!",
    subtitle: "The Best Grilled Chicken.",
    image: "https://i.ibb.co.com/JRr7BDxh/3.jpg",
    rating: 4.7,
    prepTime: "25 min",
    serves: "2-4 people",
  },
  {
    title: "Hot & Cheesy!",
    subtitle: "Irresistible Pizza for everyone.",
    image: "https://i.ibb.co.com/C30Tb4C6/1.jpg",
    rating: 4.9,
    prepTime: "18 min",
    serves: "3-4 people",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const slideInterval = 4000;

  useEffect(() => {
    if (isPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setProgress(0);
      }, slideInterval);

      progressRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / (slideInterval / 50)));
      }, 50);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, isHovered, currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
    setProgress(0);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setProgress(0);
  };


  return (
    <div 
      className="relative w-full overflow-hidden shadow-2xl min-h-screen"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 opacity-5 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_white_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div
        className="flex transition-all duration-1000 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex-none w-full relative h-screen sm:h-[80vh] md:h-screen"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover transition-all duration-[3000ms] ease-out"
                style={{
                  transform: currentIndex === index ? "scale(1.05) translateY(-20px)" : "scale(1.1) translateY(0px)",
                  filter: currentIndex === index ? "brightness(1.1) contrast(1.1)" : "brightness(0.9) contrast(0.9)"
                }}
              />
            </div>

            <div className={`absolute inset-0 bg-gradient-to-r ${movie.accent} opacity-20 mix-blend-overlay`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>

            <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm animate-float opacity-60"></div>
            <div className="absolute top-1/3 right-16 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm animate-float-delay opacity-40"></div>
            <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm animate-float-slow opacity-30"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto z-20">

              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 transition-all duration-1000 ${currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: currentIndex === index ? '0.5s' : '0s', textShadow: '2px 2px 20px rgba(0,0,0,0.8)' }}>{movie.title}</h2>

              <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 transition-all duration-1000 ${currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: currentIndex === index ? '0.7s' : '0s', textShadow: '1px 1px 10px rgba(0,0,0,0.8)' }}>{movie.subtitle}</p>

            

              <button className={`group bg-white text-black text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-yellow-400 ${currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: currentIndex === index ? '1.1s' : '0s' }}>
                <span className="mr-2">Order Now</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`absolute inset-y-0 left-0 flex items-center z-30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={goToPrevious} className="ml-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className={`absolute inset-y-0 right-0 flex items-center z-30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={goToNext} className="mr-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className={`absolute top-6 right-6 z-30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={togglePlayPause} className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>



      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(90deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 8s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite 4s; }
      `}</style>
    </div>
  );
};

export default Banner;
