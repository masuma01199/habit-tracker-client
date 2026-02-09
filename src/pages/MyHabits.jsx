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
      .delete(`http://localhost:5000/habits/${id}`)
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
      .patch(`http://localhost:5000/habits/complete/${id}`)
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
        .get(`http://localhost:5000/habits/user/${user.email}`)
        .then(res => {
          setHabits(res.data);
          setLoading(false);
        })
        .catch(() => toast.error("Failed to load habits"));
    }
  }, [user]);

  if (loading) return <p>Loading your habits...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-2">My Habits</h2>
      <p className="text-gray-600 mb-6">
        Total habits: {habits.length}
      </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-center">Streak</th>
              <th className="px-6 py-3 text-center">Created</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {habits.map(habit => (
              <tr key={habit._id}>
                <td className="px-6 py-4">{habit.title}</td>
                <td className="px-6 py-4">{habit.category}</td>

                <td className="px-6 py-4 text-center font-semibold">
                  {habit.completionHistory?.length || 0}
                </td>

                <td className="px-6 py-4 text-center text-sm text-gray-500">
                  {new Date(habit.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <Link to={`/update-habit/${habit._id}`}>
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                      Update
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleComplete(habit._id)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Complete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHabits;
