// src/components/dashboard/Header.js
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Header = ({ user }) => {

  const {logout}=useAuth()

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">
          {user ? `Welcome, ${user?.restaurantName}` : "Guest"}
        </span>
        <button 
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
