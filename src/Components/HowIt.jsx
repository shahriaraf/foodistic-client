import React from 'react';
import { Search, MousePointer, MapPin, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Discover",
      description: "Browse through a wide selection of fresh food donations available near you.",
      image: "https://i.ibb.co.com/xGLGqVF/360-F-279757414-o2-KNn-B8f-Z2eah-IK6-Sqyd-L4t-GFk-O5-RDH5.jpg",
      icon: Search,
      color: "from-gray-700 to-gray-600"
    },
    {
      id: 2,
      title: "Request",
      description: "Easily request food items that suit your needs with just a few clicks.",
      image: "https://i.ibb.co.com/P9C7pGp/online-ordering-business.jpg",
      icon: MousePointer,
      color: "from-gray-600 to-gray-500"
    },
    {
      id: 3,
      title: "Pickup",
      description: "Collect your food from the specified location and enjoy your meal!",
      image: "https://i.ibb.co.com/PQtMkPL/1697434513833.jpg",
      icon: MapPin,
      color: "from-gray-500 to-gray-400"
    }
  ];

  return (
    <div className="bg-black py-20 px-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-700/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-gray-400 animate-pulse" />
              <div className="absolute inset-0 blur-sm">
                <Sparkles className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              How It Works
            </h2>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Getting food has never been easier. Follow these simple steps to access fresh donations.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connecting Arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center border-2 border-gray-600 group-hover:border-gray-400 transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors duration-300" />
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/20 hover:-translate-y-2 group">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/5 via-transparent to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Step Number Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-sm">{step.id}</span>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-52 object-cover opacity-65 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-gray-700/80 to-gray-600/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}>
                      <step.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000 group-hover:w-full`}
                        style={{ width: `${(step.id / steps.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      Step {step.id} of {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Message */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full backdrop-blur-sm border border-gray-600/30">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-gray-200 font-medium text-lg">
              It's that simple! Start helping reduce food waste today.
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25 hover:scale-105 active:scale-95 text-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;