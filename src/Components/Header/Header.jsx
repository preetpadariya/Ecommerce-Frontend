import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Actions/User";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-black text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-3xl font-extrabold">Shopping</h1>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-400 text-lg font-medium">
            Shop
          </Link>
          <Link to="/cart" className="hover:text-gray-400 text-lg font-medium">
            Cart
          </Link>
          <Link
            to="/orders"
            className="hover:text-gray-400 text-lg font-medium"
          >
            Orders
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Avatar
                src={user?.avatarUrl || "/broken-image.jpg"}
                alt={user?.username}
              />
              <span className="text-lg font-medium">{user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-400 text-lg font-medium"
            >
              Login
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
