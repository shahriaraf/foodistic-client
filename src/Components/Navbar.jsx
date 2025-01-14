import { Link } from "react-router-dom";
import { AuthContext } from "./Authprovider";
import { useContext, useState, useEffect } from "react";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        className={`navbar fixed top-0 left-0 w-full z-50 ${
          isScrolled
            ? "bg-amber-100/60 backdrop-blur-lg shadow-xl"
            : "bg-amber-100"
        } transition-all duration-300`}
      >
        <div className="navbar-start">
          {/* Drawer toggle button */}
          <button
            className="btn btn-ghost lg:hidden"
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
          <a className="btn btn-ghost text-2xl">Foodistic</a>
        </div>

        {/* Menu for larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/available-foods">Available Foods</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/add-foods">Add Food</Link>
                </li>
                <li>
                  <Link to="/manage-foods">Manage My Foods</Link>
                </li>
                <li>
                  <Link to="/my-food-requests">My Food Requests</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Profile Section */}
        <div className="navbar-end flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.photoURL}
                  alt={user.displayName}
                />
                <div className="absolute top-12 right-0 mb-2 hidden group-hover:flex justify-center items-center bg-amber-100 text-black text-sm px-3 py-1 rounded shadow-lg">
                  {user.displayName || "User"}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-700 font-semibold text-white px-3 py-2 rounded-lg"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sliding Drawer */}
      <div
        className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-black text-gray-300 w-64 h-full shadow-lg p-4">
          <button
            className="text-gray-300 hover:text-gray-500 mb-4"
            onClick={() => setIsDrawerOpen(false)}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="menu menu-vertical space-y-2">
            <li>
              <Link to="/" onClick={() => setIsDrawerOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/available-foods" onClick={() => setIsDrawerOpen(false)}>
                Available Foods
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/add-foods" onClick={() => setIsDrawerOpen(false)}>
                    Add Food
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage-foods"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Manage My Foods
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-food-requests"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    My Food Requests
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsDrawerOpen(false)}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div
          className="flex-grow bg-black/50"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
