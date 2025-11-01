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
    <div className="px-6 py-20 bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full top-1/2 left-1/4 w-96 h-96 bg-gray-800/5 blur-3xl animate-pulse"></div>
        <div className="absolute w-64 h-64 delay-1000 rounded-full top-1/3 right-1/4 bg-gray-700/5 blur-2xl animate-pulse"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
        
            <h2 className="text-4xl tracking-widest text-transparent font-extralight bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text">
              How It Works
            </h2>
          </div>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-400">
            Getting food has never been easier. Follow these simple steps to access fresh donations.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connecting Arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute z-20 hidden transform -translate-y-1/2 md:block top-1/2 -right-4">
                  <div className="flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-black border-2 border-gray-600 rounded-full group-hover:border-gray-400">
                    <ArrowRight className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-gray-300" />
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative overflow-hidden transition-all duration-500 border bg-gray-900/50 backdrop-blur-sm rounded-3xl border-gray-700/50 hover:border-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/20 hover:-translate-y-2 group">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-gray-700/5 via-transparent to-gray-600/5 group-hover:opacity-100"></div>
                
                {/* Step Number Badge */}
                <div className="absolute z-10 top-4 left-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-sm text-white font-extralight">{step.id}</span>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="object-cover w-full transition-transform duration-700 h-52 opacity-65 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-full opacity-0 bottom-4 right-4 bg-gradient-to-r from-gray-700/80 to-gray-600/80 backdrop-blur-sm group-hover:opacity-100 hover:scale-110">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}>
                      <step.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-gray-200">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="mb-6 leading-relaxed text-gray-400">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 overflow-hidden bg-gray-700 rounded-full">
                      <div 
                        className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000 group-hover:w-full`}
                        style={{ width: `${(step.id / steps.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-extralight">
                      Step {step.id} of {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



    
      </div>
    </div>
  );
};

export default HowItWorks;