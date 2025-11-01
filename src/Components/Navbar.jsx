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
    <>
      {/* Full-width background */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-xl border-b border-amber-800/20"
            : "bg-transparent"
        }`}
      >
        {/* Centered navbar container */}
        <div className="flex items-center justify-between max-w-6xl px-4 py-5 mx-auto md:px-6 lg:px-0">
          
          {/* Left: Logo + Drawer Button */}
          <div className="flex items-center space-x-2">
            {/* Mobile drawer button */}
            <button
              className="text-gray-400 transition-all duration-300 btn btn-ghost lg:hidden hover:text-amber-600 hover:bg-amber-800/10"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-300 transform hover:scale-110"
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

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center text-xl font-bold transition-colors duration-300 md:text-3xl text-amber-600 hover:text-amber-500 group"
            >
              <i className="mr-2 transition-transform duration-300 fa-sharp fa-solid fa-utensils group-hover:rotate-12"></i>
              <span className="relative">
                omeBite
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></div>
              </span>
            </Link>
          </div>

          {/* Center: Desktop menu */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-2 text-lg font-medium text-gray-200 uppercase">
              <li>
                <Link
                  to="/"
                  className="relative px-4 py-2 tracking-wider rounded-lg hover:text-amber-600 hover:bg-amber-800/10 group"
                >
                  Home
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-3/4"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/available-foods"
                  className="relative px-4 py-2 rounded-lg hover:text-amber-600 hover:bg-amber-800/10 group"
                >
                  Foods
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-3/4"></span>
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      to="/add-foods"
                      className="relative px-4 py-2 rounded-lg hover:text-amber-600 hover:bg-amber-800/10 group"
                    >
                      Add Food
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-3/4"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-foods"
                      className="relative px-4 py-2 rounded-lg hover:text-amber-600 hover:bg-amber-800/10 group"
                    >
                      My Foods
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-3/4"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-food-requests"
                      className="relative px-4 py-2 rounded-lg hover:text-amber-600 hover:bg-amber-800/10 group"
                    >
                      Food Requests
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-3/4"></span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="relative px-4 py-2 rounded-sm hover:text-amber-600 hover:bg-amber-800/10 group"
                    >
                      Login
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-3/4"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="px-4 py-2 font-bold text-black transition-all duration-300 rounded-sm bg-amber-600 hover:bg-amber-700 hover:scale-105 hover:shadow-lg"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Right: Profile / Logout */}
          <div className="flex items-center space-x-3">
            {user && (
              <>
                <div className="relative group">
                  <img
                    className="object-cover transition-all duration-300 border-2 rounded-full w-9 h-9 md:w-10 md:h-10 border-amber-600 hover:scale-110 hover:shadow-lg"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                  <div className="absolute w-3 h-3 bg-green-500 border-2 border-black rounded-full -top-1 -right-1"></div>
                  <div className="absolute right-0 hidden px-3 py-2 text-sm font-bold border rounded-lg shadow-lg top-12 group-hover:flex bg-black/90 text-amber-600 border-amber-800/20">
                    {user.displayName || "User"}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-sm font-semibold text-red-600 transition-all duration-300 rounded-full md:text-xl hover:text-red-500 hover:bg-red-600/10 hover:scale-110 hover:shadow-lg"
                  title="Sign Out"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer (keep your original one) */}
      {isDrawerOpen && (
        // ... your existing drawer JSX
        <></>
      )}
    </>
  );
};

export default Navbar;
