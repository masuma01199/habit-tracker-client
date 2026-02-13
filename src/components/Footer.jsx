import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        {/* About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1 rounded-md text-white font-bold text-xs px-1.5 text-center">HQ</div>
            <span className="font-bold text-gray-900">HabitQuest</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Level up your life one habit at a time. Join our community and build lasting change.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li className="flex items-center gap-2">
                <span>support@habitquest.io</span>
            </li>
            <li>San Francisco, CA</li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li><Link to="/terms" className="hover:text-indigo-600 transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
          <div className="flex gap-4 text-gray-400">
             <span className="cursor-pointer hover:text-indigo-600 font-medium text-sm">Twitter</span>
             <span className="cursor-pointer hover:text-indigo-600 font-medium text-sm">Github</span>
             <span className="cursor-pointer hover:text-indigo-600 font-medium text-sm">Email</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} HabitQuest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 