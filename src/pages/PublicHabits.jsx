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
      <p className="text-center text-gray-500">
        Loading public habits...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Public Habits</h2>
        <p className="text-gray-500">
          Explore habits shared by the community
        </p>
      </div>

      {/* Empty State */}
      {habits.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500">
            No public habits available right now.
          </p>
        </div>
      )}

      {/* Habits Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {habits.map(habit => (
          <div
            key={habit._id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              {habit.title}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Category: {habit.category}
            </p>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-green-600">
                🔥 {habit.completionHistory?.length || 0} day streak
              </span>

              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Public
              </span>
            </div>

            <Link to={`/habits/${habit._id}`}>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicHabits;
