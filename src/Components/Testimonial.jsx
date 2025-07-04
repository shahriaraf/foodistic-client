// ✅ No changes needed to import section or logic

// ✅ Inside return — updated only styles below for responsiveness:
<div className="bg-black py-16 px-4 sm:px-6 lg:px-8">

  {/* Header Section */}
  <div className="text-center mb-12 sm:mb-16">
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
      {/* icons and heading */}
      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 animate-pulse" />
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
        What People Say
      </h2>
      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 animate-pulse" />
    </div>
    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
      Real stories from our community members who are making a difference
    </p>
  </div>

  {/* Testimonial Card */}
  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 min-h-[360px] sm:min-h-[400px] flex flex-col justify-center">
    
    {/* Quote Icon */}
    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 opacity-20">
      <Quote className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400" />
    </div>

    {/* Author Image & Stars */}
    <div className="mb-6 text-center">
      <img
        src={testimonials[currentSlide].image}
        alt={testimonials[currentSlide].author}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 border-2 border-gray-600 shadow-lg"
      />
      <div className="flex justify-center mb-4">
        {renderStars(testimonials[currentSlide].rating)}
      </div>
    </div>

    {/* Text */}
    <blockquote className="text-base sm:text-lg md:text-xl text-gray-200 italic leading-relaxed mb-6 font-light text-center">
      {testimonials[currentSlide].text}
    </blockquote>

    <div className="text-center space-y-1 sm:space-y-2">
      <h4 className="text-base sm:text-lg font-semibold text-white">
        {testimonials[currentSlide].author}
      </h4>
      <p className="text-sm text-gray-400">
        {testimonials[currentSlide].role} • {testimonials[currentSlide].location}
      </p>
    </div>

    {/* Arrows */}
    <button
      onClick={prevSlide}
      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
    >
      <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300" />
    </button>
    <button
      onClick={nextSlide}
      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
    >
      <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300" />
    </button>
  </div>

  {/* Indicators */}
  <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
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

  {/* Thumbnail Navigation */}
  <div className="flex justify-center mt-6 sm:mt-8 space-x-3 sm:space-x-4 overflow-x-auto pb-2 sm:pb-4">
    {testimonials.map((testimonial, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`flex-shrink-0 group transition-all duration-300 ${
          index === currentSlide ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-80'
        }`}
      >
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'border-2 border-white shadow-lg' 
                : 'border-2 border-gray-600 group-hover:border-gray-500'
            }`}
          />
          {index === currentSlide && (
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
          )}
        </div>
      </button>
    ))}
  </div>

  {/* Statistics */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 sm:mt-16 max-w-4xl mx-auto">
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">1,200+</div>
      <div className="text-gray-400 text-sm sm:text-base">Happy Users</div>
    </div>
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">4.9/5</div>
      <div className="text-gray-400 text-sm sm:text-base">Average Rating</div>
    </div>
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50k+</div>
      <div className="text-gray-400 text-sm sm:text-base">Meals Saved</div>
    </div>
  </div>

  {/* CTA */}
  <div className="text-center mt-12 sm:mt-16">
    <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
      Join thousands of satisfied users making a difference
    </p>
    <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25 hover:scale-105 active:scale-95 text-sm sm:text-base">
      Start Your Journey
    </button>
  </div>
</div>
