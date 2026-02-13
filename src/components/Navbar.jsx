import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const activeClass = "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1";
  const inactiveClass = "text-gray-600 hover:text-indigo-600 font-medium transition-all";

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-indigo-900 tracking-tight">HabitQuest</span>
        </Link>

        {/* Navigation Links (Visible for Everyone) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Home</NavLink>
          <NavLink to="/add-habit" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Add Habit</NavLink>
          <NavLink to="/my-habits" className={({ isActive }) => isActive ? activeClass : inactiveClass}>My Habits</NavLink>
          <NavLink to="/public-habits" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Browse Habits</NavLink>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-5">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 font-bold hover:text-indigo-600 no-underline">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-100 no-underline">
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="profile"
                className="w-12 h-12 rounded-full border-2 border-indigo-100 cursor-pointer object-cover hover:border-indigo-500 transition-all"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2">
                   <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-gray-800 truncate">{user.displayName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                   </div>
                   <button 
                    onClick={logOut} 
                    className="w-full text-left px-4 py-2 text-red-500 font-semibold hover:bg-red-50 rounded-lg transition"
                   >
                    Log out
                   </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;