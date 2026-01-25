import React from 'react';
import { Twitter, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // 404 Logic: Hides the footer on undefined routes
  const is404 = location.pathname !== '/' && 
                !['/login', '/register', '/public-habits', '/add-habit', '/my-habits'].includes(location.pathname) &&
                !location.pathname.startsWith('/habit/');
  
  if (is404) return null;

  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-xl font-bold text-slate-900">HabitQuest</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering individuals to build lasting habits through intelligent tracking and community support.
            </p>
          </div>
          
          {/* Contact Details */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Contact Details</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@habitquest.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +1 (555) 000-0000
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Silicon Valley, CA
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100 shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100 shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100 shadow-sm">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} HabitQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;