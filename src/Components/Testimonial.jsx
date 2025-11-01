import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Users, Heart } from 'lucide-react';

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const testimonials = [
    {
      text: "I'm amazed at how easy it is to use. It feels good knowing I'm helping reduce food waste.",
      author: "John D.",
      role: "Environmental Advocate",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Midtown"
    },
    {
      text: "The food is always fresh, and the process is so simple. Thank you for this initiative!",
      author: "Emily R.",
      role: "Student",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "University District"
    },
    {
      text: "Outstanding service! The variety of food available is incredible, and pickup is always convenient.",
      author: "Michael T.",
      role: "Working Professional",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Business District"
    },
    {
      text: "This has transformed how our family approaches food. We're saving money and helping the environment!",
      author: "Lisa K.",
      role: "Mother of Three",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      location: "Suburbs"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ));
  };

  return (
   // ✅ No changes needed to import section or logic

// ✅ Inside return — updated only styles below for responsiveness:
<div className="px-4 bg-black lg:px-0 md:px-4">

  {/* Header Section */}
  <div className="mt-20 mb-12 text-center sm:mb-16">
    <div className="flex items-center justify-center gap-2 mb-4 sm:gap-3 sm:mb-6">

      <h2 className="text-3xl tracking-widest text-transparent font-extralight sm:text-4xl lg:text-5xl bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text">
        What People Say
      </h2>

    </div>
    <p className="max-w-2xl mx-auto text-base leading-relaxed text-gray-400 sm:text-lg">
      Real stories from our community members who are making a difference
    </p>
  </div>

  {/* Testimonial Card */}
  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 min-h-[360px] sm:min-h-[400px] flex flex-col justify-center">
    
    {/* Quote Icon */}
    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 opacity-20">
      <Quote className="w-12 h-12 text-gray-400 sm:w-16 sm:h-16" />
    </div>

    {/* Author Image & Stars */}
    <div className="mb-6 text-center">
      <img
        src={testimonials[currentSlide].image}
        alt={testimonials[currentSlide].author}
        className="w-16 h-16 mx-auto mb-3 border-2 border-gray-600 rounded-full shadow-lg sm:w-20 sm:h-20"
      />
      <div className="flex justify-center mb-4">
        {renderStars(testimonials[currentSlide].rating)}
      </div>
    </div>

    {/* Text */}
    <blockquote className="mb-6 text-base italic font-light leading-relaxed text-center text-gray-200 sm:text-lg md:text-xl">
      {testimonials[currentSlide].text}
    </blockquote>

    <div className="space-y-1 text-center sm:space-y-2">
      <h4 className="text-base text-white font-extralight sm:text-lg">
        {testimonials[currentSlide].author}
      </h4>
      <p className="text-sm text-gray-400">
        {testimonials[currentSlide].role} • {testimonials[currentSlide].location}
      </p>
    </div>

    {/* Arrows */}
    <button
      onClick={prevSlide}
      className="absolute flex items-center justify-center w-10 h-10 transition-all duration-300 -translate-y-1/2 rounded-full left-3 sm:left-4 top-1/2 sm:w-12 sm:h-12 bg-gray-800/50 hover:bg-gray-700/50 hover:scale-110 backdrop-blur-sm"
    >
      <ChevronLeft className="w-5 h-5 text-gray-300 sm:w-6 sm:h-6" />
    </button>
    <button
      onClick={nextSlide}
      className="absolute flex items-center justify-center w-10 h-10 transition-all duration-300 -translate-y-1/2 rounded-full right-3 sm:right-4 top-1/2 sm:w-12 sm:h-12 bg-gray-800/50 hover:bg-gray-700/50 hover:scale-110 backdrop-blur-sm"
    >
      <ChevronRight className="w-5 h-5 text-gray-300 sm:w-6 sm:h-6" />
    </button>
  </div>

  {/* Indicators */}
  <div className="flex justify-center mt-6 space-x-2 sm:mt-8">
    {testimonials.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
          index === currentSlide ? 'bg-white shadow-lg scale-110' : 'bg-gray-600 hover:bg-gray-500'
        }`}
      />
    ))}
  </div>


  {/* Statistics */}
  <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-12 sm:grid-cols-2 md:grid-cols-3 sm:mt-16">
    <div className="text-center">
      <div className="mb-1 text-2xl text-white font-extralight sm:text-3xl">1,200+</div>
      <div className="text-sm text-gray-400 sm:text-base">Happy Users</div>
    </div>
    <div className="text-center">
      <div className="mb-1 text-2xl text-white font-extralight sm:text-3xl">4.9/5</div>
      <div className="text-sm text-gray-400 sm:text-base">Average Rating</div>
    </div>
    <div className="text-center">
      <div className="mb-1 text-2xl text-white font-extralight sm:text-3xl">50k+</div>
      <div className="text-sm text-gray-400 sm:text-base">Meals Saved</div>
    </div>
  </div>


</div>

  );
}