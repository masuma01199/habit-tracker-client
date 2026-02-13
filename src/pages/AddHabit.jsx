import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const habit = {
      title,
      category,
      isPublic,
      isFeatured: false,
      email: user.email,
      createdAt: new Date(),
      completionHistory: []
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/habits`, habit)
      .then(() => {
        toast.success("New quest started!");
        navigate("/my-habits");
      })
      .catch(() => toast.error("Failed to create habit"));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 text-center">
        
        {/* Icon Header */}
        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-100">
          <span className="text-2xl text-white font-bold">+</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Habit</h2>
        <p className="text-gray-500 mb-8">Set your goal and start your streak today.</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Habit Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Habit Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 30 Mins Reading"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-300" 
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Productivity"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-300" 
            />
          </div>

          {/* Visibility Toggle */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Privacy Settings</label>
            <select
              value={isPublic}
              onChange={e => setIsPublic(e.target.value === "true")}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer appearance-none"
            >
              <option value="false">🔒 Private (Only you)</option>
              <option value="true">🌍 Public (Share with community)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all mt-4"
          >
            Start Tracking →
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;