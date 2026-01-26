
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <h1 className="text-[180px] font-black text-slate-200 leading-none">404</h1>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Oops! Page Lost</h2>
      <Link to="/" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">Return Home</Link>
    </div>
  );
};

export default NotFound;
