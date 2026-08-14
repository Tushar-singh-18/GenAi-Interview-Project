import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';


export const Navbar = () => {
  const { user, handlelogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handlelogout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#0a0a0f] border-gray-200">
      {/* Left side: App Title */}
      <div>
        <Link to="/home" className="text-lg font-bold text-gray-400 hover:text-gray-600">
          GenAi
        </Link>
      </div>

      {/* Right side: User Info + Action Button */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-white">
              Hi, <strong className="font-semibold text-white">{user?.username}</strong>
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};