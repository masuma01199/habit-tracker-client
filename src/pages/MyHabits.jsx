import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useHabits } from '../App';
import { Edit2, Trash2, CheckCircle, Calendar, Flame, ChevronRight, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
const MyHabits = () => {
  const { auth } = useAuth();
  const { habits, deleteHabit,setHabits } = useHabits();
  const [showStats, setShowStats] = useState(false);

  // Filter habits belonging to the logged-in user
  const myHabits = habits.filter(h => h.creatorEmail === auth.user?.email);

  // Mock data for the analytics chart
  const statsData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 15 },
    { name: 'Wed', count: 18 },
    { name: 'Thu', count: 14 },
    { name: 'Fri', count: 22 },
    { name: 'Sat', count: 25 },
    { name: 'Sun', count: 20 },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      deleteHabit(id);
    }
    axios
      .delete(`http://localhost:5000/habits/${id}`)
      .then(() => {
        toast.success("Habit deleted successfully");
        const remaining = habits.filter(habit => habit._id !== id);
        setHabits(remaining);
      })
      .catch(() => toast.error("Failed to delete habit"));
  };

   const markComplete = (id) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Habit Dashboard</h1>
          <p className="text-slate-500">Track and manage your personal progress.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowStats(!showStats)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
              showStats 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BarChart3 size={20} /> Analytics
          </button>
          <Link 
            to="/add-habit" 
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center gap-2"
          >
            <CheckCircle size={20} /> Add Habit
          </Link>
        </div>
      </div>

      {/* Analytics Section */}
      {showStats && (
        <div className="mb-10 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Flame className="text-orange-500" /> Weekly Streak Growth
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#4f46e5' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Habits Table / Empty State */}
      {myHabits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <Calendar size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No habits yet</h3>
          <p className="text-slate-500 mb-6">Start your journey by adding your first daily habit.</p>
          <Link to="/add-habit" className="text-indigo-600 font-bold hover:underline">Add First Habit</Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Streak</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myHabits.map((habit) => (
                <tr key={habit.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{habit.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase">
                      {habit.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-bold text-orange-600">
                      <Flame size={16} fill="currentColor" /> {habit.streak}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => markComplete(habit.id)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Mark Complete Today"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <Link 
                        to={`/habit/${habit.id}`}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(habit.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyHabits;