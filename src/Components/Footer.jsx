import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-amber-800 to-yellow-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-br from-amber-700 to-orange-700 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* Logo & About */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text mb-4">
              <i className="fa-sharp fa-solid fa-utensils mr-2 text-amber-500"></i>
              HomeBite
            </h1>
            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-md">
              "HomeBite, where you can now enjoy food and drink in an exclusive and elegant setting. Experience culinary excellence with every bite."
            </p>
            <div className="flex space-x-4 text-lg">
              {/* Social Links */}
              {[
                { href: "https://www.facebook.com/", icon: "fab fa-facebook-f", hover: "hover:bg-blue-600" },
                { href: "http://twitter.com/", icon: "fab fa-twitter", hover: "hover:bg-blue-400" },
                { href: "https://www.instagram.com/", icon: "fab fa-instagram", hover: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600" },
                { href: "https://www.pinterest.com/", icon: "fab fa-pinterest", hover: "hover:bg-red-600" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className={`group p-3 bg-gray-900 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${item.hover}`}
                >
                  <i className={`${item.icon} text-gray-400 group-hover:text-white transition-colors duration-300`} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h6 className="text-lg font-semibold text-white relative">
              <span className="relative z-10">Contact Info</span>
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            </h6>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-900 rounded-md group-hover:bg-amber-500 transition-colors duration-300">
                  <i className="fas fa-phone text-amber-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="text-gray-300 font-medium">+1 203-123-0606</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-900 rounded-md group-hover:bg-amber-500 transition-colors duration-300">
                  <i className="fas fa-envelope text-amber-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="text-gray-300 font-medium">homebite@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Hours */}
          <div className="space-y-5">
            <h6 className="text-lg font-semibold text-white relative">
              <span className="relative z-10">Visit Us</span>
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            </h6>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-900 rounded-md">
                  <i className="fas fa-map-marker-alt text-amber-500" />
                </div>
                <div>
                  <p className="text-gray-500">Address</p>
                  <p className="text-gray-300 font-medium">24 King St, Charleston,<br />SC 29401 USA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-900 rounded-md">
                  <i className="fas fa-clock text-amber-500" />
                </div>
                <div>
                  <p className="text-gray-500">Hours</p>
                  <p className="text-gray-300 font-medium">Mon-Fri: 5 PM - 10:30 PM</p>
                  <p className="text-gray-300 font-medium">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          <div className="text-center max-w-xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">Subscribe to our newsletter for the latest updates and special offers</p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg sm:rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg sm:rounded-r-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-900 bg-gray-950 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 HomeBite. All rights reserved. Made with 
            <i className="fas fa-heart text-red-500 mx-1 animate-pulse"></i>
            for food lovers
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-amber-500 transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-amber-500 transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-amber-500 transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
