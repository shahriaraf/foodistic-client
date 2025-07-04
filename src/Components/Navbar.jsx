import { Link } from "react-router-dom";
import { AuthContext } from "./Authprovider";
import { useContext, useState, useEffect } from "react";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(307.919);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      const offset = 307.919 - (scrollPercentage / 100) * 307.919;
      setScrollProgress(offset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div
        className={`navbar w-full fixed top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-black/95 backdrop-blur-md shadow-xl border-b border-amber-800/20" 
            : "bg-transparent"
        }`}
      >
        <div className="navbar-start">
          {/* Enhanced Drawer Button */}
          <button
            className="btn btn-ghost lg:hidden text-gray-400 hover:text-amber-500 hover:bg-amber-800/10 transition-all duration-300"
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform transition-transform duration-300 hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          
          {/* Enhanced Logo */}
          <Link to="/" className="text-[19px] flex md:text-3xl lg:pl-8 font-bold text-amber-500 hover:text-amber-400 transition-colors duration-300 group">
            <i className="fa-sharp fa-solid fa-utensils mr-1 lg:mr-2 lg:mt-0 mt-1 group-hover:rotate-12 transition-transform duration-300"></i>
            <span className="relative">
              omeBite
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></div>
            </span>
          </Link>
        </div>

        {/* Enhanced Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-lg uppercase text-gray-400 font-semibold menu-horizontal px-1 space-x-2">
            <li className="relative group">
              <Link 
                to="/" 
                className="hover:text-amber-500 duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/10"
              >
                Home
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            </li>
            <li className="relative group">
              <Link 
                to="/available-foods" 
                className="hover:text-amber-500 duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/10"
              >
                Foods
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            </li>
            {user ? (
              <>
                <li className="relative group">
                  <Link 
                    to="/add-foods" 
                    className="hover:text-amber-500 duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/10"
                  >
                    Add Food
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-3/4"></span>
                  </Link>
                </li>
                <li className="relative group">
                  <Link 
                    to="/manage-foods" 
                    className="hover:text-amber-500 duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/10"
                  >
                    My Foods
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-3/4"></span>
                  </Link>
                </li>
                <li className="relative group">
                  <Link 
                    to="/my-food-requests" 
                    className="hover:text-amber-500 duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/10"
                  >
                    Food Requests
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-3/4"></span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="relative group">
                  <Link 
                    to="/login" 
                    className="hover:text-amber-500 duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/10"
                  >
                    Login
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-3/4"></span>
                  </Link>
                </li>
                <li className="relative group">
                  <Link 
                    to="/register" 
                    className="bg-amber-500 text-black hover:bg-amber-600 duration-300 px-4 py-2 rounded-lg font-bold hover:scale-105 hover:shadow-lg"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Enhanced User Profile & Logout */}
        <div className="navbar-end flex items-center space-x-4 md:mr-8">
          {user && (
            <div className="flex items-center space-x-3">
              <div className="relative group mr-1 lg:mr-2">
                <div className="relative">
                  <img 
                    className="w-8 h-8 md:w-10 md:h-10 border-[3px] border-amber-500 rounded-full object-cover transition-all duration-300 hover:border-amber-500 hover:scale-110 hover:shadow-lg" 
                    src={user.photoURL} 
                    alt={user.displayName} 
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                </div>
                <div className="absolute top-14 right-0 mb-2 hidden group-hover:flex justify-center items-center bg-black/90 backdrop-blur-sm text-amber-500 font-bold text-sm px-3 py-2 rounded-lg shadow-xl border border-amber-800/20 min-w-max">
                  {user.displayName || "User"}
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-black/90 transform rotate-45 border-t border-l border-amber-800/20"></div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-transparent text-sm md:text-xl font-semibold rounded-full text-red-600 hover:text-red-500 hover:bg-red-600/10 p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Sign Out"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex transition-opacity duration-300">
          <div className="w-64 bg-gradient-to-b from-black to-gray-900 h-full shadow-2xl p-6 flex flex-col transform transition-transform duration-300 border-r border-amber-800/20">
            {/* Enhanced Close Button */}
            <button
              className="self-end text-gray-400 hover:text-amber-500 text-xl p-2 rounded-full hover:bg-amber-800/10 transition-all duration-300 hover:scale-110"
              onClick={() => setIsDrawerOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Mobile Logo */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-500">
                <i className="fa-sharp fa-solid fa-utensils mr-2"></i>
                omeBite
              </h2>
              <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-2"></div>
            </div>

            {/* Enhanced Mobile Menu */}
            <ul className="menu text-sm uppercase text-gray-400 font-semibold space-y-3 mt-2">
              <li>
                <Link 
                  to="/" 
                  onClick={() => setIsDrawerOpen(false)}
                  className="hover:text-amber-500 hover:bg-amber-800/10 transition-all duration-300 px-4 py-3 rounded-lg flex items-center space-x-3"
                >
                  <i className="fa-solid fa-house w-5"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/available-foods" 
                  onClick={() => setIsDrawerOpen(false)}
                  className="hover:text-amber-500 hover:bg-amber-800/10 transition-all duration-300 px-4 py-3 rounded-lg flex items-center space-x-3"
                >
                  <i className="fa-solid fa-utensils w-5"></i>
                  <span>Foods</span>
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link 
                      to="/add-foods" 
                      onClick={() => setIsDrawerOpen(false)}
                      className="hover:text-amber-500 hover:bg-amber-800/10 transition-all duration-300 px-4 py-3 rounded-lg flex items-center space-x-3"
                    >
                      <i className="fa-solid fa-plus w-5"></i>
                      <span>Add Food</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/manage-foods" 
                      onClick={() => setIsDrawerOpen(false)}
                      className="hover:text-amber-500 hover:bg-amber-800/10 transition-all duration-300 px-4 py-3 rounded-lg flex items-center space-x-3"
                    >
                      <i className="fa-solid fa-list w-5"></i>
                      <span>My Foods</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/my-food-requests" 
                      onClick={() => setIsDrawerOpen(false)}
                      className="hover:text-amber-500 hover:bg-amber-800/10 transition-all duration-300 px-4 py-3 rounded-lg flex items-center space-x-3"
                    >
                      <i className="fa-solid fa-clock w-5"></i>
                      <span>Food Requests</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      onClick={() => setIsDrawerOpen(false)}
                      className="hover:text-amber-500 hover:bg-amber-800/10 transition-all duration-300 px-4 py-3 rounded-lg flex items-center space-x-3"
                    >
                      <i className="fa-solid fa-sign-in-alt w-5"></i>
                      <span>Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      onClick={() => setIsDrawerOpen(false)}
                      className="bg-amber-500 text-black hover:bg-amber-400 transition-all duration-300 px-4 py-3 rounded-lg font-bold flex items-center space-x-3 hover:scale-105"
                    >
                      <i className="fa-solid fa-user-plus w-5"></i>
                      <span>Signup</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* User Info in Mobile Drawer */}
            {user && (
              <div className="mt-auto pt-6 border-t border-amber-800/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <img 
                      className="w-10 h-10 border-2 border-amber-500 rounded-full object-cover" 
                      src={user.photoURL} 
                      alt={user.displayName} 
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <p className="text-amber-500 font-semibold text-sm">{user.displayName || "User"}</p>
                    <p className="text-gray-500 text-xs">Online</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Click outside to close */}
          <div 
            className="flex-1" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;