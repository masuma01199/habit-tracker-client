import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/habits/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setCategory(res.data.category);
        setVisibility(res.data.visibility);
      })
      .catch(() => toast.error("Failed to load habit"));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        title,
        category,
        visibility,
      })
      .then(() => {
        toast.success("Habit updated successfully");
        navigate("/my-habits");
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 text-center">
        
        {/* Animated Icon Header */}
        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Update Habit</h2>
        <p className="text-gray-500 mb-8">Refine your goals and stay on track</p>

        <form onSubmit={handleUpdate} className="space-y-6 text-left">
          {/* Habit Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Habit Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Meditation"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Health"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="public">🌍 Public (Shared with community)</option>
              <option value="private">🔒 Private (Only you)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Save Changes
            </button>
            <button 
              type="button"
              onClick={() => navigate("/my-habits")}
              className="w-full text-gray-500 font-bold py-2 hover:text-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHabit;