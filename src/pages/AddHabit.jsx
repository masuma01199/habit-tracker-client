import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth, useHabits } from '../App';
// Import the object/enum we created in your earlier JS conversion
import { HabitCategory } from '../../types'; 
import { Plus, Tag, FileText, Clock, Image as ImageIcon, Globe } from 'lucide-react';

const AddHabit = () => {
  const { auth } = useAuth();
  const { addHabit } = useHabits();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: HabitCategory.MORNING,
    reminderTime: '08:00',
    imageUrl: '',
    isPublic: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description) {
      return toast.error("Please fill in basic info");
    }

    // Creating the habit object without TypeScript type safety
    const newHabit = {
      id: Date.now().toString(),
      ...formData,
      creatorEmail: auth.user?.email,
      creatorName: auth.user?.displayName,
      creatorPhoto: auth.user?.photoURL,
      createdAt: new Date().toISOString(),
      completionHistory: [],
      streak: 0
    };

    axios
      .post("http://localhost:5000/habits", newHabit)
      .then(() => {
        toast.success("Habit created successfully");
        setTitle("");
        setCategory("");
      })
      .catch(() => toast.error("Failed to create habit"));
  
    addHabit(newHabit);
    toast.success("Habit created!");
    navigate('/my-habits');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Plus size={32} /> Create New Habit
          </h1>
          <p className="opacity-80 mt-2">Design a routine that sticks.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Habit Title</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g., Morning Run"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              <div className="relative">
                <FileText className="absolute left-3 top-4 text-slate-400" size={18} />
                <textarea
                  required
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Describe your commitment..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {Object.values(HabitCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Reminder Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="time"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.reminderTime}
                  onChange={e => setFormData({ ...formData, reminderTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Image URL (Optional)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="url"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>
            </div>

            {/* Toggle for Public/Private */}
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl">
              <Globe className="text-indigo-600" size={24} />
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-slate-900">Make Habit Public</h4>
                <p className="text-xs text-slate-500">Allow others to see and learn from your routine.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.isPublic}
                  onChange={e => setFormData({ ...formData, isPublic: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Read-only Creator Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs text-slate-500">Creator Email</span>
                <p className="text-sm font-medium truncate">{auth.user?.email}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs text-slate-500">Creator Name</span>
                <p className="text-sm font-medium truncate">{auth.user?.displayName}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <button 
              type="submit" 
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;