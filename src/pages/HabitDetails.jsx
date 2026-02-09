import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/habits/${id}`)
      .then(res => {
        setHabit(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading habit...</p>;
  }

  if (!habit) {
    return <p className="text-center text-red-500">Habit not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-3xl font-bold mb-4">{habit.title}</h2>

        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {habit.category}
        </p>

        <p className="text-gray-600 mb-2">
          <strong>Visibility:</strong>{" "}
          {habit.isPublic ? "Public" : "Private"}
        </p>

        <p className="text-gray-600 mb-4">
          <strong>Created:</strong>{" "}
          {new Date(habit.createdAt).toLocaleDateString()}
        </p>

        <div className="bg-gray-100 rounded p-4">
          <p className="font-semibold text-green-600">
            🔥 Current Streak: {habit.completionHistory?.length || 0} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
