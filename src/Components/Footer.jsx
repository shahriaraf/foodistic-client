import React from 'react';

const Footer = () => {
  return (
    <footer className="relative max-w-6xl px-4 mx-auto overflow-hidden text-gray-300 bg-black lg:px-2">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-32 h-32 rounded-full top-10 left-10 bg-amber-600 blur-3xl"></div>
        <div className="absolute w-40 h-40 rounded-full bottom-10 right-10 bg-gradient-to-br from-amber-800 to-yellow-600 blur-3xl"></div>
        <div className="absolute w-56 h-56 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-br from-amber-700 to-orange-700 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-0 md:px-4">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-12">

          {/* Logo & About */}
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl text-amber-600">
              <i className="mr-2 fa-sharp fa-solid fa-utensils text-amber-600"></i>
              HomeBite
            </h1>
            <p className="max-w-md mb-6 text-base leading-relaxed text-gray-400">
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
            <h6 className="relative text-lg font-semibold text-white">
              <span className="relative z-10">Contact Info</span>
              <div className="absolute left-0 w-20 h-0.5 rounded-full -bottom-2 bg-amber-600" />
            </h6>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 transition-colors duration-300 bg-gray-900 rounded-md group-hover:bg-amber-600">
                  <i className="fas fa-phone text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium text-gray-300">+1 203-123-0606</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 transition-colors duration-300 bg-gray-900 rounded-md group-hover:bg-amber-600">
                  <i className="fas fa-envelope text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-300">homebite@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Hours */}
          <div className="space-y-5">
            <h6 className="relative text-lg font-semibold text-white">
              <span className="relative z-10">Visit Us</span>
              <div className="absolute left-0 w-20 h-0.5 rounded-full -bottom-2 bg-amber-600" />
            </h6>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-900 rounded-md">
                  <i className="fas fa-map-marker-alt text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium text-gray-300">24 King St, Charleston,<br />SC 29401 USA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-900 rounded-md">
                  <i className="fas fa-clock text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-500">Hours</p>
                  <p className="font-medium text-gray-300">Mon-Fri: 5 PM - 10:30 PM</p>
                  <p className="font-medium text-gray-300">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-gray-900 bg-gray-950">
        <div className="container flex flex-col items-center justify-between gap-10 px-4 py-6 mx-auto sm:px-6 lg:px-8 sm:flex-row">
          <p className="text-sm text-center text-gray-500 sm:text-left">
            © 2025 HomeBite. All rights reserved. Made with 
          </p>
          <div className="flex flex-wrap justify-center text-sm sm:justify-end gap-x-6">
            <a href="#" className="text-gray-500 transition hover:text-amber-600">Privacy Policy</a>
            <a href="#" className="text-gray-500 transition hover:text-amber-600">Terms of Service</a>
            <a href="#" className="text-gray-500 transition hover:text-amber-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
