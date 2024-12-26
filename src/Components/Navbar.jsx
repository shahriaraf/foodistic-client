import { Link } from "react-router-dom";
import { AuthContext } from "./Authprovider";
import { useContext } from "react";


const Navbar = () => {

    const { user, signOutUser } = useContext(AuthContext); // Get user and signOutUser from context

    const handleSignOut = async () => {
        await signOutUser(); // Call signOutUser to log the user out
    };

    return (
        <div>
            <div className="navbar bg-amber-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/available-foods'>Available Foods</Link></li>
                            <li><Link to='/add-foods'> Add Food</Link></li>
                            <li><Link to='/manage-foods'> Manage My Foods</Link></li>
                            <li><Link to='/my-food-requests'> My Food Request</Link></li>
                            {!user && (
                                <>
                                <li><Link to='/login'> Login</Link></li>
                                <li><Link to='/register'>Signup</Link></li>
                                </>
                            )}


                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Foodistic</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/available-foods'>Available Foods</Link></li>
                        <li><Link to='/add-foods'> Add Food</Link></li>
                        <li><Link to='/manage-foods'> Manage My Foods</Link></li>
                        <li><Link to='/my-food-requests'> My Food Request</Link></li>

                        {!user && (
                            <>
                            <li><Link to='/login'> Login</Link></li>
                            <li><Link to='/register'>Signup</Link></li>
                            </>
                        )}

                    </ul>
                </div>
               

                <div className="navbar-end flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-2">
                            <div className="relative group">
                                <img
                                    className="w-12 h-12 rounded-full"
                                    src={user.photoURL || "https://via.placeholder.com/40"}
                                    alt="user avatar"
                                />
                                <div className="absolute top-4 right-2 mb-2 hidden group-hover:flex justify-center items-center bg-transparent text-white text-lg px-3 py-1 rounded shadow-lg">
                                    {user.displayName || "User"}
                                </div>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="bg-red-500 hidden lg:inline hover:bg-red-700 font-semibold text-white px-3 py-2 rounded-lg"
                            >
                                Log out
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div >

    );
};

export default Navbar;
