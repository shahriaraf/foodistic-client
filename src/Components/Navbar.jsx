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
        className={`navbar w-full fixed top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
      >
        <div className="navbar-start">
          {/* Drawer Button */}
          <button
            className="btn text-gray-500 btn-ghost lg:hidden"
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <h1 className="text-[19px] md:text-3xl lg:pl-8 font-bold text-center text-amber-800">
            <i className="fa-sharp fa-solid fa-utensils"></i>omeBite
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-lg uppercase text-gray-400 font-semibold menu-horizontal px-1">
            <li className="hover:text-amber-800"><Link to="/">Home</Link></li>
            <li className="hover:text-amber-800"><Link to="/available-foods">Foods</Link></li>
            {user ? (
              <>
                <li className="hover:text-amber-800"><Link to="/add-foods">Add Food</Link></li>
                <li className="hover:text-amber-800"><Link to="/manage-foods">My Foods</Link></li>
                <li className="hover:text-amber-800"><Link to="/my-food-requests">Food Requests</Link></li>
              </>
            ) : (
              <>
                <li className="hover:text-amber-800"><Link to="/login">Login</Link></li>
                <li className="hover:text-amber-800"><Link to="/register">Signup</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* User Profile & Logout */}
        <div className="navbar-end flex items-center space-x-4 md:mr-8">
          {user && (
            <div className="flex items-center space-x-2">
              <div className="relative group mr-1 lg:mr-2">
                <img className="w-8 h-8 md:w-10 md:h-10 border-[3px] border-amber-800 rounded-full" src={user.photoURL} alt={user.displayName} />
                <div className="absolute top-12 right-0 mb-2 hidden group-hover:flex justify-center items-center bg-black text-gray-500 font-bold text-sm px-3 py-1 rounded shadow-lg">
                  {user.displayName || "User"}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-transparent text-sm md:text-2xl font-semibold rounded-full text-red-600"
              ><i class="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="w-52 bg-black h-full shadow-lg p-5 flex flex-col">
            {/* Close Button */}
            <button
              className="self-end text-gray-600 text-xl"
              onClick={() => setIsDrawerOpen(false)}
            >
              ✖
            </button>

            {/* Mobile Menu */}
            <ul className="menu text-sm uppercase text-amber-800 font-semibold space-y-4 mt-5">
              <li><Link to="/" onClick={() => setIsDrawerOpen(false)}>Home</Link></li>
              <li><Link to="/available-foods" onClick={() => setIsDrawerOpen(false)}>Foods</Link></li>
              {user ? (
                <>
                  <li><Link to="/add-foods" onClick={() => setIsDrawerOpen(false)}>Add Food</Link></li>
                  <li><Link to="/manage-foods" onClick={() => setIsDrawerOpen(false)}>My Foods</Link></li>
                  <li><Link to="/my-food-requests" onClick={() => setIsDrawerOpen(false)}>Food Requests</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" onClick={() => setIsDrawerOpen(false)}>Login</Link></li>
                  <li><Link to="/register" onClick={() => setIsDrawerOpen(false)}>Signup</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
