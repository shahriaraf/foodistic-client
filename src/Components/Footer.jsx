const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-500 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & About Section */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-start text-amber-800"><i className="fa-sharp fa-solid fa-utensils"></i>omeBite</h1>
            </div>
            <p className="text-sm w-9/12">"HomeBite, where you can now enjoy food and drink in an exclusive and elegant setting."</p>
            <div className="flex space-x-4 mt-4 text-lg">
              <a href="https://www.facebook.com/" className="hover:text-blue-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="http://twitter.com/" className="hover:text-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/" className="hover:text-pink-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.pinterest.com/" className="hover:text-red-500">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h6 className="text-lg font-semibold text-gray-500 mb-2">Phone & Email</h6>
            <p className="text-sm">+1 203-123-0606</p>
            <p className="text-sm">foodistic@gmail.com</p>
          </div>

          {/* Address Section */}
          <div>
            <h6 className="text-lg font-semibold text-gray-500 mb-2">Our Address</h6>
            <p className="text-sm">24 King St, Charleston, SC 29401 USA</p>
          </div>

          {/* Opening Hours */}
          <div>
            <h6 className="text-lg font-semibold text-gray-500 mb-2">Opening Hours</h6>
            <p className="text-sm">Mon-Fri: 5 PM - 10:30 PM</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="border-t border-gray-700 mt-10 pt-5">
        <div className="container mx-auto text-center px-6">
          <p className="text-sm">© 2025 HomeBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
