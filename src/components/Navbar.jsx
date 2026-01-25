import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { User as UserIcon, LogOut, Menu, X, PlusCircle, Layout, Globe, Home } from 'lucide-react';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  // 404 Check: Hide Navbar if current path doesn't match known routes
  const is404 = location.pathname !== '/' && 
               !['/login', '/register', '/public-habits', '/add-habit', '/my-habits'].includes(location.pathname) &&
               !location.pathname.startsWith('/habit/');

  if (is404) return null;

  // Dynamic navigation links based on auth status
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Browse Public', path: '/public-habits', icon: <Globe size={18} /> },
    ...(auth.user ? [
      { name: 'Add Habit', path: '/add-habit', icon: <PlusCircle size={18} /> },
      { name: 'My Habits', path: '/my-habits', icon: <Layout size={18} /> },
    ] : [])
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo and Desktop Links */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                HabitQuest
              </span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'border-indigo-500 text-slate-900' 
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
            {auth.user ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <img 
                    className="h-8 w-8 rounded-full object-cover border border-slate-200" 
                    src={auth.user.photoURL} 
                    alt="User profile" 
                  />
                  <span className="text-sm font-medium text-slate-700">{auth.user.displayName}</span>
                </button>

                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-slate-100 focus:outline-none z-50 py-1">
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900 truncate">{auth.user.displayName}</p>
                      <p className="text-xs text-slate-500 truncate">{auth.user.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setShowDropdown(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium text-sm">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-indigo-500 hover:text-indigo-600"
              >
                <div className="flex items-center gap-2">
                  {link.icon} {link.name}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-slate-200">
            {auth.user ? (
              <div className="px-4 flex flex-col gap-4">
                <div className="flex items-center">
                  <img className="h-10 w-10 rounded-full" src={auth.user.photoURL} alt="User" />
                  <div className="ml-3">
                    <div className="text-base font-medium text-slate-800">{auth.user.displayName}</div>
                    <div className="text-sm font-medium text-slate-500">{auth.user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-center px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium text-sm"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="px-4 flex flex-col gap-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-slate-600 font-medium">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-2 bg-indigo-600 text-white rounded-lg font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;