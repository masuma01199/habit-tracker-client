import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load habit data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/habits/${id}`)
      .then(res => {
        setHabit(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Logic to Mark as Completed
  const handleComplete = () => {
    axios
      .patch(`http://localhost:5000/habits/complete/${id}`)
      .then(res => {
        if (res.data.message === "Already completed today") {
          toast("Already completed today", { icon: 'ℹ️' });
          return;
        }

        toast.success("Habit marked as completed!");

        // Update the local state so the streak number increases immediately
        const today = new Date().toISOString().split("T")[0];
        setHabit({
          ...habit,
          completionHistory: [...(habit.completionHistory || []), today]
        });
      })
      .catch(() => toast.error("Failed to mark habit as complete"));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600 font-bold">Loading habit...</div>;
  if (!habit) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Habit not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/my-habits" className="text-gray-500 hover:text-indigo-600 font-bold mb-6 inline-block no-underline">
          ← Back to List
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-2 inline-block">
                {habit.category}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900">{habit.title}</h1>
            </div>
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🔥</span>
            </div>
          </div>

          <hr className="border-gray-50 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Current Streak</p>
              <p className="text-2xl font-black text-gray-900">
                {habit.completionHistory?.length || 0} Days
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Visibility</p>
              <p className="text-2xl font-black text-gray-900 capitalize">
                {habit.isPublic ? "Public" : "Private"}
              </p>
            </div>
          </div>

          {/* Connected Button */}
          <button 
            onClick={handleComplete} 
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            Mark as Completed Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;