import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false); 
  const [mobileOpen, setMobileOpen] = useState(false); 

  const activeClass = "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1";
  const inactiveClass = "text-gray-600 hover:text-indigo-600 font-medium transition-all";
  
  
  const mobileLinkClass = ({ isActive }) => 
    `block px-4 py-2 text-base font-medium ${isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:bg-gray-50"}`;

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
    
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-600 hover:text-indigo-600 focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-indigo-900 tracking-tight">HabitQuest</span>
        </Link>

        {/* Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Home</NavLink>
          <NavLink to="/add-habit" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Add Habit</NavLink>
          <NavLink to="/my-habits" className={({ isActive }) => isActive ? activeClass : inactiveClass}>My Habits</NavLink>
          <NavLink to="/public-habits" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Browse Habits</NavLink>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-5">
          {!user ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/login" className="text-gray-600 font-bold hover:text-indigo-600 no-underline">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-100 no-underline">
                Get Started
              </Link>
            </div>
          ) : (
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="profile"
                className="w-12 h-12 rounded-full border-2 border-indigo-100 cursor-pointer object-cover hover:border-indigo-500 transition-all"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-[60]">
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

     
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          <NavLink to="/" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>Home</NavLink>
          <NavLink to="/add-habit" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>Add Habit</NavLink>
          <NavLink to="/my-habits" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>My Habits</NavLink>
          <NavLink to="/public-habits" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>Browse Habits</NavLink>
          
          {/* Show Login/Register in Mobile Menu if not logged in */}
          {!user && (
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-center font-bold text-gray-600">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-center bg-indigo-600 text-white rounded-xl font-bold">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
