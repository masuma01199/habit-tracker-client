import React, { useState } from 'react';
import { useHabits } from '../App';
import { HabitCategory } from '../../types'; // Ensure this points to your JS/JSX types file
import { Search, ArrowRight, Flame, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicHabits = () => {
  const { habits } = useHabits();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Generate category list from the HabitCategory object
  const categories = ['All', ...Object.values(HabitCategory)];

  // Filtering logic
  const filteredHabits = habits.filter(h => {
    const matchesSearch = h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         h.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || h.category === activeCategory;
    
    // Only show habits that are marked public
    return h.isPublic && matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Discover Routines</h1>
        <p className="text-slate-500">Learn from top performers and adopt new habits.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
            placeholder="Search by title or keyword..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm border ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Habits Grid */}
      {filteredHabits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-400 text-lg">No habits found matching your criteria.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} 
            className="text-indigo-600 font-bold mt-4 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHabits.map((habit) => (
            <div 
              key={habit.id} 
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Image/Icon Header */}
              <div className="h-40 bg-indigo-50 relative overflow-hidden">
                {habit.imageUrl ? (
                  <img 
                    src={habit.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={habit.title} 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indigo-200">
                    <Globe size={64} />
                  </div>
                )}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm border border-slate-100">
                  {habit.category}
                </div>
                {habit.streak > 0 && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                    <Flame size={14} fill="currentColor" /> {habit.streak} DAY STREAK
                  </div>
                )}
              </div>

              {/* Habit Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src={habit.creatorPhoto || `https://ui-avatars.com/api/?name=${habit.creatorName}`} 
                    className="w-6 h-6 rounded-full border border-slate-100" 
                    alt={habit.creatorName} 
                  />
                  <span className="text-xs font-bold text-slate-500">{habit.creatorName}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {habit.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {habit.description}
                </p>
                <Link 
                  to={`/habit/${habit.id}`}
                  className="w-full py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-2 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicHabits;