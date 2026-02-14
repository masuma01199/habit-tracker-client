import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this habit?"
    );

    if (!confirmDelete) return;

    axios
      .delete(`${import.meta.env.VITE_API_URL}/habits/${id}`)
      .then(() => {
        toast.success("Habit deleted successfully");
        const remaining = habits.filter(habit => habit._id !== id);
        setHabits(remaining);
      })
      .catch(() => toast.error("Failed to delete habit"));
  };

  // ✅ MOVE THIS FUNCTION UP
  const handleComplete = (id) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/habits/complete/${id}`)
      .then(res => {
        if (res.data.message === "Already completed today") {
          toast("Already completed today");
          return;
        }

        toast.success("Habit marked as completed");

        const today = new Date().toISOString().split("T")[0];

        const updatedHabits = habits.map(habit =>
          habit._id === id
            ? {
              ...habit,
              completionHistory: [
                ...(habit.completionHistory || []),
                today,
              ],
            }
            : habit
        );

        setHabits(updatedHabits);
      })
      .catch(() => toast.error("Failed to mark habit"));
  };

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/habits/user/${user.email}`)
        .then(res => {
          setHabits(res.data);
          setLoading(false);
        })
        .catch(() => toast.error("Failed to load habits"));
    }
  }, [user]);

  if (loading) return <p>Loading your habits...</p>;

  return (
  <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 min-h-screen">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">My Daily Habits</h1>
        <p className="text-gray-500 mt-2">Track your progress and keep the fire burning.</p>
      </div>
      <Link to="/add-habit" className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
        <span className="text-xl">+</span> Add New Habit
      </Link>
    </div>

    {/* --- DESKTOP VIEW: TABLE (Hidden on Mobile) --- */}
    <div className="hidden md:block bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Habit</th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Current Streak</th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Created Date</th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {habits.map(habit => (
            <tr key={habit._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-8 py-6 font-bold text-gray-900">{habit.title}</td>
              <td className="px-8 py-6">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-bold capitalize">
                  {habit.category}
                </span>
              </td>
              <td className="px-8 py-6 text-center font-bold text-gray-900">
                {habit.completionHistory?.length || 0} 🔥
              </td>
              <td className="px-8 py-6 text-center text-gray-500 text-sm">
                {new Date(habit.createdAt).toLocaleDateString()}
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-3">
                  <button onClick={() => handleComplete(habit._id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">✅</button>
                  <Link to={`/update-habit/${habit._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">✏️</Link>
                  <button onClick={() => handleDelete(habit._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* --- MOBILE VIEW: CARDS (Hidden on Desktop) --- */}
    <div className="md:hidden space-y-4">
      {habits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <p className="text-gray-400">No habits yet.</p>
        </div>
      ) : (
        habits.map(habit => (
          <div key={habit._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{habit.title}</h3>
                <span className="inline-block mt-1 bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  {habit.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{habit.completionHistory?.length || 0} 🔥</p>
                <p className="text-[10px] text-gray-400 uppercase">Streak</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <p className="text-xs text-gray-400">
                Created: {new Date(habit.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button onClick={() => handleComplete(habit._id)} className="p-3 bg-green-50 text-green-600 rounded-xl" title="Complete">✅</button>
                <Link to={`/update-habit/${habit._id}`} className="p-3 bg-blue-50 text-blue-600 rounded-xl" title="Edit">✏️</Link>
                <button onClick={() => handleDelete(habit._id)} className="p-3 bg-red-50 text-red-600 rounded-xl" title="Delete">🗑️</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
};

export default MyHabits;
