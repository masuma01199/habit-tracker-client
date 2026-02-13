import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/habits/public`)
      .then(res => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-indigo-600 font-bold animate-pulse">
          Loading community habits...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-12 text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Community Habits
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Discover and draw inspiration from habits shared by fellow explorers.
          </p>
        </div>

        {/* Empty State */}
        {habits.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-16 text-center shadow-sm">
            <div className="text-5xl mb-4">🌍</div>
            <p className="text-gray-500 font-medium text-lg">
              The community is just getting started. No public habits found yet.
            </p>
          </div>
        ) : (
          /* Habits Grid */
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {habits.map(habit => (
              <div
                key={habit._id}
                className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest">
                    {habit.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {habit.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-2">
                  {habit.description || "Stay consistent and reach your goals with this community habit."}
                </p>

                <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                    <span>🔥</span>
                    <span>{habit.completionHistory?.length || 0} Day Streak</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                    {habit.title[0]}
                  </div>
                </div>

                <Link to={`/habits/${habit._id}`} className="no-underline">
                  <button className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                    View Journey →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicHabits;